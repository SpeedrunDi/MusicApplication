import {useState} from "react";
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import {logoutUser} from "../../../../store/actions/usersActions";

const UserMenu = ({user}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box>
      <Button
        component={Link}
        to="/user_history"
        color="inherit"
        sx={{fontSize: "18px"}}
      >
        User history
      </Button>
      <Button
        id="basic-button"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{fontSize: "18px"}}
      >
        Hello, {user.username}!
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
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
