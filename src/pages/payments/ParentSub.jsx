import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { useEffect, useState } from "react";
import { usePaymentStore } from "../../store/paymentStore";
import StyledInput from "../../ui/StyledInput";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ParentSub = ({ open, onClose, sub, isUpdate }) => {
  const { handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      days: "",
      price: "",
      benefits: []
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "benefits"
  });

  const [newBenefit, setNewBenefit] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { addParentSubscription, editParentSub, setRefreshMember } =
    usePaymentStore();

  useEffect(() => {
    if (sub && isUpdate) {
      setValue("name", sub?.name);
      setValue("description", sub?.description);
      setValue("days", sub?.days);
      setValue("price", sub?.price);
      // Set benefits if they exist in sub
      if (sub?.benefits && Array.isArray(sub.benefits)) {
        setValue("benefits", sub.benefits.map(benefit => ({ value: benefit })));
      }
    }
  }, [sub, isUpdate, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Convert benefits from array of objects to array of strings
      const formattedData = {
        ...data,
        benefits: data.benefits.map(benefit => benefit.value)
      };
      
      if (isUpdate) {
        await editParentSub(sub?._id, formattedData);
      } else {
        await addParentSubscription(formattedData);
      }
      setRefreshMember();
      reset({
        name: "",
        description: "",
        days: "",
        price: "",
        benefits: []
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

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      append({ value: newBenefit.trim() });
      setNewBenefit("");
    }
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
          sx={{ width: "430px", backgroundColor: "#FFF", maxHeight: "500px" }}
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
            <Typography variant="h6" color={"#333333"}>
              Benefits
            </Typography>
            
            {/* Benefits Input */}
            <Box display="flex" alignItems="center" gap={1}>
              <StyledInput 
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add a benefit"
                fullWidth
              />
              <IconButton 
                onClick={handleAddBenefit}
                color="primary" 
                sx={{ bgcolor: '#f0f0f0', borderRadius: '4px' }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            
            {/* Benefits List */}
            <List sx={{ width: '100%', bgcolor: 'background.paper', py: 0 }}>
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`benefits.${index}.value`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => remove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                      disablePadding
                      sx={{ py: 1 }}
                    >
                      <ListItemText primary={controllerField.value} />
                    </ListItem>
                  )}
                />
              ))}
            </List>
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

export default ParentSub