import {
  GET_ALBUM_FAILURE,
  GET_ALBUM_REQUEST,
  GET_ALBUM_SUCCESS,
  GET_ARTIST_ALBUMS_FAILURE,
  GET_ARTIST_ALBUMS_REQUEST,
  GET_ARTIST_ALBUMS_SUCCESS
} from "../actions/albumsActions";

const initialState = {
  albums: [],
  album: null,
  loading: false,
  error: null
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTIST_ALBUMS_REQUEST:
      return {...state, loading: true, error: null};
    case GET_ARTIST_ALBUMS_SUCCESS:
      return {...state, loading: false, albums: action.payload};
    case GET_ARTIST_ALBUMS_FAILURE:
      return {...state, loading: false, error: action.payload};
    case GET_ALBUM_REQUEST:
      return {...state, loading: true, error: null};
    case GET_ALBUM_SUCCESS:
      return {...state, loading: false, album: action.payload};
    case GET_ALBUM_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default albumsReducer;