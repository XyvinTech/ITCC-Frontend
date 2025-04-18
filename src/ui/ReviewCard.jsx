import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import moment from "moment";

const ReviewCard = ({ review }) => {
  const formattedDate = review?.createdAt
    ? moment(review.createdAt).fromNow()
    : "";

  return (
    <Box
      elevation={1}
      sx={{
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar
            src={review?.reviewer?.image}
            alt={review?.reviewer?.name}
            sx={{ width: 50, height: 50 }}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {review?.reviewer?.name}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
              spacing={1}
            >
              <Rating
                value={review?.rating || 0}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="caption" color="text.secondary">
                {formattedDate}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.6,
          }}
        >
          {review?.comment}
        </Typography>
      </CardContent>
      
    </Box>
  );
};

export default ReviewCard;
