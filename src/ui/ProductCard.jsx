import React from "react";
import {
  Box,
  Typography,
  Chip,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const discountPercentage =
    product?.price && product?.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  return (
    <Card
      elevation={2}
      sx={{
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        overflow: "visible",
        position: "relative",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        boxShadow:"none"
      }}
    >
      {discountPercentage > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "-10px",
            right: "20px",
            zIndex: 1,
            backgroundColor: "#f44336",
            color: "white",
            padding: "4px 12px",
            borderRadius: "16px",
            fontWeight: "bold",
            fontSize: "0.75rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          }}
        >
          {discountPercentage}% OFF
        </Box>
      )}

      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={product?.image}
          alt={product?.name}
          sx={{
            height: 140, 
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />

        {product?.tags && product.tags.length > 0 && (
          <Chip
            label={product.tags[0]}
            size="small"
            sx={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              textTransform: "capitalize",
              backgroundColor: "rgba(25, 118, 210, 0.9)",
              color: "white",
              fontWeight: 500,
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2, pt: 1.5 }}>
     
        <Typography
          gutterBottom
          variant="h6"
          fontWeight={600}
          sx={{
            fontSize: "0.95rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mb: 0.5
          }}
        >
          {product?.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 1.5,
            fontSize: "0.8rem",
          }}
        >
          {product?.description}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary.main"
                sx={{ fontSize: "1rem" }}
              >
                ₹{product?.offerPrice || product?.price}
              </Typography>

              {product?.offerPrice && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  ₹{product?.price}
                </Typography>
              )}
            </Stack>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.7rem" }}
            >
              Min. Order: {product?.moq} {product?.units}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
