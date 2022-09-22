import axiosApi from "../../axiosApi";

export const GET_ARTIST_ALBUMS_REQUEST = 'GET_ARTIST_ALBUMS_REQUEST';
export const GET_ARTIST_ALBUMS_SUCCESS = 'GET_ARTIST_ALBUMS_SUCCESS';
export const GET_ARTIST_ALBUMS_FAILURE = 'GET_ARTIST_ALBUMS_FAILURE';

const getArtistAlbumsRequest = () => ({type: GET_ARTIST_ALBUMS_REQUEST});
const getArtistAlbumsSuccess = albums => ({type: GET_ARTIST_ALBUMS_SUCCESS, payload: albums});
const getArtistAlbumsFailure = error => ({type: GET_ARTIST_ALBUMS_FAILURE, payload: error});

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