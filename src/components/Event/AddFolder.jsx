import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { StyledButton } from "../../ui/StyledButton";
import { useEffect, useState } from "react";
import StyledInput from "../../ui/StyledInput";
import { useFolderStore } from "../../store/folderStore";
import { toast } from "react-toastify";
import StyledSwitch from "../../ui/StyledSwitch";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { upload } from "../../api/adminapi";
import { StyledEventUpload } from "../../ui/StyledEventUpload";

const AddFolder = ({ open, onClose, id, setIsChange, folderId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const { addFolder, folder, getFolder, updateFolders } = useFolderStore();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [speakerImageFile, setSpeakerImageFile] = useState(null);

  const learningCornerValue = watch("learningCorner", false);

  useEffect(() => {
    if (folderId) {
      getFolder(folderId);
    }
  }, [folderId, getFolder]);

  useEffect(() => {
    if (folder && folderId) {
      reset({
        name: folder.name,
        learningCorner: folder.learningCorner,
        description: folder.description,
        speaker: folder.speaker,
        designation: folder.designation,
        thumbnail: folder.thumbnail,
        speakerImage: folder.speakerImage,
        setSpeakerImageFile: folder.speakerImage,
        setImageFile: folder.thumbnail,
      });
    } else {
      reset({
        name: "",
        learningCorner: false,
        description: "",
        speaker: "",
        designation: "",
        thumbnail: "",
        speakerImage: "",
      });
    }
  }, [folder, folderId, reset]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      let imageUrl = formData?.thumbnail || "";
      let speakerImageUrl = formData?.speakerImage || "";
      if (imageFile) {
        try {
          imageUrl = await new Promise(async (resolve, reject) => {
            try {
              const response = await upload(imageFile);
              resolve(response?.data || "");
            } catch (error) {
              reject(error);
            }
          });
        } catch (error) {
          console.error("Failed to upload image:", error);
          return;
        }
      }
      if (speakerImageFile) {
        try {
          speakerImageUrl = await new Promise(async (resolve, reject) => {
            try {
              const response = await upload(speakerImageFile);
              resolve(response?.data || "");
            } catch (error) {
              reject(error);
            }
          });
        } catch (error) {
          console.error("Failed to upload image:", error);
          return;
        }
      }
      const newData = {
        name: formData?.name,
        event: id,
        learningCorner: formData?.learningCorner,
        ...(formData?.learningCorner && {
          description: formData?.description,
          speaker: formData?.speaker,
          designation: formData?.designation,
          thumbnail: imageUrl,
          speakerImage: speakerImageUrl,
        }),
      };
      if (folderId) {
        await updateFolders(folderId, newData);
      } else {
        await addFolder(newData);
      }
      setIsChange((prev) => !prev);
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save folder");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    reset();
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { borderRadius: "12px", overflow: "auto" },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ height: "auto", padding: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3" color={"textTertiary"}>
                {folderId ? "Edit Folder" : "Add Folder"}
              </Typography>
              <Typography
                onClick={onClose}
                color="#E71D36"
                style={{ cursor: "pointer" }}
              >
                <CloseIcon />
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent
            sx={{ height: "auto", width: "430px", backgroundColor: "#F9F9F9" }}
          >
            <Stack spacing={2} paddingTop={2}>
              <Typography variant="h7" color={"textTertiary"}>
                Folder Name
              </Typography>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Folder name is required" }}
                render={({ field }) => (
                  <>
                    <StyledInput
                      placeholder={"Enter Folder Name"}
                      {...field}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </>
                )}
              />
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h7" color={"textTertiary"}>
                  Add to learning corner
                </Typography>
                <Controller
                  name="learningCorner"
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <StyledSwitch
                      variant="primary"
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              </Stack>

              {learningCornerValue && (
                <>
                  <Typography variant="h7" color={"textTertiary"}>
                    Speaker Name
                  </Typography>
                  <Controller
                    name="speaker"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledInput
                          placeholder={"Enter Speaker Name"}
                          {...field}
                        />
                      </>
                    )}
                  />
                  <Typography variant="h7" color={"textTertiary"}>
                    Designation
                  </Typography>
                  <Controller
                    name="designation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledInput
                          placeholder={"Enter Designation"}
                          {...field}
                        />
                      </>
                    )}
                  />
                  <Typography variant="h7" color={"textTertiary"}>
                    Speaker Image
                  </Typography>
                  <Controller
                    name="speakerImage"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <StyledEventUpload
                          label="Upload Photo here"
                          onChange={(file) => {
                            setSpeakerImageFile(file);
                            onChange(file);
                          }}
                          value={value}
                        />
                      </>
                    )}
                  />
                  <Typography variant="h7" color={"textTertiary"}>
                    Thumbnail
                  </Typography>
                  <Controller
                    name="thumbnail"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <StyledEventUpload
                          label="Upload Photo here"
                          onChange={(file) => {
                            setImageFile(file);
                            onChange(file);
                          }}
                          value={value}
                        />
                      </>
                    )}
                  />

                  <Typography variant="h7" color={"textTertiary"}>
                    Description
                  </Typography>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledMultilineTextField
                          placeholder={"Enter Description"}
                          {...field}
                        />
                      </>
                    )}
                  />
                </>
              )}
            </Stack>
          </DialogContent>
          <Stack
            direction={"row"}
            spacing={2}
            padding={2}
            justifyContent={"end"}
          >
            <StyledButton
              variant="secondary"
              name="Cancel"
              onClick={handleClear}
              disabled={loading}
              type={"button"}
            />
            <StyledButton
              variant="primary"
              name={loading ? "Saving..." : "Save"}
              type="submit"
              disabled={loading}
            />
          </Stack>
        </form>
      </Dialog>
    </>
  );
};

export default AddFolder;
