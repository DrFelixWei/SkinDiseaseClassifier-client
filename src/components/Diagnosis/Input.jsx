// Input.jsx
import React, { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FileUpload, PhotoCamera, Science } from '@mui/icons-material';
import Camera from './Camera';

const Input = ({ handleFileChange }) => {
  const { t } = useTranslation();
  const [isCameraOpen, setIsCameraOpen] = useState(false);

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

  const handleCapture = (file) => {
    handleFileChange({ target: { files: [file] } });
    setIsCameraOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">

        <Button variant="contained" component="label"
          startIcon={<FileUpload fontSize="medium" />}
        >
          {t('input.upload')}
          <input
            type="file"
            accept=".jpg,.jpeg,image/jpeg"
            hidden
            onChange={onFileChange}
          />
        </Button>

        <Button variant="contained" onClick={() => setIsCameraOpen(true)}
          startIcon={<PhotoCamera fontSize="medium" />}
        >
          {t('input.camera')}
        </Button>

        <Button variant="contained" onClick={useTestImage}
          startIcon={<Science fontSize="medium" />}
        >
          {t('input.test')}
        </Button>
      </Box>

      <Modal open={isCameraOpen} onClose={() => setIsCameraOpen(false)}>
        <Camera onCapture={handleCapture} onCancel={() => setIsCameraOpen(false)} />
      </Modal>
    </Box>
  );
};

export default Input;
