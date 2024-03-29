import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export const GET_ALBUM_TRACKS_REQUEST = 'GET_ALBUM_TRACKS_REQUEST';
export const GET_ALBUM_TRACKS_SUCCESS = 'GET_ALBUM_TRACKS_SUCCESS';
export const GET_ALBUM_TRACKS_FAILURE = 'GET_ALBUM_TRACKS_FAILURE';

export const POST_TRACK_HISTORY_REQUEST = 'POST_TRACK_HISTORY_REQUEST';
export const POST_TRACK_HISTORY_SUCCESS = 'POST_TRACK_HISTORY_SUCCESS';
export const POST_TRACK_HISTORY_FAILURE = 'POST_TRACK_HISTORY_FAILURE';

export const GET_TRACK_HISTORY_REQUEST = 'GET_TRACK_HISTORY_REQUEST';
export const GET_TRACK_HISTORY_SUCCESS = 'GET_TRACK_HISTORY_SUCCESS';
export const GET_TRACK_HISTORY_FAILURE = 'GET_TRACK_HISTORY_FAILURE';

export const POST_TRACK_REQUEST = 'POST_TRACK_REQUEST';
export const POST_TRACK_SUCCESS = 'POST_TRACK_SUCCESS';
export const POST_TRACK_FAILURE = 'POST_TRACK_FAILURE';
export const CLEAR_TRACK_ERRORS = 'CLEAR_TRACK_ERRORS';

export const PATCH_TRACK_REQUEST = 'PATCH_TRACK_REQUEST';
export const PATCH_TRACK_SUCCESS = 'PATCH_TRACK_SUCCESS';
export const PATCH_TRACK_FAILURE = 'PATCH_TRACK_FAILURE';

export const DELETE_TRACK_REQUEST = 'DELETE_TRACK_REQUEST';
export const DELETE_TRACK_SUCCESS = 'DELETE_TRACK_SUCCESS';
export const DELETE_TRACK_FAILURE = 'DELETE_TRACK_FAILURE';

const getAlbumTracksRequest = () => ({type: GET_ALBUM_TRACKS_REQUEST});
const getAlbumTracksSuccess = tracks => ({type: GET_ALBUM_TRACKS_SUCCESS, payload: tracks});
const getAlbumTracksFailure = error => ({type: GET_ALBUM_TRACKS_FAILURE, payload: error});

const postTrackHistoryRequest = () => ({type: POST_TRACK_HISTORY_REQUEST});
const postTrackHistorySuccess = () => ({type: POST_TRACK_HISTORY_SUCCESS});
const postTrackHistoryFailure = error => ({type: POST_TRACK_HISTORY_FAILURE, payload: error});

const getTrackHistoryRequest = () => ({type: GET_TRACK_HISTORY_REQUEST});
const getTrackHistorySuccess = tracks_history => ({type: GET_TRACK_HISTORY_SUCCESS, payload: tracks_history});
const getTrackHistoryFailure = error => ({type: GET_TRACK_HISTORY_FAILURE, payload: error});

const postTrackRequest = () => ({type: POST_TRACK_REQUEST});
const postTrackSuccess = () => ({type: POST_TRACK_SUCCESS});
const postTrackFailure = error => ({type: POST_TRACK_FAILURE, payload: error});
export const clearTrackErrors = () => ({type: CLEAR_TRACK_ERRORS});

const patchTrackRequest = () => ({type: PATCH_TRACK_REQUEST});
const patchTrackSuccess = () => ({type: PATCH_TRACK_SUCCESS});
const patchTrackFailure = error => ({type: PATCH_TRACK_FAILURE, payload: error});

const deleteTrackRequest = () => ({type: DELETE_TRACK_REQUEST});
const deleteTrackSuccess = () => ({type: DELETE_TRACK_SUCCESS});
const deleteTrackFailure = error => ({type: DELETE_TRACK_FAILURE, payload: error});

export const getAlbumTracks = id => {
  return async dispatch => {
    try {
      dispatch(getAlbumTracksRequest());
      const {data} = await axiosApi(`/tracks?album=${id}`);

      dispatch(getAlbumTracksSuccess(data));
    } catch (e) {
      dispatch(getAlbumTracksFailure(e));
    }
  };
};

export const postTrackHistory = id => {
  return async (dispatch, getState) => {
    try {
      if (!getState().users.user) {
        return console.error('You are not authorized');
      }

      const headers = {
        'Authorization': getState().users.user && getState().users.user.token,
      };

      dispatch(postTrackHistoryRequest());

      await axiosApi.post('/track_history', {track: id}, {headers});

      dispatch(postTrackHistorySuccess());
    } catch (e) {
      dispatch(postTrackHistoryFailure(e));
    }
  };
};

export const getTrackHistory = () => {
  return async (dispatch, getState) => {
    try {
      const headers = {
        'Authorization': getState().users.user && getState().users.user.token,
      };

      dispatch(getTrackHistoryRequest());

      const {data} = await axiosApi('/track_history',  {headers});

      dispatch(getTrackHistorySuccess(data));
    } catch (e) {
      if (e.response.status === 401) {
        toast.warn('You need login!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      dispatch(getTrackHistoryFailure(e));
    }
  };
};

export const postTrack = (trackData) => {
  return async dispatch => {
    try {
      dispatch(postTrackRequest());
      await axiosApi.post('/tracks', trackData);

      dispatch(postTrackSuccess());
      toast.success('You have successfully added a song!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(postTrackFailure(e.response.data));
      } else {
        dispatch(postTrackFailure({global: 'No internet'}));
      }
      throw e;
    }
  };
};

export const patchTrack = (id) => {
  return async dispatch => {
    try {
      dispatch(patchTrackRequest());

      await axiosApi.patch('/tracks/' + id);

      dispatch(patchTrackSuccess());
    } catch (e) {
      dispatch(patchTrackFailure(e));
    }
  };
};

export const deleteTrack = (id) => {
  return async dispatch => {
    try {
      dispatch(deleteTrackRequest());

      await axiosApi.delete('/tracks/' + id);

      dispatch(deleteTrackSuccess());
    } catch (e) {
      dispatch(deleteTrackFailure(e));
    }
  };
};