import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleDiagnose = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_MODEL_URL}/predict`, {
        method: 'POST',
        headers: {
          'x-api-key': import.meta.env.VITE_MODEL_API_KEY,
        },
        body: formData,
      });

      if (res.status === 204) {
        setError('Unauthorized request');
        setResult(null);
      } else if (!res.ok) {
        throw new Error('Failed to get prediction');
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while predicting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
      <Typography variant="h3" component="h1">{t('home')}</Typography>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginTop: 16 }}
      />

      <Button
        variant="contained"
        onClick={handleDiagnose}
        disabled={!file || loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : t('diagnose')}
      </Button>

      {result && (
        <Box mt={3}>
          <Typography variant="h6">{t('result')}:</Typography>
          <Typography variant="body1">{t('class')}: {result.class}</Typography>
          <Typography variant="body2">{t('confidence')}: {(result.confidence * 100).toFixed(2)}%</Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" mt={2}>{error}</Typography>
      )}
    </Box>
  );
};

export default Home;
