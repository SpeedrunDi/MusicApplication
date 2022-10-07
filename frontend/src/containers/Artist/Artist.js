import React, {useEffect} from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteAlbum, getArtistAlbums, patchAlbum} from "../../store/actions/albumsActions";
import AlbumItem from "../../components/AlbumItem/AlbumItem";

const Artist = ({match}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const albums = useSelector(state => state.albums.albums);
  const loading = useSelector(state => state.albums.loading);
  const btnLoading = useSelector(state => state.albums.btnLoading);

  useEffect(() => {
    dispatch(getArtistAlbums(match.params.id));
  }, [dispatch, match]);

  const publishAlbum = async id => {
    await dispatch(patchAlbum(id));
    dispatch(getArtistAlbums(match.params.id));
  };

  const onDeleteAlbum = async id => {
    await dispatch(deleteAlbum(id));
    dispatch(getArtistAlbums(match.params.id));
  };

  return loading ? (<Box width="max-content" margin="100px auto 0"><CircularProgress /></Box>) : (
    <Box width="max-content" marginX="auto" paddingY="20px">
      {albums.length !== 0 ?
        (
          <>
            <Typography variant="h3" textAlign="center" marginBottom="30px">
              {albums[0].artist.name}
            </Typography>
            {albums.map(album => (
              <AlbumItem
                key={album._id}
                user={user}
                album={album}
                loading={btnLoading}
                onDeleteAlbum={() => onDeleteAlbum(album._id)}
                onPublishAlbum={() => publishAlbum(album._id)}
              />
            ))}
          </>
        ) : <Typography variant="h2" textAlign="center">No albums</Typography>
      }
    </Box>
  );
};

export default Artist;