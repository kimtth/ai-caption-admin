import { Card, CardContent, CardHeader, Divider, Grid, Button, makeStyles, Link, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(({
  root: {}
}));

const UsefulLink = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Useful Links"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={3}>
              <Typography variant="button">Azure Custom Speech</Typography>
            </Grid>
            <Grid item xs={9}>
              <Button component={Link} href="https://speech.microsoft.com/customspeech" target="_blank" variant="contained" color="primary">
                {"Link to Azure Custom Speech"}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="button">テキスト→音声変換 (Text to MP3)</Typography>
            </Grid>
            <Grid item xs={9}>
              <Button component={Link} href="https://note.cman.jp/other/voice/" target="_blank" variant="contained" color="primary">
                {"読み上げ（テキスト→音声変換）"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

UsefulLink.propTypes = {
  className: PropTypes.string
};

export default UsefulLink;
