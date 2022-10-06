import {
  CLEAR_ARTIST_ERRORS,
  GET_ARTISTS_FAILURE,
  GET_ARTISTS_REQUEST,
  GET_ARTISTS_SUCCESS, POST_ARTIST_FAILURE,
  POST_ARTIST_REQUEST, POST_ARTIST_SUCCESS
} from "../actions/artistsActions";

const initialState = {
  artists: [],
  loading: false,
  error: null
};

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTISTS_REQUEST:
      return {...state, loading: true, error: null};
    case GET_ARTISTS_SUCCESS:
      return {...state, loading: false, artists: action.payload};
    case GET_ARTISTS_FAILURE:
      return {...state, loading: false, error: action.payload};

    case POST_ARTIST_REQUEST:
      return {...state, loading: true, error: null};
    case POST_ARTIST_SUCCESS:
      return {...state, loading: false};
    case POST_ARTIST_FAILURE:
      return {...state, loading: false, error: action.payload};
    case CLEAR_ARTIST_ERRORS:
      return {...state, error: null};

    default:
      return state;
  }
};

export default artistsReducer;