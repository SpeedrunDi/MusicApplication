import React from 'react';
import {Grid, Typography} from "@mui/material";

const TrackItem = ({track, onPlayMusic, index}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      maxWidth="sm"
      wrap="nowrap"
      border="1px solid black"
      borderRadius="20px"
      marginBottom="40px"
      padding="15px"
      sx={{cursor: "pointer"}}
      onClick={onPlayMusic}
    >
      <Grid item>
        <Typography variant="h5" marginRight="30px">
          <strong>{index}: </strong>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5" marginRight="20px" textTransform="capitalize">
          {track.title}
        </Typography>
      </Grid>
      <Grid item>
      <Typography whiteSpace="nowrap">
        <strong>duration: </strong>
        {track.duration}
      </Typography>
      </Grid>
    </Grid>
  );
};

export default TrackItem;