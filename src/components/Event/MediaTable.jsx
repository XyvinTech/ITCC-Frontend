import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { useListStore } from "../../store/listStore";
import { toast } from "react-toastify";
import { useFolderStore } from "../../store/folderStore";
import { Box, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { StyledButton } from "../../ui/StyledButton";
import AddFolder from "./AddFolder";

const MediaTable = ({ data }) => {
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const { fetchFolder } = useListStore();
  const [search, setSearch] = useState("");
  const { deleteFolders } = useFolderStore();
  const [open, setOpen] = useState(false);
  const [folderId, setFolderId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    if (search) {
      filter.search = search;
    }
    fetchFolder(data, filter);
  }, [isChange, pageNo, row, search]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const userColumns = [
    { title: "Name", field: "name", padding: "none" },
    { title: "Created At", field: "createdAt" },
  ];
  const handleView = async (id) => {
    navigate(`/event/media/${id}`);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteFolders(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);

        setIsChange(!isChange);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const handleEdit = async (id) => {
    setFolderId(id);
    setOpen(true);
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
            onchange={(e) => {
              setSearch(e.target.value);
              setPageNo(1);
            }}
          />
          <StyledButton
            name={"Add New Folder"}
            variant="primary"
            onClick={() => setOpen(true)}
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
          columns={userColumns}
          onModify={handleEdit}
          onSelectionChange={handleSelectionChange}
          onDelete={handleDelete}
          pageNo={pageNo}
          setPageNo={setPageNo}
          onView={handleView}
          rowPerSize={row}
          setRowPerSize={setRow}
        />{" "}
      </Box>
      <AddFolder
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        folderId={folderId}
        setIsChange={() => setIsChange((prev) => !prev)}
      />
    </>
  );
};

export default MediaTable;
