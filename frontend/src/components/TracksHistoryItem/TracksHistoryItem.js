import React from 'react';
import {Grid, Typography} from "@mui/material";

const TracksHistoryItem = ({trackHistory}) => {
  const datetime = new Date(trackHistory.datetime);

  return (
    <Grid container
          alignItems="center"
          border="1px solid black"
          borderRadius="20px"
          padding="10px"
          marginBottom="20px"
    >
      <Grid item xs={12}>
        <Typography>
          {datetime.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Track: {trackHistory.track.title}</Typography>
      </Grid>
    </Grid>
  );
};

export default TracksHistoryItem;