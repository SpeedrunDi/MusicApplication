import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Container} from "@mui/material";
import {getArtists} from "../../store/actions/artistsActions";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <Container>

    </Container>
  );
};

export default Main;