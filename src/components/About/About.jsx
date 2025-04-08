import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  IconButton,
  Typography, 
  Tooltip, 
  Modal, 
  Card, 
  CardContent,
  CardHeader,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const ModalCard = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800,
  maxHeight: '90vh',
  overflow: 'auto',
  boxShadow: theme.shadows[10],
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const About = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Tooltip title="About this application">
          <IconButton 
            onClick={handleOpen} 
            color="primary"
            aria-label="information about this application"
          >
            <InfoIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="about-modal-title"
        aria-describedby="about-modal-description"
      >
        <ModalCard>
          <CardHeader
            title={t('about.title')}
            action={
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            }
            sx={{ pb: 1 }}
          />
          <Divider />
          <CardContent>
            <Typography variant="body1" paragraph>
              {t('about.description')}
            </Typography>

           

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              {/* <Button 
                variant="outlined" 
                color="secondary"
                startIcon={<HistoryEduIcon />}
                onClick={handleClose}
              >
                Learn More About Our Research
              </Button> */}
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleClose}
              >
                Got it
              </Button>
            </Box>
          </CardContent>
        </ModalCard>
      </Modal>
    </>
  );
};

export default About;