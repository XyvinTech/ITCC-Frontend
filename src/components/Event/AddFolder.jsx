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
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { useProductStore } from "../../store/productStore";
import { useState } from "react";
import StyledInput from "../../ui/StyledInput";
import { useFolderStore } from "../../store/folderStore";
import { toast } from "react-toastify";

const AddFolder = ({ open, onClose, id, setIsChange }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { addFolder } = useFolderStore();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const newData = {
        name: formData?.name,
        event: id,
      };

      await addFolder(newData);

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
                Add Folder
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
                render={({ field }) => (
                  <>
                    <StyledInput placeholder={"Enter Folder Name"} {...field} />
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

export default AddFolder;
