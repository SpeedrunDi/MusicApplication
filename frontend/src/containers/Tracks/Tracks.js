import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress, Typography} from "@mui/material";
import {getAlbumTracks} from "../../store/actions/tracksActions";
import TrackItem from "../../components/TrackItem/TrackItem";
import {getAlbum} from "../../store/actions/albumsActions";

const Tracks = ({match}) => {
  const dispatch = useDispatch();
  const tracks = useSelector(state => state.tracks.tracks);
  const album = useSelector(state => state.albums.album);
  const loading = useSelector(state => state.tracks.loading);

  useEffect(() => {
    dispatch(getAlbum(match.params.id));
    dispatch(getAlbumTracks(match.params.id));
  }, [dispatch, match]);

  return tracks.length !== 0 ? (
    <Box width="max-content" marginX="auto" paddingY="20px">
      {loading ? (<Box width="max-content" marginX="auto"><CircularProgress /></Box>) :
        (
          <>
            <Typography variant="h3" textAlign="center" marginBottom="30px">
              {album.artist.name}
            </Typography>
            <Typography variant="h3" textAlign="center" marginBottom="30px">
              {tracks[0].album.title}
            </Typography>
            {tracks.map(track => (
              <TrackItem key={track._id} track={track}/>
            ))}
          </>
        )
      }
    </Box>
  ) : <Typography variant="h2" textAlign="center">No albums</Typography>;
};

export default Tracks;