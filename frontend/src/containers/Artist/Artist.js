import React, {useEffect} from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getArtistAlbums} from "../../store/actions/albumsActions";
import AlbumItem from "../../components/AlbumItem/AlbumItem";

const Artist = ({match}) => {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.albums);
  const loading = useSelector(state => state.albums.loading);

  useEffect(() => {
    dispatch(getArtistAlbums(match.params.id));
  }, [dispatch, match]);

  return albums.length !== 0 ? (
    <Box width="max-content" marginX="auto" paddingY="20px">
      {loading ? (<Box width="max-content" marginX="auto"><CircularProgress /></Box>) :
        (
          <>
            <Typography variant="h3" textAlign="center" marginBottom="30px">
              {albums[0].artist.name}
            </Typography>
            {albums.map(album => (
              <AlbumItem key={album._id} album={album}/>
            ))}
          </>
        )
      }
    </Box>
  ) : <Typography variant="h2" textAlign="center">No albums</Typography>;
};

export default Artist;