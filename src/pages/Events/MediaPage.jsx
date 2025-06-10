import {
  Box,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { useFolderStore } from "../../store/folderStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { StyledButton } from "../../ui/StyledButton";
import AddFile from "../../components/Event/AddFile";
import { toast } from "react-toastify";

const MediaPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const { getFolder, folder, loading, deleteFiles } = useFolderStore();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    let filter = {};
    if (folder?.learningCorner) {
      filter.type = "video";
    } else {
      if (selectedTab === 0) {
        filter.type = "image";
      } else if (selectedTab === 1) {
        filter.type = "video";
      }
    }
    getFolder(id, filter);
  }, [id, selectedTab, isChange, folder?.learningCorner]);

  useEffect(() => {
    if (folder?.learningCorner && selectedTab > 0) {
      setSelectedTab(0);
    }
  }, [folder?.learningCorner]);

  const handleDelete = async (fileId) => {
    try {
      await deleteFiles(id, { fileIds: [fileId] });
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getEmbedUrl = (url) => {
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/
    );
    const videoId = videoIdMatch && videoIdMatch[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };
  const renderMediaGrid = () => {
    if (!folder || !folder.files || folder.files.length === 0) {
      const isVideoTab = folder?.learningCorner || selectedTab === 1;
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            mt: 2,
            bgcolor: "#f5f5f5",
            borderRadius: "8px",
            minHeight: "300px",
          }}
        >
          {isVideoTab ? (
            <VideoLibraryIcon sx={{ fontSize: 60, color: "#aaa", mb: 2 }} />
          ) : (
            <ImageIcon sx={{ fontSize: 60, color: "#aaa", mb: 2 }} />
          )}
          <Typography variant="h6" color="#666">
            No {isVideoTab ? "videos" : "images"} found
          </Typography>
          <Typography variant="body2" color="#888" mt={1}>
            Upload some {isVideoTab ? "videos" : "images"} to see them here
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={3} mt={1} px={2}>
        {folder.files.map((file) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={file._id}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                height: "200px",
                width: "100%",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                "&:hover .delete-icon": {
                  visibility: "visible",
                },
              }}
            >
              <IconButton
                className="delete-icon"
                onClick={() => handleDelete(file._id)}
                size="small"
                aria-label="delete"
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  visibility: "hidden",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                  zIndex: 10,
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>

              {file.type === "image" ? (
                <Box
                  component="img"
                  src={file.url}
                  alt={`File ${file._id}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    backgroundColor: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={getEmbedUrl(file.url)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderTabs = () => {
    if (folder?.learningCorner) {
      return (
        <Tabs
          value={0}
          aria-label="tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#2D9CDB",
              height: 4,
              borderRadius: "4px",
            },
          }}
          sx={{
            marginTop: "20px",
            bgcolor: "white",
            paddingTop: "4px",
            "& .MuiTabs-indicator": {
              backgroundColor: "#2D9CDB",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 600,
              color: "#686465",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "#2D9CDB",
            },
          }}
        >
          <Tab label="Videos" />
        </Tabs>
      );
    }

    return (
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#2D9CDB",
            height: 4,
            borderRadius: "4px",
          },
        }}
        sx={{
          marginTop: "20px",
          bgcolor: "white",
          paddingTop: "4px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#2D9CDB",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            color: "#686465",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#2D9CDB",
          },
        }}
      >
        <Tab label="Images" />
        <Tab label="Videos" />
      </Tabs>
    );
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#f7f7f7", minHeight: "100vh", pb: 4 }}>
        <>
          <Stack
            direction="row"
            sx={{
              padding: "20px",
              bgcolor: "#fff",
              height: "70px",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Stack>
              <Typography variant="h5" fontWeight={600} color="textSecondary">
                Media
              </Typography>
            </Stack>

            <StyledButton
              variant="primary"
              name={<>Add File</>}
              onClick={() => setOpen(true)}
            />
          </Stack>

          {renderTabs()}
          {renderMediaGrid()}
        </>
      </Box>
      <AddFile
        open={open}
        onClose={() => setOpen(false)}
        id={id}
        learning={folder?.learningCorner}
        setIsChange={() => setIsChange((prev) => !prev)}
      />
    </>
  );
};

export default MediaPage;
