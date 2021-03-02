import { Box, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
// import fs from 'fs';
// const homeDir = require('os').homedir();
// const desktopDir = `${homeDir}/Desktop`;

const useStyles = makeStyles((theme) => ({
  root: {},
  basicButton: {
    marginRight: theme.spacing(1)
  },
}));

const Toolbar = ({ className, customs, selectedCustomIds, ...rest }) => {
  const classes = useStyles();

  const handelExport = () => {

    if (window.confirm('Are you sure to download selected files?')) {
      selectedCustomIds.map((customId) => {
        console.log(customId);
        const customItem = customs.find(x => {
          if (x.id === customId) {
            return x;
          }
        });

        if (customItem) {
          const base64Data = `data:audio/mpeg;base64,${customItem.stream}`;
          fetch(base64Data)
            .then(res => res.blob())
            .then(blob => {
              const fileName = `${customItem.refId}.mp3`;
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = fileName;
              link.href = url;
              link.click();

              const fileName2 = `${customItem.refId}.txt`;
              const utf8Data = customItem.value;
              const blob2 = new Blob([utf8Data], { type: "text/plain" });
              const url2 = URL.createObjectURL(blob2);
              const link2 = document.createElement('a');
              link2.download = fileName2;
              link2.href = url2;
              link2.click();
            });
        }
      });
    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="primary"
          variant="contained"
          className={classes.basicButton}
          onClick={handelExport}
        >
          Export
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
