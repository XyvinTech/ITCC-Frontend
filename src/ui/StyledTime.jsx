import React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(87, 85, 85, 0.12)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(87, 85, 85, 0.12)",
            borderWidth: "1px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(87, 85, 85, 0.12)",
          "&.Mui-focused": {
            color: "rgba(87, 85, 85, 0.12)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(87, 85, 85, 0.12)",
            opacity: 1,
          },
        },
      },
    },
  },
});

const CustomTextField = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    "& fieldset": {
      borderColor: "rgba(87, 85, 85, 0.12)",
    },
  },
});

export const StyledTime = ({ label, placeholder, onChange, value }) => {
  const [selectedDate, setSelectedDate] = React.useState(
    value ? moment(value) : null
  );

  React.useEffect(() => {
    if (value) {
      setSelectedDate(moment(value));
    }
  }, [value]);

  const handleDateChange = (date) => {
    if (date && moment(date).isValid()) {
      const isoDate = moment(date).toISOString();
      setSelectedDate(moment(date));
      if (onChange) {
        onChange(isoDate);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => (
            <CustomTextField {...params} placeholder={placeholder} />
          )}
          sx={{ width: "100%" }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
