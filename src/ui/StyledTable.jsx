import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Divider,
  Stack,
  TablePagination,
  IconButton,
  Checkbox,
  Menu,
  MenuItem,
  Typography,
  Skeleton,
  Chip,
} from "@mui/material";
import { ReactComponent as ViewIcon } from "../assets/icons/ViewIcon.svg";
import { ReactComponent as LeftIcon } from "../assets/icons/LeftIcon.svg";
import { ReactComponent as RightIcon } from "../assets/icons/RightIcon.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledButton } from "./StyledButton";
import moment from "moment";
import { useListStore } from "../store/listStore";
import { useAdminStore } from "../store/adminStore";

const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    padding: 16px;
    text-align: center;
    text-transform: capitalize;
    font-weight: 600;
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    background-color: #fff;
    padding: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;

    ${({ $isEmail }) =>
      $isEmail ? "text-transform: none;" : "text-transform: capitalize;"}
  }
`;

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
  cursor: ${({ showEdit }) => (showEdit ? "pointer" : "default")};
  &:hover {
    background-color: ${({ showEdit }) => (showEdit ? "#f0f0f0" : "inherit")};
  }
`;

const SelectedItemsContainer = styled(Box)`
  padding: 12px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const StyledTable = ({
  columns,
  onSelectionChange,
  onView,
  onDelete,
  onModify,
  onAction,
  menu,
  news,
  pageNo,
  setPageNo,
  onDeleteRow,
  member,
  report,
  payment,
  approve,
  college,
  rowPerSize,
  user,
  onVerify,
  setRowPerSize,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowId, setRowId] = useState(null);
  const { lists, totalCount, rowChange, loading } = useListStore();
  const { singleAdmin } = useAdminStore();
  const [selectedItemsData, setSelectedItemsData] = useState({});
  useEffect(() => {
    if (!lists.length) return;
    const newSelectedData = { ...selectedItemsData };

    selectedIds.forEach((id) => {
      if (!newSelectedData[id]) {
        const item = lists.find((row) => row._id === id);
        if (item) {
          newSelectedData[id] = item.name;
        }
      }
    });

    setSelectedItemsData(newSelectedData);
  }, [selectedIds, lists]);

  const getSelectedItemsInfo = () => {
    if (!selectedIds.length) return [];

    return selectedIds.map((id) => {
      if (selectedItemsData[id]) {
        return { id, name: selectedItemsData[id] };
      }

      const item = lists.find((row) => row._id === id);
      if (item) {
        return { id, name: item.name };
      }

      return { id, name: "Unknown" };
    });
  };

  const handleSelectAllClick = (event) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked ? lists.map((row) => row._id) : [];
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };

  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked
      ? [...selectedIds, id]
      : selectedIds.filter((selectedId) => selectedId !== id);
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };

  const handleRowDelete = (id) => {
    onDeleteRow(id);
    handleMenuClose();
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setRowId(null);
  };

  const handleView = (rowId) => {
    onView(rowId);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete();
    setSelectedIds([]);
    handleMenuClose();
  };
  const handleVerify = () => {
    onVerify();
    setSelectedIds([]);
    handleMenuClose();
  };
  const handleAction = () => {
    onAction(rowId);
    handleMenuClose();
  };

  const handleModify = () => {
    onModify(rowId);
    handleMenuClose();
  };

  const handleRowClick = (id) => {
    onView(id);
  };

  const isSelected = (id) => selectedIds.includes(id);

  const getStatusVariant = (status) => {
    if (typeof status === "boolean") {
      return status ? "#2D9CDB" : "#F44336"; // Primary for true, red for false
    }
    switch (status) {
      case "pending":
        return "#F2C94C"; // Yellow tone
      case "rejected":
        return "#EB5757"; // Soft red
      case "active":
        return "#27AE60"; // Green tone
      case "inactive":
        return "#828282"; // Grey
      case "expired":
        return "#A9A9A9"; // Dark grey
      case "deleted":
        return "#B00020"; // Deep red
      case "cancelled":
        return "#F2994A"; // Orange
      case "blocked":
        return "#D32F2F"; // Bright red
      case "published":
        return "#2D9CDB"; // Primary
      case "unpublished":
        return "#9B51E0"; // Purple
      case "created":
        return "#56CCF2"; // Light blue
      case "success":
        return "#219653"; // Green
      case "failure":
        return "#EB5757"; // Same as rejected
      case "live":
        return "#2F80ED"; // Strong blue
      case "accepted":
        return "#6FCF97"; // Light green
      case "meeting_scheduled":
        return "#00BCD4"; // Cyan
      case "completed":
        return "#BB6BD9"; // Violet
      case "awaiting_payment":
        return "#F4A261"; // Soft orange (you can change this to fit your theme)
      default:
        return "#BDBDBD"; // Neutral grey
    }
  };

  const formatIndianDate = (date) => {
    if (!date) return "";

    return moment.utc(date).format("DD-MM-YYYY");
  };

  const formatTime = (time) => {
    return moment(time).format("h:mm A");
  };

  const pageInc = () => {
    setPageNo((prev) => prev + 1);
  };

  const pageDec = () => {
    setPageNo((prev) => prev - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerSize(parseInt(event.target.value, 10));
    setPageNo(1);
  };

  const selectedItems = getSelectedItemsInfo();

  return (
    <Box bgcolor={"white"} borderRadius={"16px"}>
      <TableContainer sx={{ border: "none" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  checked={
                    lists &&
                    lists.length > 0 &&
                    selectedIds.length === lists.length
                  }
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.field}
                  padding={column.padding || "normal"}
                >
                  {column.title}
                </StyledTableCell>
              ))}
              <StyledTableCell padding="normal"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell padding="checkbox">
                    <Skeleton variant="rectangular" width={24} height={24} />
                  </StyledTableCell>

                  {columns.map((column) => (
                    <StyledTableCell key={column.field}>
                      <Skeleton variant="text" width="100%" height={20} />
                    </StyledTableCell>
                  ))}

                  <StyledTableCell>
                    <Box display="flex" alignItems="center">
                      <Skeleton variant="circular" width={24} height={24} />

                      <Skeleton
                        variant="circular"
                        width={24}
                        height={24}
                        sx={{ marginLeft: 1 }}
                      />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : lists.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length + 2}>
                  <Typography variant="h7" textAlign="center">
                    No data
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              lists.map((row) => (
                <StyledTableRow
                  role="checkbox"
                  key={row._id}
                  selected={isSelected(row._id)}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row._id)}
                      onChange={(event) =>
                        handleRowCheckboxChange(event, row._id)
                      }
                    />
                  </StyledTableCell>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.field}
                      padding={column.padding || "normal"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(row._id)}
                      $isEmail={
                        column.field === "email" ||
                        column.field === "apiEndpoint"
                      }
                    >
                      {[
                        "renewal",
                        "paymentdate",
                        "date",
                        "createdAt",
                        "startDate",
                        "endDate",
                        "expiryDate",
                        "dateOfJoining",
                      ].includes(column.field) ? (
                        formatIndianDate(row[column.field])
                      ) : [
                          "startTime",
                          "endtime",
                          "time",
                          "updatedAt",
                        ].includes(column.field) ? (
                        formatTime(row[column.field])
                      ) : [
                          "banner_image_url",
                          "image",
                          "event image",
                          "speaker_image",
                          "media",
                        ].includes(column.field) ? (
                        <>
                          <img
                            src={row[column.field]}
                            alt={column.title}
                            style={{ width: "50px", height: "50px" }}
                          />{" "}
                        </>
                      ) : column.field === "status" ||
                        column.field === "activate" ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <span
                            style={{
                              color: getStatusVariant(row[column.field]),
                              padding: "3px 8px",
                              borderRadius: "100px",
                              border: `1px solid ${getStatusVariant(
                                row[column.field]
                              )}`,
                            }}
                          >
                            {row[column.field] === true ||
                            row[column.field] === "activated"
                              ? "active"
                              : row[column.field] === false ||
                                row[column.field] === "deactivated"
                              ? "inactive"
                              : row[column.field]}
                          </span>
                        </Box>
                      ) : typeof row[column.field] === "string" &&
                        row[column.field].length > 30 ? (
                        `${row[column.field].slice(0, 30)}...`
                      ) : (
                        row[column.field]
                      )}
                    </StyledTableCell>
                  ))}

                  <StyledTableCell padding="normal">
                    <Box display="flex" alignItems="center">
                      {onView && (
                        <IconButton
                          aria-controls="simple-view"
                          aria-haspopup="true"
                          onClick={() => handleView(row._id)}
                        >
                          <ViewIcon />
                        </IconButton>
                      )}{" "}
                      {!menu &&
                        row.status !== "rejected" &&
                        row.status !== "accepted" &&
                        !((payment || approve) && row.status === "active") && (
                          <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => handleMenuOpen(event, row._id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        )}
                      <Menu
                        id="row-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && rowId === row._id}
                        onClose={handleMenuClose}
                      >
                        {news
                          ? [
                              <>
                                <MenuItem onClick={handleModify}>Edit</MenuItem>
                                <MenuItem onClick={handleAction}>
                                  Publish/Unpublish
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleRowDelete(row._id)}
                                  style={{ color: "red" }}
                                >
                                  Remove
                                </MenuItem>
                              </>,
                            ]
                          : report
                          ? [
                              <>
                                {" "}
                                <MenuItem onClick={handleModify}>
                                  Report
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleRowDelete(row._id)}
                                  style={{ color: "red" }}
                                >
                                  Remove
                                </MenuItem>
                              </>,
                            ]
                          : member
                          ? [
                              <>
                                <MenuItem onClick={handleModify}>Edit</MenuItem>
                                {row.status !== "deleted" && (
                                  <>
                                    <MenuItem
                                      onClick={() => handleRowDelete(row._id)}
                                      style={{ color: "red" }}
                                    >
                                      Delete
                                    </MenuItem>
                                    <MenuItem onClick={handleAction}>
                                      {row.status === "suspended"
                                        ? "Unsuspend"
                                        : "Suspend"}
                                    </MenuItem>
                                  </>
                                )}
                              </>,
                            ]
                          : payment
                          ? [
                              <>
                                {row.status === "published" && (
                                  <MenuItem onClick={handleAction}>
                                    Reject
                                  </MenuItem>
                                )}
                                {row.status === "unpublished" && (
                                  <MenuItem onClick={handleModify}>
                                    Approve
                                  </MenuItem>
                                )}
                                {row.status !== "published" &&
                                  row.status !== "unpublished" && (
                                    <>
                                      <MenuItem onClick={handleModify}>
                                        Approve
                                      </MenuItem>
                                      {row.status !== "cancelled" && (
                                        <MenuItem onClick={handleAction}>
                                          Reject
                                        </MenuItem>
                                      )}
                                    </>
                                  )}
                              </>,
                            ]
                          : approve
                          ? [
                              <>
                                <MenuItem onClick={handleView}>
                                  View Details
                                </MenuItem>

                                {row.status === "published" && (
                                  <MenuItem onClick={handleAction}>
                                    Unpublish
                                  </MenuItem>
                                )}
                                {row.status === "unpublished" && (
                                  <MenuItem onClick={handleModify}>
                                    Publish
                                  </MenuItem>
                                )}
                                {row.status !== "published" &&
                                  row.status !== "unpublished" && (
                                    <>
                                      <MenuItem onClick={handleModify}>
                                        Publish
                                      </MenuItem>
                                      {row.status !== "cancelled" && (
                                        <MenuItem onClick={handleAction}>
                                          Unpublish
                                        </MenuItem>
                                      )}
                                    </>
                                  )}
                              </>,
                            ]
                          : college
                          ? [
                              <>
                                <MenuItem onClick={handleView}>
                                  View Details
                                </MenuItem>
                                <MenuItem onClick={handleAction}>
                                  Add Member
                                </MenuItem>
                                <MenuItem onClick={handleModify}>Edit</MenuItem>
                                <MenuItem
                                  onClick={() => handleRowDelete(row._id)}
                                  style={{ color: "red" }}
                                >
                                  Delete
                                </MenuItem>
                              </>,
                            ]
                          : [
                              <>
                                {" "}
                                <MenuItem onClick={handleModify}>Edit</MenuItem>
                                <MenuItem
                                  onClick={() => handleRowDelete(row._id)}
                                  style={{ color: "red" }}
                                >
                                  Remove
                                </MenuItem>
                              </>,
                            ]}
                      </Menu>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Divider />

        {selectedIds.length > 0 && user && (
          <Box padding={2}>
            <SelectedItemsContainer>
              {selectedItems.map((item) => (
                <Chip
                  key={item.id}
                  label={item.name}
                  variant="outlined"
                  color="primary"
                  onDelete={() =>
                    handleRowCheckboxChange(
                      { target: { checked: false } },
                      item.id
                    )
                  }
                />
              ))}
            </SelectedItemsContainer>
          </Box>
        )}

        <Stack
          component="div"
          direction={"row"}
          justifyContent={
            selectedIds.length > 0
              ? onDelete
                ? "space-between"
                : "flex-end"
              : "flex-end"
          }
          alignItems="center"
          padding={2}
        >
          {selectedIds.length > 0 && onDelete && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography paddingRight={3}>
                {`${selectedIds.length} item${
                  selectedIds.length > 1 ? "s" : ""
                } selected`}
              </Typography>
              <StyledButton
                variant="third"
                name="Delete"
                onClick={() => handleDelete(selectedIds)}
              />
              {user && (
                <>
                  <StyledButton
                    variant="primary"
                    name="verify"
                    onClick={() => handleVerify(selectedIds)}
                  />
                </>
              )}
            </Stack>
          )}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <TablePagination
                component="div"
                rowsPerPage={rowPerSize}
                labelDisplayedRows={({ from, to }) =>
                  `${pageNo}-${Math.ceil(
                    totalCount / rowPerSize
                  )} of ${totalCount}`
                }
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={({ onPageChange }) => (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    marginLeft={2}
                  >
                    {" "}
                    <Box
                      onClick={pageNo > 1 ? pageDec : null}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: pageNo > 1 ? "pointer" : "not-allowed",
                        opacity: pageNo > 1 ? 1 : 0.5,
                      }}
                    >
                      <LeftIcon />{" "}
                    </Box>
                    <Box
                      onClick={
                        pageNo < Math.ceil(totalCount / rowPerSize)
                          ? pageInc
                          : null
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor:
                          pageNo < Math.ceil(totalCount / rowPerSize)
                            ? "pointer"
                            : "not-allowed",
                        opacity:
                          pageNo < Math.ceil(totalCount / rowPerSize) ? 1 : 0.5,
                      }}
                    >
                      {" "}
                      <RightIcon />{" "}
                    </Box>
                  </Stack>
                )}
              />
            </Box>
          </Stack>
        </Stack>
      </TableContainer>
    </Box>
  );
};

export default StyledTable;
