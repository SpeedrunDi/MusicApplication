import React, {useEffect, useState} from 'react';
import {Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../UI/Form/FormElement/FormElement";
import {getArtistAlbums} from "../../store/actions/albumsActions";

const TrackForm = ({onSubmit, artists, error}) => {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.albums);

  const [newTrack, setNewTrack] = useState({
    title: "",
    album: "",
    duration: ""
  });
  const [artistId, setArtistId] = useState("");

  useEffect(() => {
    if (artistId) {
      dispatch(getArtistAlbums(artistId));
    }
  }, [dispatch, artistId]);

  const submitFormHandler = e => {
    e.preventDefault();

    onSubmit(newTrack);
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setNewTrack(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid
        container
        maxWidth="md"
        textAlign="center"
        marginX="auto"
        direction="column"
        rowSpacing={2}
      >
        <FormElement
          required={true}
          onChange={inputChangeHandler}
          name="title"
          label="Title"
          value={newTrack.title}
          error={getFieldError('title')}
        />

        <Grid item>
          <FormControl required={albums.length === 0} fullWidth error={Boolean(getFieldError('artist'))}>
            <InputLabel id="select-artist">Select artist</InputLabel>
            <Select
              labelId="select-artist"
              name="artist"
              value={artistId}
              label="Select artist"
              onChange={e => setArtistId(e.target.value)}
            >
              {artists !== 0 && artists.map(artist => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {
          albums.length !== 0 &&
            <Grid item>
              <FormControl required fullWidth error={Boolean(getFieldError('album'))}>
                <InputLabel id="select-album">Select album</InputLabel>
                <Select
                  labelId="select-album"
                  name="album"
                  value={newTrack.album}
                  label="Select album"
                  onChange={inputChangeHandler}
                >
                  {albums.map(album => (
                    <MenuItem key={album._id} value={album._id}>
                      {album.title}
                    </MenuItem>
                  ))}
                </Select>
                {
                  error && error.errors && error.errors.album &&
                  <FormHelperText>Path `album` is required</FormHelperText>
                }
              </FormControl>
            </Grid>
        }

        <FormElement
          required={true}
          onChange={inputChangeHandler}
          name="duration"
          label="Duration"
          value={newTrack.duration}
          error={getFieldError('duration')}
        />

        <Grid item>
          <Button type="submit" color="primary" variant="contained">Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;