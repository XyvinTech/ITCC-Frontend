import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import NewsDisplay from "./NewsDisplay";
import { StyledButton } from "../../ui/StyledButton";

import { ReactComponent as AddIcon } from "../../assets/icons/AddIcon.svg";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore";

const Newspage = () => {
  const navigate = useNavigate();
  const { singleAdmin } = useAdminStore();
  return (
    <>
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" color={"textSecondary"}>
              News
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              {singleAdmin?.role?.permissions?.includes(
                "newsManagement_modify"
              ) && (
                <StyledButton
                  name={
                    <>
                      <AddIcon /> Add News
                    </>
                  }
                  variant="primary"
                  onClick={() => navigate("/news/add")}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box padding="15px" marginBottom={4}>
        <Grid container>
          <Grid item md={12}>
            <NewsDisplay />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Newspage;
