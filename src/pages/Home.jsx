import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Input from '../components/Diagnosis/Input';
import Result from '../components/Diagnosis/Result';
import Error from '../components/Diagnosis/Error';

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
      <Typography variant="h3" component="h1">{t('title')}</Typography>

      <Input
        handleFileChange={handleFileChange}
      />

      {/* display image */}
      {file && (
        <Box mt={3} display="flex" justifyContent="center" alignItems="center">
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
          />
        </Box>
      )}

      <Button
        variant="contained"
        onClick={handleDiagnose}
        disabled={!file || loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : t('diagnose')}
      </Button>

      {result && (
        <Result result={result}/>
      )}

      {error && (
        <Error error={error}/>
      )}

{/* depending on class link to help */}

    </Box>
  );
};

export default Home;
