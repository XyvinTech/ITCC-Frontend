import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import StyledTable from "../../ui/StyledTable.jsx";
import { eventList, userData } from "../../assets/json/TableData";
import StyledSearchbar from "../../ui/StyledSearchbar.jsx";
import { useListStore } from "../../store/listStore.js";
export default function EventHistorypage() {
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const { fetchEvent } = useListStore();
  const [row, setRow] = useState(10);

  useEffect(() => {
    let filter = {};
    if (search) {
      filter.search = search;
    }
    filter.status = "completed";
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchEvent(filter);
  }, [pageNo, search, row]);

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
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" color={"textSecondary"}>
              Event history
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Box>
      <Box padding="15px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            paddingBottom={"15px"}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={2}>
              <StyledSearchbar
                placeholder={"Search"}
                onchange={(e) => {
                  setSearch(e.target.value);
                  setPageNo(1);
                }}
              />
            </Stack>
          </Stack>{" "}
          <Box
            borderRadius={"16px"}
            bgcolor={"white"}
            p={1}
            border={"1px solid rgba(0, 0, 0, 0.12)"}
          >
            <StyledTable
              columns={eventList}
              data={userData}
              pageNo={pageNo}
              setPageNo={setPageNo}
              rowPerSize={row}
              setRowPerSize={setRow}
            />{" "}
          </Box>
        </>
      </Box>
    </>
  );
}
