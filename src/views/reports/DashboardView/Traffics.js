import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, makeStyles, colors } from '@material-ui/core';
import { trafficCountQuery } from '../../../api/dialog-queries';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Traffics = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [dataCnt, setDataCnt] = useState([]);
  const { loading, error, data: Count, refetch } = useQuery(trafficCountQuery, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      setDataCnt(Count?.trafficCnt);
    }
  });

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: dataCnt.map(item => {
          return item.count
        }).reverse(),
        label: 'This month'
      },
      {
        backgroundColor: colors.grey[200],
        data: dataCnt.map(item => {
          return item.lastMonthCnt
        }).reverse(),
        label: 'Last month'
      }
    ],
    labels: Array.from({length: 31}, (x, i) => {
      return i === 0? 'Today': `D-${i}`
    }).reverse()
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      datasets: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Button
            size="small"
            variant="text"
          >
            Last 30 days
          </Button>
        )}
        title="Latest Traffics (Count of message)"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
      </Box>
    </Card>
  );
};

Traffics.propTypes = {
  className: PropTypes.string
};

export default Traffics;
