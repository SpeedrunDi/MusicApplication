import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FileInput from "../UI/Form/FileInput/FileInput";

const ArtistForm = ({onSubmit, error}) => {
  const [newArtist, setNewArtist] = useState({
    name: "",
    image: "",
    information: ""
  });

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(newArtist).forEach(key => {
      formData.append(key, newArtist[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setNewArtist(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setNewArtist(prevState => ({...prevState, [name]: file}));
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
          name="name"
          label="Name"
          value={newArtist.name}
          error={getFieldError('name')}
        />

        <FormElement
          onChange={inputChangeHandler}
          name="information"
          label="Information"
          value={newArtist.information}
          error={getFieldError('information')}
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

export default ArtistForm;