import React, {useState} from 'react';
import {Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FileInput from "../UI/Form/FileInput/FileInput";

const AlbumForm = ({onSubmit, artists, error}) => {
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    image: "",
    release: ""
  });

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(newAlbum).forEach(key => {
      formData.append(key, newAlbum[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setNewAlbum(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setNewAlbum(prevState => ({...prevState, [name]: file}));
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
          value={newAlbum.title}
          error={getFieldError('title')}
        />

        <Grid item>
          <FormControl required fullWidth error={Boolean(getFieldError('artist'))}>
            <InputLabel id="select-artist">Select artist</InputLabel>
            <Select
              labelId="select-artist"
              name="artist"
              value={newAlbum.artist}
              label="Select artist"
              onChange={inputChangeHandler}
            >
              {artists !== 0 && artists.map(artist => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.name}
                </MenuItem>
              ))}
            </Select>
            {
              error && error.errors && error.errors.artist &&
                <FormHelperText>Path `artist` is required</FormHelperText>
            }
          </FormControl>
        </Grid>

        <FormElement
          type="number"
          required={true}
          onChange={inputChangeHandler}
          name="release"
          label="Release"
          value={newAlbum.release}
          error={getFieldError('release')}
        />

        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileChangeHandler}
          />
        </Grid>

        <Grid item>
          <Button type="submit" color="primary" variant="contained">Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;