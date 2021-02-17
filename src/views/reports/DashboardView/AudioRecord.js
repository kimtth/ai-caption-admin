import { Box, Card, CardContent, CardHeader, colors, Divider, makeStyles, Typography, useTheme } from '@material-ui/core';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const AudioRecord = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 37],
        backgroundColor: [
          colors.green[500],
          colors.red[600],
          // colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Desktop', 'Tablet', 'Mobile']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Audio',
      value: 63,
      icon: SettingsVoiceIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Text',
      value: 37,
      icon: FormatColorTextIcon,
      color: colors.red[600]
    },
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Audio / Total (%)" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

AudioRecord.propTypes = {
  className: PropTypes.string
};

export default AudioRecord;
