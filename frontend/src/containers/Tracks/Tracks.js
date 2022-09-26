import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress, Typography} from "@mui/material";
import {getAlbumTracks, postTrackHistory} from "../../store/actions/tracksActions";
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

  const playMusic = id => {
    dispatch(postTrackHistory(id));
  };

  return loading ? (<Box width="max-content" margin="100px auto 0"><CircularProgress /></Box>) :
    (<Box width="max-content" marginX="auto" paddingY="20px">
      {tracks.length !== 0 ?
        (
          <>
            <Typography variant="h3" textAlign="center" marginBottom="30px">
              {album && album.artist.name}
            </Typography>
            <Typography variant="h3" textAlign="center" marginBottom="30px">
              {tracks[0].album.title}
            </Typography>
            {tracks.map(track => (
              <TrackItem key={track._id} track={track} onPlayMusic={() => playMusic(track._id)}/>
            ))}
          </>
        ) : <Typography variant="h2" textAlign="center">No Tracks</Typography>
      }
    </Box>
  );
};

export default Tracks;