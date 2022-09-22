import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";
import {getArtists} from "../../store/actions/artistsActions";
import ArtistInfo from "../../components/ArtistInfo/ArtistInfo";

const Main = () => {
  const dispatch = useDispatch();
  const artists = useSelector(state => state.artists.artists);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <Box width="max-content" marginX="auto" paddingY="20px">
      <Typography variant="h2" marginBottom="40px" textAlign="center">
        Artists
      </Typography>
      {artists.length !== 0 ? artists.map(artist => (
        <ArtistInfo artist={artist} key={artist._id}/>
      )): <Typography variant="h2">No artists</Typography>}
    </Box>
  );
};

export default Main;