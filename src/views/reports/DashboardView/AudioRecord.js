import { Box, Card, CardContent, CardHeader, colors, Divider, makeStyles, Typography, useTheme } from '@material-ui/core';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { audioRecordQuery } from '../../../api/dialog-queries';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const AudioRecord = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [dataCnt, setDataCnt] = useState({})
  const { loading, error, data: CountWithTotal, refetch } = useQuery(audioRecordQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      setDataCnt(CountWithTotal?.audioCnt);
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const data = {
    datasets: [
      {
        data: [dataCnt?.count, dataCnt?.totalCount],
        backgroundColor: [
          colors.green[500],
          colors.red[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Audio', 'Text']
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
      value: Math.round(dataCnt?.count * 100 / dataCnt?.totalCount),
      icon: SettingsVoiceIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Text',
      value: Math.round((dataCnt?.totalCount - dataCnt?.count) * 100 / dataCnt?.totalCount),
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
