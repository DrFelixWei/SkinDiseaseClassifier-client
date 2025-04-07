import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Error = ({
  error,
}) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
      <Typography color="error" mt={2}>{error}</Typography>
    </Box>
  );
};

export default Error;
