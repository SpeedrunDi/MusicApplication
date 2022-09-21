import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getArtists} from "../../store/actions/artistsActions";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtists());
  }, []);

  return (
    <div>

    </div>
  );
};

export default Main;