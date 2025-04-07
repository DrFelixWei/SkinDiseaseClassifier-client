import React, { useState } from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';

const About = () => {
  const { t } = useTranslation();

  return (
    <Box component="header" sx={{ padding: 2, flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Tooltip
            title={<Typography variant="body2" sx={{ maxWidth: 300 }}>{t('about')}</Typography>}
            arrow
            >
            <IconButton sx={{ color: 'white' }}>
                <InfoIcon fontSize="large"/>
            </IconButton>
        </Tooltip>
    </Box>
  );
};

export default About;
