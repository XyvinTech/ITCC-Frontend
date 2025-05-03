import React, { useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import { ReactComponent as LocationIcon } from "../assets/icons/LocationIcon.svg";
import { StyledButton } from "./StyledButton";
import BlockProfile from "../components/Member/BlockProfile";
import { useParams } from "react-router-dom";
import image from "../assets/images/image.png";
import UnBlockProfile from "../components/Member/UnBlockProfile";
import moment from "moment";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useMemberStore } from "../store/Memberstore";

const UserCard = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [unopen, setUnOpen] = useState(false);
  const { verifyUser, setRefreshMember } = useMemberStore();
  const formatIndianDate = (date) => {
    if (!date) return "";
    return moment.utc(date).format("DD-MM-YYYY");
  };

  const { id } = useParams();

  const handleBlock = () => {
    setOpen(true);
  };

  const handleUnBlock = () => {
    setUnOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnClose = () => {
    setUnOpen(false);
  };

  const toggleVerification = async () => {
    await verifyUser(id, { blueTick: !user?.blueTick });
    setRefreshMember();
  };

  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"10px"}
      minHeight={"420px"}
      position="relative"
    >
      <Grid item md={6} xs={12}>
        <div style={{ position: "relative" }}>
          <img
            src={user?.image || image}
            alt="img"
            width={"216px"}
            height={"216px"}
            style={{ borderRadius: "12px", objectFit: "cover" }}
          />
        </div>
      </Grid>
      <Grid item md={6} xs={12} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={"10px"}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h7"
              color="white"
              fontWeight="bold"
              sx={{
                backgroundColor: "orange",
                padding: "0px 6px",
                borderRadius: "12px",
                width: "fit-content",
                textTransform: "capitalize",
              }}
            >
              {user?.subscription}
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={user?.blueTick}
                  onChange={toggleVerification}
                  color="info"
                />
              }
              label={
                <Typography
                  variant="body2"
                  color={user?.blueTick ? "success.main" : "text.secondary"}
                >
                  {user?.blueTick ? "Verified" : "Unverified"}
                </Typography>
              }
            />
          </div>
          <Box display="flex" alignItems="center">
            <Typography variant="h5" color={"textPrimary"}>
              {user?.name}
            </Typography>
            {user?.blueTick && (
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  marginLeft: "8px",
                  color: "#1976d2", 
                }}
              >
                <VerifiedIcon fontSize="small" />
              </Box>
            )}
          </Box>
          <Stack direction={"row"} spacing={2}>
            <Typography variant="h7" color={"textPrimary"}>
              Designation :
            </Typography>
            <Typography variant="h7" color={"textPrimary"} fontWeight={600}>
              {user?.designation}
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Typography variant="h7" color={"textPrimary"}>
              User Id :
            </Typography>
            <Typography variant="h7" color={"textPrimary"} fontWeight={600}>
              {user?.memberId}
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Typography variant="h7" color={"textPrimary"}>
              Date Joined :
            </Typography>
            <Typography variant="h7" color={"textPrimary"} fontWeight={600}>
              {formatIndianDate(user?.dateOfJoining)}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack>
              <PhoneIcon />{" "}
            </Stack>
            <Typography variant="h7" color={"textPrimary"}>
              {user?.phone}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack>
              {" "}
              <EmailIcon />{" "}
            </Stack>
            <Typography variant="h7" color={"textPrimary"}>
              {user?.email}
            </Typography>
          </Stack>
          {user?.address && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack>
                <LocationIcon />{" "}
              </Stack>
              <Typography variant="h7" color={"textPrimary"}>
                {user?.address}
              </Typography>
            </Stack>
          )}{" "}
          <Stack direction="row" alignItems="center" spacing={2}>
            {user?.status === "active" && (
              <StyledButton
                variant={"primary"}
                name={"Block"}
                onClick={handleBlock}
              />
            )}
            {user?.status === "blocked" && (
              <StyledButton
                variant={"secondary"}
                name={"UnBlock"}
                onClick={handleUnBlock}
              />
            )}
          </Stack>
        </Stack>
      </Grid>

      <Grid
        item
        md={12}
        xs={12}
        display={"flex"}
        alignItems={"flex-start"}
        flexDirection={"column"}
      >
        {user?.bio && (
          <>
            <Typography variant="h7" color={"textPrimary"} fontWeight={700}>
              Bio
            </Typography>
            <Typography variant="h7" color={"textPrimary"}>
              {user?.bio}
            </Typography>
          </>
        )}
      </Grid>

      {user?.company?.length > 0 && (
        <Grid item md={12} xs={12} display="flex" flexDirection="column">
          <Typography
            variant="h7"
            color="textTertiary"
            fontWeight={700}
            marginTop="10px"
          >
            Company Details
          </Typography>
          <Grid container spacing={2} marginTop="10px">
            {user.company.map((company, index) => (
              <Grid
                key={company._id}
                item
                md={3}
                xs={12}
                borderRadius="8px"
                padding="12px"
              >
                <Stack spacing={2}>
                  <Typography variant="h7" color="textTertiary">
                    <strong>Company Name:</strong> {company.name}
                  </Typography>
                  <Typography variant="h7" color="textTertiary">
                    <strong>Designation:</strong> {company.designation}
                  </Typography>
                  <Typography variant="h7" color="textTertiary">
                    <strong>Email:</strong> {company.email}
                  </Typography>
                  <Typography variant="h7" color="textTertiary">
                    <strong>Phone:</strong> {company.phone}
                  </Typography>
                  <Typography variant="h7" color="textTertiary">
                    <strong>Website:</strong>{" "}
                    <a
                      href={`https://${company.websites}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1976d2", textDecoration: "none" }}
                    >
                      {company.websites}
                    </a>
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      <BlockProfile open={open} onClose={handleClose} id={id} />
      <UnBlockProfile open={unopen} onClose={handleUnClose} id={id} />
    </Grid>
  );
};

export default UserCard;