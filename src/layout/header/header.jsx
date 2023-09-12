import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// project imports
import { theme } from "../../services/theme"
import Logo from '../../components/general_comps/logo';
import srcImg from '/images/man.png'
import { changeDarkMode } from "../../features/featuresSlice"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Header = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    //navbar states
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [displayBurger, setDisplayBurger] = useState("block");
    const [displayButtonX, setDisplayButtonX] = useState("none");

    //nanbar functions
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        setDisplayBurger("none")
        setDisplayButtonX("block")
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        setDisplayBurger("block")
        setDisplayButtonX("none")
    };

    //open userMenu
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    //close userMenu
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //darkMode
    const { darkMode } = useSelector(myStore => myStore.featuresSlice);

    const ClickLogout = () => {
        nav("/")
        toast.success("Have a good day!")
    };
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color={darkMode == false ? 'primary' : 'darkMode'}>
                <Container maxWidth="lg" >
                    <div className='d-flex justify-content-between align-items-center' >
                        <div className='d-none d-md-flex'>
                                <Logo />
                        </div>

                        <div className='d-flex d-md-none '>
                            <IconButton
                                size="small"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="white"
                            >
                                <MenuIcon sx={{ display: displayBurger }} />
                                <CloseIcon sx={{ display: displayButtonX }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },

                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleCloseNavMenu()
                                        nav("/")
                                    }}>
                                    Home
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleCloseNavMenu()
                                        nav("/favorites")
                                    }}>
                                    Favorites
                                </MenuItem>
                            </Menu>
                        </div>

                        <div className='d-flex d-md-none mx-auto py-3'>
                            {/* <Link to="/"> */}
                                <Logo />
                            {/* </Link> */}
                        </div>

                        <div className='d-none d-md-flex' >
                            <div>
                                <Button
                                    onClick={() => {
                                        nav("/")
                                    }}
                                    sx={{
                                        color: 'white', px: 3, py: 3
                                    }}>
                                    Home
                                </Button>
                            </div>

                            <div >
                                <Button
                                    onClick={() => {
                                        nav("/favorites")
                                    }}
                                    sx={{
                                        color: "white", px: 3, py: 3
                                    }}>
                                    Favorites
                                </Button>
                            </div>
                        </div>

                        <div className='text-center align-items-center px-3 d-none d-md-flex'
                            style={{ color: darkMode == true ? '#8ECDDD' : 'yellow' }}
                        >
                            {darkMode == false ? "Light" : 'Dark'}
                            <IconButton onClick={() => { dispatch(changeDarkMode()) }} color={darkMode == true ? "primary" : "inherit"}>
                                {darkMode == true ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </div>

                        <div className='d-flex align-items-center justify-content-md-end'>
                            <Tooltip title={"Avatar"} >
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Avatar" src={srcImg} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: 3 }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <div className='text-center px-3 d-flex align-items-center d-md-none'>
                                    {darkMode == false ? "Light" : 'Dark'}
                                    <IconButton onClick={() => { dispatch(changeDarkMode()) }} color="inherit">
                                        {darkMode == true ? <Brightness7Icon /> : <Brightness4Icon />}
                                    </IconButton>
                                </div>
                                <MenuItem onClick={ClickLogout}>goodDay</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </Container>
            </AppBar>
        </ThemeProvider >
    )
}

export default Header