import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import {getArtists} from "../../store/actions/artistsActions";
import {clearTrackErrors, postTrack} from "../../store/actions/tracksActions";
import TrackForm from "../../components/TrackForm/TrackForm";

const AddTracks = ({history}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const artists = useSelector(state => state.artists.artists);
  const error = useSelector(state => state.tracks.error);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearTrackErrors());
    };
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/login"/>
  }

  const onTrackFormSubmit = async trackData => {
    await dispatch(postTrack(trackData));
    history.replace("/");
  };

  return (
    <>
      <Typography
        textAlign="center"
        marginY="60px"
        variant="h4"
      >
        Add new track
      </Typography>
      <TrackForm
        onSubmit={onTrackFormSubmit}
        artists={artists}
        error={error}
      />
    </>
  );
};

export default AddTracks;