import {GET_ALBUM_TRACKS_FAILURE, GET_ALBUM_TRACKS_REQUEST, GET_ALBUM_TRACKS_SUCCESS} from "../actions/tracksActions";

const initialState = {
  tracks: [],
  loading: false,
  error: null
};

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUM_TRACKS_REQUEST:
      return {...state, loading: true, error: null};
    case GET_ALBUM_TRACKS_SUCCESS:
      return {...state, loading: false, tracks: action.payload};
    case GET_ALBUM_TRACKS_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default tracksReducer;