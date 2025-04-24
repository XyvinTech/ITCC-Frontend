import React, { useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import FeedList from "./FeedList";
import MembershipApproval from "./MembershipApproval";
import BusinessPosts from "./BusinessPosts";

const ApprovalPage = () => {
  const storedTab = localStorage.getItem("approvalTab");
  const [selectedTab, setSelectedTab] = useState(
    storedTab ? Number(storedTab) : 0
  );

  const handleChange = (event, newValue) => {
    localStorage.setItem("approvalTab", newValue);
    setSelectedTab(newValue);
  };
  return (
    <>
      {" "}
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography variant="h4" color={"textSecondary"}>
          Approvals
        </Typography>
      </Box>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#2D9CDB",
            height: 4,
            borderRadius: "4px",
          },
        }}
        sx={{
          paddingTop: "0px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#2D9CDB",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            color: "#686465",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#2D9CDB",
          },
        }}
      >
        {/* <Tab label="Members List" /> */}
        <Tab label="Requirements" />
        <Tab label="Business Posts" />
      </Tabs>
      <Divider />{" "}
      <Box padding={"15px"}>
      {/* {selectedTab === 0 && (
          <Grid>
            <MembershipApproval />
          </Grid>
        )} */}
        {selectedTab === 0 && (
          <Grid>
            <FeedList />
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid>
            <BusinessPosts />
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ApprovalPage;
