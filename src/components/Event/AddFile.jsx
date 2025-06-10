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
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import { upload } from "../../api/adminapi";

const AddFile = ({ open, onClose, id, setIsChange, learning }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const { addFile } = useFolderStore();
  const [imageFile, setImageFile] = useState(null);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (learning) {
      setType("video");
      setValue("type", { value: "video", label: "Video" });
    } else {
      setType(null);
      setValue("type", null);
    }
  }, [learning, setValue]);
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      let imageUrl = formData?.image || "";
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
      const newData = {
        type: formData?.type?.value,
      };
      if (type === "image") {
        newData.url = imageUrl;
      } else {
        newData.url = formData?.url;
      }
      await addFile(id, { files: [newData] });
      reset();
      setIsChange((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { borderRadius: "12px" },
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
                Add File
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
            sx={{ minHeight: "300px", width: "430px", backgroundColor: "#fff" }}
          >
            <Stack spacing={2} paddingTop={2} mb={6}>
              {!learning && (
                <>
                  <Typography variant="h7" color={"textTertiary"}>
                    Type
                  </Typography>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          placeholder="Enter Event Type"
                          options={[
                            { value: "image", label: "Image" },
                            { value: "video", label: "Video" },
                          ]}
                          {...field}
                          onChange={(e) => {
                            setType(e?.value);
                            field.onChange(e);
                          }}
                        />
                      </>
                    )}
                  />
                </>
              )}
              {type === "image" && (
                <>
                  <Typography variant="h7" color={"textTertiary"}>
                    Image
                  </Typography>
                  <Controller
                    name="image"
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
                </>
              )}
              {type === "video" && (
                <>
                  <Typography variant="h7" color={"textTertiary"}>
                    Url
                  </Typography>
                  <Controller
                    name="url"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledInput placeholder="Add url" {...field} />
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
              onClick={(event) => handleClear(event)}
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

export default AddFile;
