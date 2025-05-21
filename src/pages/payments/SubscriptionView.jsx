import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { StyledButton } from "../../ui/StyledButton";

const SubscriptionView = ({ open, onClose, data }) => {
  if (!data) return null;

  const { name, description, days, price, benefits, color } = data;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "12px", maxWidth: "400px", width: "100%" },
      }}
    >
      <DialogTitle sx={{ padding: 3, bgcolor: "#f8f9fa" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="600" color="#4F4F4F">
            Subscription Details
          </Typography>
          <Box onClick={onClose} color="#E71D36" sx={{ cursor: "pointer" }}>
            <CloseIcon />
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <Box sx={{ p: 3, pt: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#2E2E2E"
            gutterBottom
          >
            {name}
          </Typography>

          <Typography variant="body1" color="#666" sx={{ mb: 3 }}>
            {description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
            <Typography variant="h3" fontWeight="bold" color="#000">
              ₹{price}
            </Typography>
            <Typography variant="subtitle1" color="#666" sx={{ ml: 0.5 }}>
              / {days} days
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography variant="body1" color="#666">
              Color:
            </Typography>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "4px",
                backgroundColor: color,
                border: "1px solid #ccc",
              }}
            />
            <Typography variant="body2" color="#666">
              {color}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="600" color="#333" sx={{ mb: 1 }}>
            Benefits
          </Typography>

          <List disablePadding>
            {benefits && benefits.length > 0 ? (
              benefits.map((benefit, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))
            ) : (
              <ListItem disablePadding>
                <ListItemText primary="No benefits listed" />
              </ListItem>
            )}
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckCircleIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Premium Business Listing" />
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckCircleIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Priority Access to Events" />
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckCircleIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Verified Business Badge" />
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckCircleIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Direct Messaging Access" />
            </ListItem>
          </List>
        </Box>

        <Box
          sx={{
            p: 3,
            bgcolor: "#f8f9fa",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <StyledButton variant="secondary" name="Close" onClick={onClose} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionView;
