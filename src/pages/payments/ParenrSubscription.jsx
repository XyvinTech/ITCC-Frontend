import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { usePaymentStore } from "../../store/paymentStore";
import ParentSub from "./ParentSub";
import { useListStore } from "../../store/listStore";
import { toast } from "react-toastify";

const ParentSubscription = () => {
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [update, setUpdate] = useState(false);
  const { fetchParentSubByiD, sub, refreshMember, deleteParentSubs } =
    usePaymentStore();
  const { fetchParentSub } = useListStore();
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteParentSubs(id)));
        toast.success("Subscription deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      } catch {
        toast.error(error.message);
      }
    }
  };
  const handleRowDelete = async (id) => {
    try {
      await deleteParentSubs(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchParentSub();
  }, [pageNo, row, refreshMember, isChange]);
  const parentSubColums = [
    { title: "Name", field: "name" },
    { title: "Description", field: "description" },
    { title: "Days", field: "days" },
    { title: "Amount", field: "price" },
  ];
  const handleEdit = async (id) => {
    await fetchParentSubByiD(id);
    setOpen(true);
    setUpdate(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
  };

  return (
    <Box
      borderRadius={"16px"}
      bgcolor={"white"}
      p={1}
      border={"1px solid rgba(0, 0, 0, 0.12)"}
    >
      <StyledTable
        columns={parentSubColums}
        pageNo={pageNo}
        onSelectionChange={handleSelectionChange}
        onDelete={handleDelete}
        onModify={handleEdit}
        setPageNo={setPageNo}
        rowPerSize={row}
        onDeleteRow={handleRowDelete}
        setRowPerSize={setRow}
      />{" "}
      <ParentSub
        open={open}
        onClose={(e) => handleClose(e)}
        isUpdate={update}
        sub={sub}
      />
    </Box>
  );
};

export default ParentSubscription;
