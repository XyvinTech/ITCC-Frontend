import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { useNavigate } from "react-router-dom";
import { usePromotionStore } from "../../store/promotionstore";
import { toast } from "react-toastify";
import { useListStore } from "../../store/listStore";
import { useAdminStore } from "../../store/adminStore";

const StyledVideoTable = () => {
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const { deletePromotions } = usePromotionStore();
  const { fetchPromotion } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const { singleAdmin } = useAdminStore();
  const [row, setRow] = useState(10);
  useEffect(() => {
    let filter = { type: "video" };
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchPromotion(filter);
  }, [isChange, pageNo, row]);

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deletePromotions(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const handleEdit = (id) => {
    navigate(`/promotions/edit/${id}`);
  };
  const handleRowDelete = async (id) => {
    try {
      await deletePromotions(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const userColumns = [
    { title: "Start Date", field: "startDate", padding: "none" },
    { title: "End Date", field: "endDate", padding: "none" },
    { title: "Title", field: "title" },
    { title: "Priority", field: "priority" },
    { title: "Status", field: "status" },
  ];
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15px"}
        alignItems={"center"}
      ></Stack>{" "}
      <Box
        borderRadius={"16px"}
        bgcolor={"white"}
        p={1}
        border={"1px solid rgba(0, 0, 0, 0.12)"}
      >
        {singleAdmin?.role?.permissions?.includes(
          "promotionManagement_modify"
        ) ? (
          <StyledTable
            columns={userColumns}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            onDeleteRow={handleRowDelete}
            onModify={handleEdit}
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            setRowPerSize={setRow}
          />
        ) : (
          <StyledTable
            columns={userColumns}
            menu
            onSelectionChange={handleSelectionChange}
            onDeleteRow={handleRowDelete}
            onModify={handleEdit}
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            setRowPerSize={setRow}
          />
        )}
      </Box>
    </>
  );
};

export default StyledVideoTable;
