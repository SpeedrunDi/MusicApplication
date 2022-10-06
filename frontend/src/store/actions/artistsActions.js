import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

export const POST_ARTIST_REQUEST = 'POST_ARTIST_REQUEST';
export const POST_ARTIST_SUCCESS = 'POST_ARTIST_SUCCESS';
export const POST_ARTIST_FAILURE = 'POST_ARTIST_FAILURE';
export const CLEAR_ARTIST_ERRORS = 'CLEAR_ARTIST_ERRORS';

export const PATCH_ARTIST_REQUEST = 'PATCH_ARTIST_REQUEST';
export const PATCH_ARTIST_SUCCESS = 'PATCH_ARTIST_SUCCESS';
export const PATCH_ARTIST_FAILURE = 'PATCH_ARTIST_FAILURE';

export const DELETE_ARTIST_REQUEST = 'DELETE_ARTIST_REQUEST';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
export const DELETE_ARTIST_FAILURE = 'DELETE_ARTIST_FAILURE';

const getArtistsRequest = () => ({type: GET_ARTISTS_REQUEST});
const getArtistsSuccess = artists => ({type: GET_ARTISTS_SUCCESS, payload: artists});
const getArtistsFailure = error => ({type: GET_ARTISTS_FAILURE, payload: error});

const postArtistRequest = () => ({type: POST_ARTIST_REQUEST});
const postArtistSuccess = () => ({type: POST_ARTIST_SUCCESS});
const postArtistFailure = error => ({type: POST_ARTIST_FAILURE, payload: error});
export const clearArtistErrors = () => ({type: CLEAR_ARTIST_ERRORS});

const patchArtistRequest = () => ({type: PATCH_ARTIST_REQUEST});
const patchArtistSuccess = () => ({type: PATCH_ARTIST_SUCCESS});
const patchArtistFailure = error => ({type: PATCH_ARTIST_FAILURE, payload: error});

const deleteArtistRequest = () => ({type: DELETE_ARTIST_REQUEST});
const deleteArtistSuccess = () => ({type: DELETE_ARTIST_SUCCESS});
const deleteArtistFailure = error => ({type: DELETE_ARTIST_FAILURE, payload: error});

export const getArtists = () => {
  return async dispatch => {
    try {
      dispatch(getArtistsRequest());
      const {data} = await axiosApi('/artists');

      dispatch(getArtistsSuccess(data));
    } catch (e) {
      dispatch(getArtistsFailure(e));
    }
  };
};

export const postArtist = (artistData) => {
  return async dispatch => {
    try {
      dispatch(postArtistRequest());
      await axiosApi.post('/artists', artistData);

      dispatch(postArtistSuccess());
      toast.success('You have successfully added an artist!', {
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
        dispatch(postArtistFailure(e.response.data));
      } else {
        dispatch(postArtistFailure({global: 'No internet'}));
      }
      throw e;
    }
  };
};

export const patchArtist = (id) => {
  return async dispatch => {
    try {
      dispatch(patchArtistRequest());

      await axiosApi.patch('/artists/' + id);

      dispatch(patchArtistSuccess());
    } catch (e) {
      dispatch(patchArtistFailure(e));
    }
  };
};

export const deleteArtist = (id) => {
  return async dispatch => {
    try {
      dispatch(deleteArtistRequest());

      await axiosApi.delete('/artists/' + id);

      dispatch(deleteArtistSuccess());
    } catch (e) {
      dispatch(deleteArtistFailure(e));
    }
  };
};