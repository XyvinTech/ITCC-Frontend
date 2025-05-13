import React, { useRef, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const CustomTextField = styled(TextField)(({ theme }) => ({
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
    color: "rgba(87, 85, 85, 0.12)",
    opacity: 1,
  },
}));

const PreviewContainer = styled(Box)({
  position: "relative",
  display: "inline-block",
  marginTop: "10px",
});

const ImagePreview = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "contain",
  border: "1px solid rgba(87, 85, 85, 0.12)",
  borderRadius: "4px",
});

const PdfPreview = styled("div")({
  width: "100px",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(87, 85, 85, 0.12)",
  borderRadius: "4px",
  backgroundColor: "#f0f0f0",
  fontSize: "12px",
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 0.5)",
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: -8,
  right: -8,
  padding: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});

export const StyledEventUpload = ({ label, value, onChange }) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(value || null);
  const [isPdf, setIsPdf] = useState(false);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setIsPdf(false);
      } else if (fileType === "application/pdf") {
        setSelectedImage(file.name);
        setIsPdf(true);
      }
      onChange(file); // Update form value with the selected file
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    onChange(null); // Clear the form value
    // Revoke object URL if it exists to prevent memory leaks
    if (selectedImage && !isPdf) {
      URL.revokeObjectURL(selectedImage);
    }
  };

  useEffect(() => {
    if (value && typeof value === "string") {
      setSelectedImage(value);
      setIsPdf(value.endsWith(".pdf"));
    }
  }, [value]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (selectedImage && !isPdf && typeof selectedImage === "string" && selectedImage.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage, isPdf]);

  return (
    <>
      <CustomTextField
        fullWidth
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <BackupOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
        value={selectedImage ? (isPdf ? selectedImage : "Image selected") : ""}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*,application/pdf"
      />
      {selectedImage && (
        <PreviewContainer>
          {isPdf ? (
            <PdfPreview>PDF Preview: {selectedImage}</PdfPreview>
          ) : (
            <ImagePreview src={selectedImage} alt="Preview" />
          )}
          <CloseButton size="small" onClick={handleRemove}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </PreviewContainer>
      )}
    </>
  );
};