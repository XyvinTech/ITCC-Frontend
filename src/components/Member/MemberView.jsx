import {
    Typography,
    Dialog,
    DialogContent,
    Stack,
    Box,
    Divider,
    Avatar,
    Chip,
    Grid,
    IconButton,
    Paper,
    Button,
  } from "@mui/material";
  import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
  // Import Material UI icons - if you don't have these, you can remove them
  import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
  import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
  import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
  import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
  import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
  import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
  
  const MemberView = ({ open, onClose, data }) => {
    const handleClear = (event) => {
      event.preventDefault();
      onClose();
    };
  
    const getStatusColor = (status) => {
      switch (status) {
        case 'active':
          return '#4caf50';
        case 'inactive':
          return '#f44336';
        default:
          return '#ff9800';
      }
    };
    
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "#1976d2", // Using a standard blue color
            color: "white",
            height: "120px",
            display: "flex",
            alignItems: "center",
            p: 3,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
            }}
            onClick={handleClear}
          >
            <CloseIcon />
          </IconButton>
          
          <Typography variant="h5" fontWeight="bold">
            Member Profile
          </Typography>
        </Box>
  
        <DialogContent sx={{ pt: 3, position: "relative" }}>
          <Box sx={{ p: 3 }}>
            <Box 
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 4,
                mb: 4,
                mt: { xs: 0, sm: -5 },
                px: { xs: 2, sm: 4 },
              }}
            >
              <Avatar
                src={data.image}
                alt={data.name}
                sx={{
                  width: 140,
                  height: 140,
                  border: "4px solid white",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  mt: { xs: -8, sm: 0 }
                }}
              />
              
              <Box sx={{ textAlign: { xs: "center", sm: "left" }, mt: { xs: -2, sm: 2 }}}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-start" } }}>
                  <Typography variant="h4" fontWeight="bold">
                    {data.name}
                  </Typography>
                  
                  <Chip
                    label={data.status}
                    size="small"
                    sx={{
                      textTransform: 'capitalize',
                      bgcolor: getStatusColor(data.status),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
                
                <Typography variant="subtitle1" sx={{ color: "#666", mb: 1 }}>
                  {data.designation} • Member ID: {data.memberId}
                </Typography>
                
                <Typography variant="body2" sx={{ maxWidth: "500px", mb: 2 }}>
                  {data.bio}
                </Typography>
  
                <Chip 
                  label={`${data.subscription} member`} 
                  sx={{ 
                    textTransform: 'capitalize', 
                    bgcolor: data.subscription === 'premium' ? '#ffd700' : '#e0e0e0',
                    fontWeight: 'medium',
                    color: data.subscription === 'premium' ? '#5f4c00' : 'inherit'
                  }}
                />
              </Box>
            </Box>
  
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#1976d2' }}>
                    Contact Information
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {EmailOutlinedIcon && <EmailOutlinedIcon sx={{ color: '#1976d2' }} />}
                      <Typography>{data.email}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {PhoneOutlinedIcon && <PhoneOutlinedIcon sx={{ color: '#1976d2' }} />}
                      <Typography>{data.phone}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {LocationOnOutlinedIcon && <LocationOnOutlinedIcon sx={{ color: '#1976d2' }} />}
                      <Typography>{data.address}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#1976d2' }}>
                    Business Information
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {BusinessOutlinedIcon && <BusinessOutlinedIcon sx={{ color: '#1976d2' }} />}
                      <Typography>Category: <strong>{data.businessCatogary}</strong></Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', marginLeft: '34px' }}>
                      <Typography>Sub-category: <strong>{data.businessSubCatogary}</strong></Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {CalendarTodayOutlinedIcon && <CalendarTodayOutlinedIcon sx={{ color: '#1976d2' }} />}
                      <Typography>Member since: <strong>{formatDate(data.dateOfJoining)}</strong></Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '12px' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#1976d2' }}>
                    Chapter Details
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e8e8e8', borderRadius: '8px', bgcolor: '#f9f9f9' }}>
                        <Typography variant="body2" color="text.secondary">State</Typography>
                        <Typography fontWeight="medium">{data.state?.name || "-"}</Typography>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e8e8e8', borderRadius: '8px', bgcolor: '#f9f9f9' }}>
                        <Typography variant="body2" color="text.secondary">Zone</Typography>
                        <Typography fontWeight="medium">{data.zone?.name || "-"}</Typography>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e8e8e8', borderRadius: '8px', bgcolor: '#f9f9f9' }}>
                        <Typography variant="body2" color="text.secondary">District</Typography>
                        <Typography fontWeight="medium">{data.district?.name || "-"}</Typography>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e8e8e8', borderRadius: '8px', bgcolor: '#f9f9f9' }}>
                        <Typography variant="body2" color="text.secondary">Chapter</Typography>
                        <Typography fontWeight="medium">{data.chapter?.name || "-"}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleClear}
                sx={{ borderRadius: '8px' }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default MemberView;