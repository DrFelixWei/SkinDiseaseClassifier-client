import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  // api call to python model -> get url from env VITE_MODEL_URL


  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Typography variant="h3" component="h1">{t('home')}</Typography>


      {/* upload image */}

      {/* diagnose button */}

      {/* results */}


    </Box>
  )
}

export default Home
