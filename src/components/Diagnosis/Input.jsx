import React, { useRef, useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Input = ({ handleFileChange }) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
    setStream(null);
  };

  const isValidJpg = (file) => {
    const validTypes = ['image/jpeg'];
    return file && validTypes.includes(file.type);
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && isValidJpg(file)) {
      handleFileChange({ target: { files: [file] } });
    } else {
      alert('Please upload a JPG image only.');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
          handleFileChange({ target: { files: [file] } });
        }
        closeCamera();
      }, 'image/jpeg');
    }
  };

  const useTestImage = async () => {
    try {
      const response = await fetch('/test_acne.jpg');
      const blob = await response.blob();
      const file = new File([blob], 'test_acne.jpg', { type: 'image/jpeg' });
      handleFileChange({ target: { files: [file] } });
    } catch (err) {
      console.error('Error loading test image:', err);
      alert('Failed to load test image.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        <Button variant="contained" component="label">
          {t('Upload Image')}
          <input
            type="file"
            accept=".jpg,.jpeg,image/jpeg"
            hidden
            onChange={onFileChange}
          />
        </Button>

        <Button variant="outlined" onClick={openCamera}>
          {t('Use Camera')}
        </Button>

        <Button variant="outlined" onClick={useTestImage}>
          {t('Use Test Image')}
        </Button>
      </Box>

      <Modal open={isCameraOpen} onClose={closeCamera}>
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
          <video ref={videoRef} autoPlay playsInline style={{ width: 300 }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <Box mt={2} display="flex" gap={2}>
            <Button variant="contained" onClick={capturePhoto}>
              {t('Capture')}
            </Button>
            <Button variant="outlined" onClick={closeCamera}>
              {t('Cancel')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Input;
