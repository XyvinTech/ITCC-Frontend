import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { useEffect, useState } from "react";
import { usePaymentStore } from "../../store/paymentStore";
import StyledInput from "../../ui/StyledInput";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { toast } from "react-toastify";

const ParentSub = ({ open, onClose, sub, isUpdate }) => {
  const { handleSubmit, control, setValue, reset } = useForm();
  const { addParentSubscription, editParentSub, setRefreshMember } =
    usePaymentStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (sub && isUpdate) {
      setValue("name", sub?.name);
      setValue("description", sub?.description);
      setValue("days", sub?.days);
      setValue("price", sub?.price);
    }
  }, [sub, isUpdate, setValue]);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isUpdate) {
        await editParentSub(sub?._id, data);
      } else {
        await addParentSubscription(data);
      }
      setRefreshMember();
      reset({
        name: "",
        description: "",
        days: "",
        price: "",
      });
      onClose();
    } catch (error) {
      toast.error(error.message);
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
            <Typography variant="h3" color={"#4F4F4F"}>
              Subscription
            </Typography>
            <Typography
              onClick={(event) => handleClear(event)}
              color="#E71D36"
              style={{ cursor: "pointer" }}
            >
              <CloseIcon />
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{ height: "400px", width: "430px", backgroundColor: "#FFF" }}
        >
          <Stack spacing={2} paddingTop={2}>
            <Typography variant="h6" color={"#333333"}>
              Name
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder={"Enter Name"} />
                </>
              )}
            />
            <Typography variant="h6" color={"#333333"}>
              Description
            </Typography>
            <Controller
              name="description"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <StyledMultilineTextField
                  {...field}
                  placeholder={"Enter Description"}
                />
              )}
            />
            <Typography variant="h6" color={"#333333"}>
              Days
            </Typography>
            <Controller
              name="days"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder={"Enter Days"} />
                </>
              )}
            />
            <Typography variant="h6" color={"#333333"}>
              Price
            </Typography>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder={"Enter Price"} />
                </>
              )}
            />
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
          <StyledButton
            variant="secondary"
            name="Cancel"
            onClick={(event) => handleClear(event)}
            disabled={loading}
            type="button"
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
  );
};

export default ParentSub;
