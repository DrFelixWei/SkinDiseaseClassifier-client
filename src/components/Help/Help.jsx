import React, { useState } from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Help = () => {
  const { t } = useTranslation();

  return (
    <Box component="header" sx={{ padding: 2, flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Tooltip
            title={<Typography variant="body2" sx={{ maxWidth: 300 }}>{t('help')}</Typography>}
            arrow
            >
            <IconButton sx={{ color: 'white' }}>
                <HelpOutlineIcon fontSize="large"/>
            </IconButton>
        </Tooltip>
    </Box>
  );
};

export default Help;
