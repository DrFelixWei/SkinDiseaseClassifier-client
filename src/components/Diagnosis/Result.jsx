import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Result = ({
  result,
}) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
      <Typography variant="h3" component="h1">{t('result')}</Typography>

      {result && (
        <Box mt={3}>
          <Typography variant="h6">{t('result')}:</Typography>
          <Typography variant="body1">{t('class')}: {result.class}</Typography>
          <Typography variant="body2">{t('confidence')}: {(result.confidence * 100).toFixed(2)}%</Typography>
        </Box>
      )}

{/* depending on class link to help */}

    </Box>
  );
};

export default Result;
