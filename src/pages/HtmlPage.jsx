import React, { useEffect, useState } from "react";
import { addEnquiry, getSingleUser } from "../api/memberapi";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Container,
  Paper,
  Grid,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import image from "../assets/images/squares.png";
import userimage from "../assets/images/image.png";
import logo from "../assets/images/image_0.png";
import {
  Chat,
  Email,
  Facebook,
  Instagram,
  Language,
  LinkedIn,
  LocationCity,
  LocationOn,
  Phone,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import { ReactComponent as WhatsappIcon } from "../assets/icons/WhatsappIcon.svg";
import AwardCard from "../ui/AwardCard";
import CertificateCard from "../ui/CertificateCard";
import ProductCard from "../ui/ProductCard";
import Video from "../components/Member/Video";
import ReviewCard from "../ui/ReviewCard";
import { StyledButton } from "../ui/StyledButton";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField";
const MemberProfileCard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);

  const formattedId = id?.endsWith("/") ? id.slice(0, -1) : id;
  const { control, handleSubmit, reset } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleUser(formattedId);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [formattedId]);
  const onSubmit = async (data) => {
    setSubmitting(true);
    const formData = {
      ...data,
      user: formattedId,
    };
    try {
      await addEnquiry(formData);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6">User not found</Typography>
      </Box>
    );
  }
  const handleSaveContact = async () => {
    try {
      if (!userData || !userData.name || !userData.phone ) {
        throw new Error(
          "Incomplete user data. Please provide name, phone, and email."
        );
      }

      const vCardContent = `BEGIN:VCARD\r\nVERSION:3.0\r\nN:${userData.name
        .split(" ")
        .reverse()
        .join(";")}\r\nFN:${userData.name}\r\nTEL;TYPE=CELL:${
        userData.phone
      }\r\nEMAIL:${userData?.email}\r\nEND:VCARD`;

      const blob = new Blob([vCardContent], {
        type: "text/vcard;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${userData.name.replace(/ /g, "_")}.vcf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating vCard:", error);
    }
  };
  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram sx={{ color: "#0C1E8A" }} />;
      case "linkedin":
        return <LinkedIn sx={{ color: "#0C1E8A" }} />;
      case "twitter":
        return <Twitter sx={{ color: "#0C1E8A" }} />;
      case "facebook":
        return <Facebook sx={{ color: "#0C1E8A" }} />;
      default:
        return <Avatar sx={{ bgcolor: "#ccc", width: 24, height: 24 }} />;
    }
  };
  return (
    <Grid
      container
      sx={{
        py: 4,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Grid item xs={12} lg={8}>
        {" "}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: "15px",
            border: {
              sm: "1px solid #ccc",
              xs: "none",
            },
            p: 4,
          }}
        >
          <Grid item xs={12} lg={12}>
            {" "}
            <Card
              sx={{
                width: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: 3,
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `linear-gradient(
      rgba(11, 150, 245, 0.67),
      rgba(12, 30, 138, 0.67)
    ), url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  pt: 4,
                  pb: 4,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    p: 0.5,
                    mx: "auto",
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow:
                      "0 0 0 5px rgba(255, 255, 255, 0.5), 0 0 15px 10px rgba(0, 123, 255, 0.3)",
                  }}
                >
                  <Avatar
                    src={userData?.image || userimage}
                    alt={userData?.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      border: "1px solid white",
                      boxShadow: 2,
                    }}
                  />
                </Box>

                <Typography
                  variant="h5"
                  component="h1"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {userData?.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: "medium" }}
                >
                  aa
                </Typography>
                {userData?.company?.length > 0 && (
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 2 }}
                  >
                    {userData.company.map((c) => c.name).join(" || ")}
                  </Typography>
                )}

                <Paper
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: "12px 24px",
                    borderRadius: 1,
                    boxShadow: 1,
                    maxWidth: 300,
                    mx: "auto",
                    my: 2,
                  }}
                >
                  <Avatar src={logo} sx={{ width: 32, height: 32, mr: 2 }} />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#0C1E8A" }}
                  >
                    Member ID- {userData?.memberId}
                  </Typography>
                </Paper>
              </Box>
            </Card>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: {
                    xs: 3,
                    sm: 0,
                  },
                }}
              >
                {" "}
                <Box
                  sx={{
                    borderRadius: "15px",
                    p: 3,
                    width: "100%",
                    border: {
                      xs: "1px solid #ccc",
                      sm: "none",
                    },
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    About Us
                  </Typography>
                  <Typography variant="h7" color="#3A3A3A">
                    {userData?.bio || "No bio provided."}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    borderRadius: "15px",
                    p: 3,
                    width: "100%",
                    border: {
                      xs: "1px solid #ccc",
                      sm: "none",
                    },
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Contact Info
                  </Typography>
                  {[
                    {
                      icon: <Phone sx={{ color: "#0C1E8A" }} />,
                      value: userData?.phone,
                    },
                    {
                      icon: <Chat sx={{ color: "#0C1E8A" }} />,
                      value: userData?.secondaryPhone?.business,
                    },
                    {
                      icon: <WhatsApp sx={{ color: "#0C1E8A" }} />,
                      value: userData?.secondaryPhone?.whatsapp,
                    },
                    {
                      icon: <Email sx={{ color: "#0C1E8A" }} />,
                      value: userData?.email,
                    },
                    {
                      icon: <LocationOn sx={{ color: "#0C1E8A" }} />,
                      value: userData?.address,
                    },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 36,
                          minHeight: 36,
                          borderRadius: 2,
                          backgroundColor: "#EEF1FF",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mt: "2px",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography variant="body1" sx={{ color: "#3A3A3A" }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                {userData?.social?.length > 0 && (
                  <Box
                    sx={{
                      borderRadius: "15px",
                      p: 3,
                      width: "100%",
                      border: {
                        xs: "1px solid #ccc",
                        sm: "none",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      Social Media
                    </Typography>
                    {userData.social.map((social, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                          p: 1,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#fff",
                              p: 1,
                              borderRadius: 2,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: 40,
                              height: 40,
                            }}
                          >
                            {getSocialIcon(social.name)}
                          </Box>
                          <Typography variant="body1" color="text.primary">
                            {new URL(social.link).hostname.replace("www.", "")}
                          </Typography>
                        </Box>
                        <a
                          href={
                            social?.link?.startsWith("http")
                              ? social.link
                              : `https://${social?.link}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            width="24"
                            fill="#3A3A3A"
                          >
                            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5Z" />
                          </svg>
                        </a>
                      </Box>
                    ))}
                  </Box>
                )}
                {userData?.websites?.length > 0 && (
                  <Box
                    sx={{
                      borderRadius: "15px",
                      p: 3,
                      width: "100%",
                      border: {
                        xs: "1px solid #ccc",
                        sm: "none",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      Websites
                    </Typography>
                    {userData.websites.map((web, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                          p: 1,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#fff",
                              p: 1,
                              borderRadius: 2,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: 40,
                              height: 40,
                            }}
                          >
                            <Language sx={{ color: "#0C1E8A" }} />
                          </Box>
                          <Typography variant="body1" color="text.primary">
                            {web?.name}
                          </Typography>
                        </Box>
                        <a
                          href={
                            web?.link?.startsWith("http")
                              ? web.link
                              : `https://${web?.link}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            width="24"
                            fill="#3A3A3A"
                          >
                            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5Z" />
                          </svg>
                        </a>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} lg={7}>
              <Box
                sx={{
                  height: "100%",
                  pl: { lg: 3, xs: 0 },
                }}
              >
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Tabs
                    value={selectedTab}
                    onChange={(e, newValue) => {
                      setSelectedTab(newValue);
                    }}
                    aria-label="tabs"
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "#0C1E8A",
                        height: 4,
                        borderRadius: "4px",
                      },
                    }}
                    sx={{
                      backgroundColor: "white",
                      borderBottom: "1px solid #e0e0e0",
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#0C1E8A",
                      },
                      "& .MuiTab-root": {
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#000",
                      },
                      "& .MuiTab-root.Mui-selected": {
                        color: "#000",
                        fontWeight: 600,
                      },
                    }}
                  >
                    <Tab label="Products" />
                    <Tab label="Awards" />
                    <Tab label="Certificates" />
                    <Tab label="Videos" />
                    <Tab label="Reviews" />
                  </Tabs>
                </Box>

                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                  {userData?.products && userData?.products?.length > 0 && (
                    <>
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                      >
                        Products
                      </Typography>
                      <Grid container spacing={2} mb={4}>
                        {userData?.products?.map((i, index) => (
                          <Grid item xs={6} key={`product-${index}`}>
                            <ProductCard product={i} />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}

                  {userData?.awards && userData?.awards?.length > 0 && (
                    <>
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                      >
                        Awards
                      </Typography>
                      <Grid container spacing={2} mb={4}>
                        {userData?.awards?.map((award, index) => (
                          <Grid item xs={6} key={`award-${index}`}>
                            <AwardCard award={award} ismobile />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}

                  {userData?.certificates &&
                    userData?.certificates?.length > 0 && (
                      <>
                        <Typography
                          variant="h5"
                          sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                        >
                          Certificates
                        </Typography>
                        <Grid container spacing={2} mb={4}>
                          {userData?.certificates?.map((certificate, index) => (
                            <Grid item xs={6} key={`certificate-${index}`}>
                              <CertificateCard certificate={certificate} />
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    )}
                  {userData?.videos && userData?.videos?.length > 0 && (
                    <>
                      {" "}
                      <Typography
                        variant="h5"
                        color="textTertiary"
                        mt={2}
                        mb={2}
                        pt={2}
                      >
                        Videos
                      </Typography>
                      <Grid container spacing={2}>
                        {userData?.videos?.map(
                          (videoItem, index) =>
                            videoItem?.link && (
                              <Grid item xs={12} sm={6} key={index}>
                                <Video url={videoItem.link} />
                              </Grid>
                            )
                        )}
                      </Grid>{" "}
                    </>
                  )}
                  {userData?.reviews && userData?.reviews?.length > 0 && (
                    <>
                      {" "}
                      <Typography
                        variant="h5"
                        color="textTertiary"
                        mt={2}
                        mb={2}
                        pt={2}
                      >
                        Reviews
                      </Typography>
                      <Grid container spacing={2} mt={2} mb={10}>
                        {userData?.reviews?.map((r, index) => (
                          <Grid item xs={12} lg={12} key={index}>
                            <ReviewCard review={r} />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    minHeight: "300px",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {selectedTab === 0 && (
                    <>
                      {userData?.products && userData?.products?.length > 0 && (
                        <Grid container spacing={2} mt={2} mb={10}>
                          {userData?.products?.map((i, index) => (
                            <Grid item xs={6} lg={4} key={index}>
                              <ProductCard product={i} />
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </>
                  )}
                  {selectedTab === 1 && (
                    <>
                      {userData?.awards && userData?.awards?.length > 0 && (
                        <Grid container spacing={2} mt={2} mb={10}>
                          {userData?.awards?.map((award, index) => (
                            <Grid item xs={6} lg={4} key={index}>
                              <AwardCard award={award} ismobile />
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </>
                  )}
                  {selectedTab === 2 && (
                    <>
                      {userData?.certificates &&
                        userData?.certificates?.length > 0 && (
                          <Grid container spacing={2}>
                            {userData?.certificates?.map(
                              (certificate, index) => (
                                <Grid item xs={12} lg={6} key={index}>
                                  <CertificateCard certificate={certificate} />
                                </Grid>
                              )
                            )}
                          </Grid>
                        )}
                    </>
                  )}
                  {selectedTab === 3 && (
                    <>
                      {userData?.videos && userData?.videos?.length > 0 && (
                        <>
                          <Grid container spacing={2}>
                            {userData?.videos?.map(
                              (videoItem, index) =>
                                videoItem?.link && (
                                  <Grid item xs={12} lg={6} key={index}>
                                    <Video url={videoItem.link} />
                                  </Grid>
                                )
                            )}
                          </Grid>{" "}
                        </>
                      )}
                    </>
                  )}
                  {selectedTab === 4 && (
                    <>
                      {userData?.reviews && userData?.reviews?.length > 0 && (
                        <Grid container spacing={2} mt={2} mb={10}>
                          {userData?.reviews?.map((r, index) => (
                            <Grid item xs={12} lg={12} key={index}>
                              <ReviewCard review={r} />
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "white",
            padding: 2,
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <a
            href={`https://wa.me/${userData?.phone}/?text=Hi`}
            target="_blank"
            style={{ textDecoration: "none" }}
            rel="noopener noreferrer"
          >
            <StyledButton
              variant={"preview"}
              name={
                <>
                  <WhatsappIcon style={{ marginRight: "8px" }} /> SAY HAI
                </>
              }
            />
          </a>
          <StyledButton
            variant={"secondary"}
            name={"SAVE CONTACT"}
            onClick={handleSaveContact}
          />
        </Box>
      </Grid>
      <Grid item xs={12} lg={5} mt={4} mb={6}>
        {" "}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: "15px",
            border: {
              sm: "1px solid #ccc",
              xs: "none",
            },
            p: 4,
          }}
        >
          <Typography color="#0C1E8A" variant="h1" textAlign={"center"}>
            Let's Talk
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  color="textSecondary"
                >
                  Name
                </Typography>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Enter your name"
                        {...field}
                        preview
                      />
                    </>
                  )}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  color="textSecondary"
                >
                  Phone Number
                </Typography>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Enter your phone number"
                        {...field}
                        preview
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  color="textSecondary"
                >
                  Email
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Enter your email"
                        {...field}
                        preview
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  color="textSecondary"
                >
                  Description
                </Typography>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField
                        placeholder="Enter description"
                        {...field}
                        preview
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack width={"100%"}>
                  <StyledButton
                    variant={"preview"}
                    name={submitting ? "Sending..." : "Send"}
                    type="submit"
                    disabled={submitting}
                  />
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MemberProfileCard;
