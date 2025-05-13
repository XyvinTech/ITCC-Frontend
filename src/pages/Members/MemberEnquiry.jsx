import React, { useEffect, useState } from "react";
import { Box, Stack, } from "@mui/material";

import StyledTable from "../../ui/StyledTable";
import {useParams } from "react-router-dom";
import { useListStore } from "../../store/listStore";

const MemberEnquiry = () => {
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const { id } = useParams();
  const { fetchEnquiry } = useListStore();
  useEffect(() => {
    fetchEnquiry(id);
  }, [id]);
  const activityColumns = [
    { title: "Name", field: "name", padding: "none" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "Description", field: "description" },
  ];
  return (
    <>
      <Box padding={"15px"}>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={"15px"}
          alignItems={"center"}
        ></Stack>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            columns={activityColumns}
            pageNo={pageNo}
            setPageNo={setPageNo}
            menu
            rowPerSize={row}
            setRowPerSize={setRow}
          />
        </Box>
      </Box>
    </>
  );
};

export default MemberEnquiry;
