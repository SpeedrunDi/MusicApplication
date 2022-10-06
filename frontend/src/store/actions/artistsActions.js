import axiosApi from "../../axiosApi";

export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

export const POST_ARTIST_REQUEST = 'POST_ARTISTS_REQUEST';
export const POST_ARTIST_SUCCESS = 'POST_ARTISTS_SUCCESS';
export const POST_ARTIST_FAILURE = 'POST_ARTISTS_FAILURE';
export const CLEAR_ARTIST_ERRORS = 'CLEAR_ARTIST_ERRORS';

const getArtistsRequest = () => ({type: GET_ARTISTS_REQUEST});
const getArtistsSuccess = artists => ({type: GET_ARTISTS_SUCCESS, payload: artists});
const getArtistsFailure = error => ({type: GET_ARTISTS_FAILURE, payload: error});

const postArtistRequest = () => ({type: POST_ARTIST_REQUEST});
const postArtistSuccess = () => ({type: POST_ARTIST_SUCCESS});
const postArtistFailure = error => ({type: POST_ARTIST_FAILURE, payload: error});
export const clearArtistErrors = () => ({type: CLEAR_ARTIST_ERRORS});

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

export const postArtists = (artistData) => {
  return async dispatch => {
    try {
      dispatch(postArtistRequest());
      await axiosApi.post('/artists', artistData);

      dispatch(postArtistSuccess());
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