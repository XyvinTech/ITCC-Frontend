import { Box, Stack } from "@mui/material";
import EventTable from "../../ui/EventTable";
import { useState } from "react";
import { useEventStore } from "../../store/eventStore";
import { se } from "date-fns/locale";
import { toast } from "react-toastify";
const RsvpTable = ({ data, event }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { setRefresh, updateEvent } = useEventStore();
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const userColumns = [
    { title: "Name", field: "name", padding: "none" },
    { title: "Phone", field: "phone" },
    { title: "Member Id", field: "memberId" },
  ];
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        const updatedRsvp = event?.rsvp?.filter(
          (r) => !selectedRows?.includes(r?._id)
        );

        await updateEvent(event?._id, {
          rsvp: updatedRsvp,
        });

        setRefresh();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15px"}
        alignItems={"center"}
      >
        {/* <Stack direction={"row"} spacing={2}>
          <StyledSearchbar />
        </Stack> */}
      </Stack>{" "}
      <Box
        borderRadius={"16px"}
        bgcolor={"white"}
        p={1}
        border={"1px solid rgba(0, 0, 0, 0.12)"}
      >
        <EventTable
          columns={userColumns}
          data={data}
          menu
          onSelectionChange={handleSelectionChange}
          onDelete={handleDelete}
        />{" "}
      </Box>
    </>
  );
};

export default RsvpTable;
