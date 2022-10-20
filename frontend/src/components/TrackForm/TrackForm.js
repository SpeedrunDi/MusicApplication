import React, {useEffect, useState} from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, LinearProgress, MenuItem, Select, Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../UI/Form/FormElement/FormElement";
import {getArtistAlbums} from "../../store/actions/albumsActions";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const TrackForm = ({onSubmit, artists, error}) => {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.albums);
  const loading = useSelector(state => state.albums.loading);
  const tracksLoading = useSelector(state => state.tracks.loading);

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

  useEffect(() => {
    if (albums.length !== 0) {
      setArtistId(albums[0].artist._id);
    }
  }, [albums]);

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
              {
                artists.length === 0 &&
                <MenuItem value="" disabled>
                  No published artists
                </MenuItem>
              }
              {artists !== 0 && artists.map(artist => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {loading && <LinearProgress/>}
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
          <Tooltip
            title={
              (artists.length === 0 && "No published artists")
              || (albums.length === 0 && "No published albums")
            }
          >
            <span>
              <ButtonWithProgress
                type="submit"
                color="primary"
                variant="contained"
                loading={tracksLoading}
                disabled={tracksLoading || artists.length === 0 || albums.length === 0}
              >
              Add
            </ButtonWithProgress>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;