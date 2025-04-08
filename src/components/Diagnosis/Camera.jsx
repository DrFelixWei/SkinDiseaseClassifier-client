// Camera.jsx
import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const videoConstraints = {
  width: 300,
  facingMode: 'environment', // Use rear camera on mobile
};

const Camera = ({ onCapture, onCancel }) => {
  const { t } = useTranslation();
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
          onCapture(file);
        });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      top="50%"
      left="50%"
      style={{
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{ width: 300 }}
      />

      <Box mt={2} display="flex" gap={2}>
        <Button variant="contained" onClick={capture}>
          {t('Capture')}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          {t('Cancel')}
        </Button>
      </Box>
    </Box>
  );
};

export default Camera;
