import axiosApi from "../../axiosApi";

export const GET_ALBUM_TRACKS_REQUEST = 'GET_ALBUM_TRACKS_REQUEST';
export const GET_ALBUM_TRACKS_SUCCESS = 'GET_ALBUM_TRACKS_SUCCESS';
export const GET_ALBUM_TRACKS_FAILURE = 'GET_ALBUM_TRACKS_FAILURE';

const getAlbumTracksRequest = () => ({type: GET_ALBUM_TRACKS_REQUEST});
const getAlbumTracksSuccess = tracks => ({type: GET_ALBUM_TRACKS_SUCCESS, payload: tracks});
const getAlbumTracksFailure = error => ({type: GET_ALBUM_TRACKS_FAILURE, payload: error});

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