import {
  CLEAR_TRACK_ERRORS, DELETE_TRACK_FAILURE, DELETE_TRACK_REQUEST, DELETE_TRACK_SUCCESS,
  GET_ALBUM_TRACKS_FAILURE,
  GET_ALBUM_TRACKS_REQUEST,
  GET_ALBUM_TRACKS_SUCCESS,
  GET_TRACK_HISTORY_FAILURE,
  GET_TRACK_HISTORY_REQUEST,
  GET_TRACK_HISTORY_SUCCESS, PATCH_TRACK_FAILURE, PATCH_TRACK_REQUEST, PATCH_TRACK_SUCCESS, POST_TRACK_FAILURE,
  POST_TRACK_HISTORY_FAILURE,
  POST_TRACK_HISTORY_REQUEST,
  POST_TRACK_HISTORY_SUCCESS, POST_TRACK_REQUEST, POST_TRACK_SUCCESS
} from "../actions/tracksActions";

const initialState = {
  tracks: [],
  tracksHistory: [],
  loading: false,
  btnLoading: false,
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

    case POST_TRACK_HISTORY_REQUEST:
      return {...state, loading: true, error: null};
    case POST_TRACK_HISTORY_SUCCESS:
      return {...state, loading: false};
    case POST_TRACK_HISTORY_FAILURE:
      return {...state, loading: false, error: action.payload};

    case GET_TRACK_HISTORY_REQUEST:
      return {...state, loading: true, error: null};
    case GET_TRACK_HISTORY_SUCCESS:
      return {...state, loading: false, tracksHistory: action.payload};
    case GET_TRACK_HISTORY_FAILURE:
      return {...state, loading: false, error: action.payload};

    case POST_TRACK_REQUEST:
      return {...state, loading: true, error: null};
    case POST_TRACK_SUCCESS:
      return {...state, loading: false};
    case POST_TRACK_FAILURE:
      return {...state, loading: false, error: action.payload};
    case CLEAR_TRACK_ERRORS:
      return {...state, error: null};

    case PATCH_TRACK_REQUEST:
      return {...state, btnLoading: true, error: null};
    case PATCH_TRACK_SUCCESS:
      return {...state, btnLoading: false};
    case PATCH_TRACK_FAILURE:
      return {...state, btnLoading: false, error: action.payload};

    case DELETE_TRACK_REQUEST:
      return {...state, btnLoading: true, error: null};
    case DELETE_TRACK_SUCCESS:
      return {...state, btnLoading: false};
    case DELETE_TRACK_FAILURE:
      return {...state, btnLoading: false, error: action.payload};

    default:
      return state;
  }
};

export default tracksReducer;