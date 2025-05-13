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

const AddFolder = ({ open, onClose, id, setIsChange, folderId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm();
  const { addFolder, folder, getFolder, updateFolders } = useFolderStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (folderId) {
      getFolder(folderId);
    }
  }, [folderId, getFolder]);

  useEffect(() => {
    if (folder && folderId) {
      reset({
        name: folder.name,
      });
    } else {
      reset({
        name: "",
      });
    }
  }, [folder, folderId, reset]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const newData = {
        name: formData?.name,
        event: id,
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
