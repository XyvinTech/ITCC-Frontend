import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import EventList from "../../components/Event/EventList";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { StyledButton } from "../../ui/StyledButton";
import EventView from "./EventView";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore";

const EventListpage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const { singleAdmin } = useAdminStore();
  return (
    <>
      <Stack
        direction={"row"}
        padding={"10px"}
        bgcolor={"#fff"}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h4" color="textSecondary">
            Events
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          {singleAdmin?.role?.permissions?.includes(
            "eventManagement_modify"
          ) && (
            <StyledButton
              variant={"primary"}
              name={"Add Event"}
              onClick={() => {
                navigate("/events/add");
              }}
            />
          )}
        </Stack>
      </Stack>{" "}
      <Box padding="15px">
        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Box
            bgcolor={selectedTab === 0 ? "#EEF1FF" : "#FFFFFF"}
            borderRadius="50%"
            width="48px"
            height="48px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedTab(0);
            }}
          >
            <MenuIcon
              style={{
                color: selectedTab === 1 ? "#292D32" : "#2D9CDB",
              }}
            />
          </Box>
          {singleAdmin?.role?.permissions?.includes(
            "eventManagement_modify"
          ) && (
            <Box
              bgcolor={selectedTab === 1 ? "#EEF1FF" : "#FFFFFF"}
              borderRadius="50%"
              width="48px"
              height="48px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedTab(1);
              }}
            >
              <CalendarMonthIcon
                style={{
                  color: selectedTab === 0 ? "#292D32" : "#2D9CDB",
                }}
              />
            </Box>
          )}
        </Stack>
        {selectedTab === 0 ? <EventList /> : <EventView />}
      </Box>
    </>
  );
};

export default EventListpage;
