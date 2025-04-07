import React from 'react';
import { Box, Typography, Link, Paper } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

const ConfidenceChart = ({ value }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#00C49F'; // Green
    if (confidence >= 50) return '#FFBB28'; // Yellow
    return '#FF4C4C'; // Red
  };

  const data = [
    { name: 'confidence', value },
    { name: 'rest', value: 100 - value },
  ];

  const confidenceColor = getConfidenceColor(value);
  const colors = [confidenceColor, '#f0f0f0']; // dynamic + static gray

  return (
    <Box position="relative" width={120} height={120}>
      <PieChart width={120} height={120}>
        <Pie
          data={data}
          innerRadius={45}
          outerRadius={60}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} cornerRadius={30} />
          ))}
        </Pie>
      </PieChart>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: 'translate(-50%, -50%)',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        {value.toFixed(0)}%
      </Box>
    </Box>
  );
};

const Result = ({ result }) => {
  const { t } = useTranslation();

  if (!result) return null;

  const diseaseKey = result.class?.toLowerCase();
  const diseaseInfo = t(`diseases.${diseaseKey}`, { returnObjects: true });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={3} mt={4}>
      <Typography variant="h3">{t('result')}</Typography>

      <Paper elevation={3} sx={{ 
        p: 3, 
        maxWidth: 500, 
        width: '100%', 
        textAlign: 'center',
        backgroundColor: 'grey',
        }}>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
          flexWrap="wrap"
        >
          <Typography variant="h4" gutterBottom>
            {diseaseInfo.name}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">{t('confidence')}:</Typography>
            <ConfidenceChart value={result.confidence * 100} />
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>{diseaseInfo.description}</Typography>
        <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>{t('recommendation')}:</Typography>
        <Typography variant="body2">{diseaseInfo.recommendation}</Typography>
        {diseaseInfo.link && (
          <Link href={diseaseInfo.link} target="_blank" rel="noopener" sx={{ display: 'block', mt: 2 }}>
            {t('learn_more')}
          </Link>
        )}
      </Paper>
    </Box>
  );
};

export default Result;
