import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const GET_ARTIST_ALBUMS_REQUEST = 'GET_ARTIST_ALBUMS_REQUEST';
export const GET_ARTIST_ALBUMS_SUCCESS = 'GET_ARTIST_ALBUMS_SUCCESS';
export const GET_ARTIST_ALBUMS_FAILURE = 'GET_ARTIST_ALBUMS_FAILURE';

export const GET_ALBUM_REQUEST = 'GET_ALBUM_REQUEST';
export const GET_ALBUM_SUCCESS = 'GET_ALBUM_SUCCESS';
export const GET_ALBUM_FAILURE = 'GET_ALBUM_FAILURE';

export const POST_ALBUM_REQUEST = 'POST_ALBUM_REQUEST';
export const POST_ALBUM_SUCCESS = 'POST_ALBUM_SUCCESS';
export const POST_ALBUM_FAILURE = 'POST_ALBUM_FAILURE';
export const CLEAR_ALBUM_ERRORS = 'CLEAR_ALBUM_ERRORS';

const getAlbumRequest = () => ({type: GET_ALBUM_REQUEST});
const getAlbumSuccess = album => ({type: GET_ALBUM_SUCCESS, payload: album});
const getAlbumFailure = error => ({type: GET_ALBUM_FAILURE, payload: error});

const getArtistAlbumsRequest = () => ({type: GET_ARTIST_ALBUMS_REQUEST});
const getArtistAlbumsSuccess = albums => ({type: GET_ARTIST_ALBUMS_SUCCESS, payload: albums});
const getArtistAlbumsFailure = error => ({type: GET_ARTIST_ALBUMS_FAILURE, payload: error});

const postAlbumRequest = () => ({type: POST_ALBUM_REQUEST});
const postAlbumSuccess = () => ({type: POST_ALBUM_SUCCESS});
const postAlbumFailure = error => ({type: POST_ALBUM_FAILURE, payload: error});
export const clearAlbumErrors = () => ({type: CLEAR_ALBUM_ERRORS});

export const getArtistAlbums = artistId => {
  return async dispatch => {
    try {
      dispatch(getArtistAlbumsRequest());
      const {data} = await axiosApi(`/albums?artist=${artistId}`);

      dispatch(getArtistAlbumsSuccess(data));
    } catch (e) {
      dispatch(getArtistAlbumsFailure(e));
    }
  };
};

export const getAlbum = id => {
  return async dispatch => {
    try {
      dispatch(getAlbumRequest());
      const {data} = await axiosApi(`/albums/${id}`);

      dispatch(getAlbumSuccess(data));
    } catch (e) {
      dispatch(getAlbumFailure(e));
    }
  };
};

export const postAlbum = (albumData) => {
  return async dispatch => {
    try {
      dispatch(postAlbumRequest());
      await axiosApi.post('/albums', albumData);

      dispatch(postAlbumSuccess());
      toast.success('You have successfully added an album!', {
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
        dispatch(postAlbumFailure(e.response.data));
      } else {
        dispatch(postAlbumFailure({global: 'No internet'}));
      }
      throw e;
    }
  };
};