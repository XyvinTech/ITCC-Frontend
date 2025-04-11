import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { approvalColumns } from "../../assets/json/TableData";
import { useListStore } from "../../store/listStore";
import { toast } from "react-toastify";
import { StyledButton } from "../../ui/StyledButton";
import { useMemberStore } from "../../store/Memberstore";
import MemberView from "../../components/Member/MemberView";

const MembershipApproval = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(""); 
  const [approvalId, setApprovalId] = useState(null);
  const [view, setView] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const { fetchMemberApprovals } = useListStore();
  const { fetchMemberById, member, updateMemberApproval } = useMemberStore();

  const handleChange = () => {
    setIsChange((prev) => !prev);
  };

  useEffect(() => {
    let filter = {
      pageNo,
      limit: row,
    };
    if (search) {
      filter.search = search;
      setPageNo(1);
    }
    fetchMemberApprovals(filter);
  }, [isChange, pageNo, search, row]);

  const handleApprove = (id) => {
    setApprovalId(id);
    setDialogType("approve");
    setDialogOpen(true);
  };

  const handleReject = (id) => {
    setApprovalId(id);
    setDialogType("reject");
    setDialogOpen(true);
  };

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };

  const handleView = async (id) => {
    await fetchMemberById(id);
    setView(true);
  };

  const handleConfirm = async () => {
    try {
      await updateMemberApproval(approvalId, {
        status: dialogType === "approve" ? "active" : "inactive",
      });
      handleChange();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDialogOpen(false);
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
        <Stack direction={"row"} spacing={2}>
          <StyledSearchbar
            placeholder={"Search"}
            onchange={(e) => setSearch(e.target.value)}
          />
        </Stack>
      </Stack>

      <Box
        borderRadius={"16px"}
        bgcolor={"white"}
        p={1}
        border={"1px solid rgba(0, 0, 0, 0.12)"}
      >
        <StyledTable
          columns={approvalColumns}
          payment
          onView={handleView}
          onSelectionChange={handleSelectionChange}
          onModify={handleApprove}
          onAction={handleReject}
          pageNo={pageNo}
          setPageNo={setPageNo}
          rowPerSize={row}
          setRowPerSize={setRow}
        />
      </Box>

      <MemberView
        open={view}
        onClose={() => setView(false)}
        data={member}
        view
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {dialogType === "approve" ? "Confirm Approval" : "Confirm Rejection"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {dialogType === "approve" ? "approve" : "reject"} this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            onClick={() => setDialogOpen(false)}
            variant="secondary"
            name={"Cancel"}
          />

          <StyledButton
            onClick={handleConfirm}
            variant={"primary"}
            name={dialogType === "approve" ? "Approve" : "Reject"}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MembershipApproval;
