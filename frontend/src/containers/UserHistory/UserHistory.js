import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress, Typography} from "@mui/material";
import {getTrackHistory} from "../../store/actions/tracksActions";
import TracksHistoryItem from "../../components/TracksHistoryItem/TracksHistoryItem";

const UserHistory = () => {
  const dispatch = useDispatch();
  const tracksHistory = useSelector(state => state.tracks.tracksHistory);
  const loading = useSelector(state => state.tracks.loading);
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(getTrackHistory());
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/login"/>
  }

  return loading ? <Box width="max-content" margin="100px auto 0"><CircularProgress /></Box> : (
    <Box maxWidth="720px" marginX="auto" marginTop="60px">
      <Typography variant="h4" textAlign="center" marginBottom="20px">History</Typography>
      {tracksHistory.length !== 0 ? (
        tracksHistory.map(trackHistory => (
          <TracksHistoryItem key={trackHistory._id} trackHistory={trackHistory}/>
        ))
      ) : <Typography variant="h3" textAlign="center">No history</Typography> }
    </Box>
  );
};

export default UserHistory;