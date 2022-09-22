import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getArtistAlbums} from "../../store/actions/albumsActions";

const Artist = ({match}) => {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.albums);

  useEffect(() => {
    dispatch(getArtistAlbums(match.params.id));
  }, [dispatch, match]);

  return (
    <div>

    </div>
  );
};

export default Artist;