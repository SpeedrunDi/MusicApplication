import React, {useEffect} from 'react';
import {Box, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getArtistAlbums} from "../../store/actions/albumsActions";
import AlbumItem from "../../components/AlbumItem/AlbumItem";

const Artist = ({match}) => {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.albums);

  useEffect(() => {
    dispatch(getArtistAlbums(match.params.id));
  }, [dispatch, match]);

  return (
    <Box width="max-content" marginX="auto" paddingY="20px">
      {albums.length !== 0 ? albums.map(album => (
        <AlbumItem key={album._id} album={album}/>
      )) : <Typography variant="h2">No albums</Typography>}
    </Box>
  );
};

export default Artist;