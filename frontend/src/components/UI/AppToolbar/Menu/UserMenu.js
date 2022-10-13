import {useState} from "react";
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Grid} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {logoutUser} from "../../../../store/actions/usersActions";
import {getArtists} from "../../../../store/actions/artistsActions";
import {apiUrl} from "../../../../config";

import defaultAvatar from '../../../../assets/user.png';

const UserMenu = ({user}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  let image = defaultAvatar;

  if (user && user.avatar) {
    if (user.avatarIsLink) {
      image = user.avatar;
    } else {
      image = apiUrl + '/' + user.avatar;
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await dispatch(logoutUser());
    await dispatch(getArtists());
    history.push('/');
  };

  return (
    <Grid container>
      <Grid item marginRight="20px" alignItems="center">
        <img src={image} style={{width: "50px", height: "50px"}} alt=""/>
      </Grid>
      <Grid item>
        <Button
          id="basic-button"
          color="inherit"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{fontSize: "18px"}}
        >
          Hello, {user.displayName}!
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{marginTop: "15px", marginLeft: "20px"}}
        >
          <MenuItem onClick={handleClose} component={Link} to="/artists/new">Add Artist</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/albums/new">Add Album</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/tracks/new">Add Track</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/user_history">User history</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default UserMenu;
