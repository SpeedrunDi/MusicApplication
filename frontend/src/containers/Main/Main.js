import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress, Typography} from "@mui/material";
import {deleteArtist, getArtists, patchArtist} from "../../store/actions/artistsActions";
import ArtistItem from "../../components/ArtistItem/ArtistItem";

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const artists = useSelector(state => state.artists.artists);
  const loading = useSelector(state => state.artists.loading);
  const btnLoading = useSelector(state => state.artists.btnLoading);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const publishArtist = async id => {
    await dispatch(patchArtist(id));
    dispatch(getArtists());
  };

  const onDeleteArtist = async id => {
    await dispatch(deleteArtist(id));
    dispatch(getArtists());
  };

  return loading ? (<Box width="max-content" margin="100px auto 0"><CircularProgress /></Box>)
    : (
    <Box width="max-content" marginX="auto" paddingY="20px">
      <Typography variant="h2" marginBottom="40px" textAlign="center">
        Artists
      </Typography>
      {artists.length !== 0 ? artists.map(artist => (
        <ArtistItem
          key={artist._id}
          user={user}
          artist={artist}
          loading={btnLoading}
          onPublishArtist={() => publishArtist(artist._id)}
          onDeleteArtist={() => onDeleteArtist(artist._id)}
        />
      )): <Typography variant="h2">No artists</Typography>}
    </Box>
  );
};

export default Main;