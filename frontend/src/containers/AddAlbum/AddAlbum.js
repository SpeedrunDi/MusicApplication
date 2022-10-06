import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Typography} from "@mui/material";
import {clearAlbumErrors, postAlbum} from "../../store/actions/albumsActions";
import {getArtists} from "../../store/actions/artistsActions";
import AlbumForm from "../../components/AlbumForm/AlbumForm";

const AddAlbum = ({history}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const artists = useSelector(state => state.artists.artists);
  const error = useSelector(state => state.albums.error);

  useEffect(() => {
    dispatch(getArtists());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearAlbumErrors());
    };
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/login"/>
  }

  const onAlbumFormSubmit = async albumData => {
    await dispatch(postAlbum(albumData));
    history.replace("/");
  };

  return (
    <>
      <Typography
        textAlign="center"
        marginY="60px"
        variant="h4"
      >
        Add new album
      </Typography>
      <AlbumForm
        onSubmit={onAlbumFormSubmit}
        artists={artists}
        error={error}
      />
    </>
  );
};

export default AddAlbum;