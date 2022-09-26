import axiosApi from "../../axiosApi";

export const GET_ALBUM_TRACKS_REQUEST = 'GET_ALBUM_TRACKS_REQUEST';
export const GET_ALBUM_TRACKS_SUCCESS = 'GET_ALBUM_TRACKS_SUCCESS';
export const GET_ALBUM_TRACKS_FAILURE = 'GET_ALBUM_TRACKS_FAILURE';

export const POST_TRACK_HISTORY_REQUEST = 'POST_TRACK_HISTORY_REQUEST';
export const POST_TRACK_HISTORY_SUCCESS = 'POST_TRACK_HISTORY_SUCCESS';
export const POST_TRACK_HISTORY_FAILURE = 'POST_TRACK_HISTORY_FAILURE';

const getAlbumTracksRequest = () => ({type: GET_ALBUM_TRACKS_REQUEST});
const getAlbumTracksSuccess = tracks => ({type: GET_ALBUM_TRACKS_SUCCESS, payload: tracks});
const getAlbumTracksFailure = error => ({type: GET_ALBUM_TRACKS_FAILURE, payload: error});

const postTrackHistoryRequest = () => ({type: POST_TRACK_HISTORY_REQUEST});
const postTrackHistorySuccess = () => ({type: POST_TRACK_HISTORY_SUCCESS});
const postTrackHistoryFailure = error => ({type: POST_TRACK_HISTORY_FAILURE, payload: error});

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
      const headers = {
        'Authorization': getState().users.user && getState().users.user.token,
      };

      dispatch(postTrackHistoryRequest());

      const response = await axiosApi.post('/track_history', {track: id}, {headers});
      console.log(response);
      dispatch(postTrackHistorySuccess());
    } catch (e) {
      dispatch(postTrackHistoryFailure(e));
    }
  };
};