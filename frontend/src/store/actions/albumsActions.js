import axiosApi from "../../axiosApi";

export const GET_ARTIST_ALBUMS_REQUEST = 'GET_ARTIST_ALBUMS_REQUEST';
export const GET_ARTIST_ALBUMS_SUCCESS = 'GET_ARTIST_ALBUMS_SUCCESS';
export const GET_ARTIST_ALBUMS_FAILURE = 'GET_ARTIST_ALBUMS_FAILURE';

const getArtistAlbumsRequest = () => ({type: GET_ARTIST_ALBUMS_REQUEST});
const getArtistAlbumsSuccess = albums => ({type: GET_ARTIST_ALBUMS_SUCCESS, payload: albums});
const getArtistAlbumsFailure = error => ({type: GET_ARTIST_ALBUMS_FAILURE, payload: error});

export const GET_ALBUM_REQUEST = 'GET_ALBUM_REQUEST';
export const GET_ALBUM_SUCCESS = 'GET_ALBUM_SUCCESS';
export const GET_ALBUM_FAILURE = 'GET_ALBUM_FAILURE';

const getAlbumRequest = () => ({type: GET_ALBUM_REQUEST});
const getAlbumSuccess = album => ({type: GET_ALBUM_SUCCESS, payload: album});
const getAlbumFailure = error => ({type: GET_ALBUM_FAILURE, payload: error});

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