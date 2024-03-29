import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import {Redirect} from "react-router-dom";
import ArtistForm from "../../components/ArtistForm/ArtistForm";
import {useDispatch, useSelector} from "react-redux";
import {clearArtistErrors, postArtist} from "../../store/actions/artistsActions";

const AddArtist = ({history}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const error = useSelector(state => state.artists.error);
  const loading = useSelector(state => state.artists.loading);

  useEffect(() => {
    return () => {
      dispatch(clearArtistErrors());
    };
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/login"/>
  }

  const onArtistFormSubmit = async artistData => {
    await dispatch(postArtist(artistData));
    history.replace("/");
  };

  return (
    <>
      <Typography
        textAlign="center"
        marginY="60px"
        variant="h4"
      >
        Add new artist
      </Typography>
      <ArtistForm
        onSubmit={onArtistFormSubmit}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default AddArtist;