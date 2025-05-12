import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CustomTextField = styled(({ preview, ...rest }) => <TextField {...rest} />)(
  ({ theme, preview }) => ({
    width: "100%",
    backgroundColor: preview ? "#F5F7FF" : "white",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(87, 85, 85, 0.12)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(87, 85, 85, 0.12)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(87, 85, 85, 0.12)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(87, 85, 85, 0.12)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "rgba(87, 85, 85, 0.12)",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#79747E",
      opacity: 1,
    },
  })
);


export const StyledMultilineTextField = ({
  label,
  placeholder,
  rows = 4,
  onChange,
  value,
  preview,
  maxLength, // Add a maxLength prop
  errorMessage, // Add an optional error message prop
}) => {
  const [error, setError] = React.useState(false);

  const handleChange = (e) => {
    if (maxLength && e.target.value.length > maxLength) {
      setError(true);
    } else {
      setError(false);
    }
    onChange(e);
  };

  return (
    <div>
      <CustomTextField
        label={label}
        placeholder={placeholder}
        multiline
        rows={rows}
        value={value}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        error={error}
        preview={preview}
        helperText={
          error
            ? errorMessage || `Limit of ${maxLength} characters exceeded`
            : ""
        }
      />
    </div>
  );
};
