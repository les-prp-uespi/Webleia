import { Avatar, Box, Grid2, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material"
import { NavbarContainer } from "./styles"
import { MdLogout, MdPerson } from "react-icons/md";
import { AuthUtils } from "app/shared/utils";
import { useApp } from "app/shared/hooks";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setDrawerState } from "app/redux/reducers/globalSlice";


const NavbarComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useDispatch()
    const { user } = useApp();

    if (!user) return null;
    const isAdmin = user.perfil + '' === '1'
    const aluno = user?.relacionado?.[0]
    const profilePic = user?.foto;

    const handleShowMenu = (value) => {
        dispatch(setDrawerState(value))
    }


    const handleLogout = () => {
        AuthUtils.logout()
    }

    return (
        <NavbarContainer>
            <Box display='flex' alignItems='center'>
                {isAdmin && <IconButton sx={{ mr: 2 }} onClick={() => handleShowMenu(true)}>
                    <FiMenu color="white" />
                </IconButton>}
                <img id="logo" alt="logo" src="/images/logo_leia_no_desc.svg" />
            </Box>
            <Grid2 container spacing={3}>
                {!isMobile && <Grid2
                    display='flex'
                    alignItems='center'
                >
                    <Avatar src={profilePic} sx={{ bgcolor: '#CDCDCD', width: 30, height: 30 }}>
                        {profilePic ? "foto" : <MdPerson />}
                    </Avatar>
                    <Grid2
                        display='flex'
                        flexDirection='column'
                        marginLeft='10px'
                    >
                        <Tooltip
                            title={aluno?.nome}
                            placement="bottom-end"
                            PopperProps={{
                                sx: {
                                    zIndex: 10000
                                }
                            }}
                            arrow
                        >
                            <Typography lineHeight='15px' variant="caption">
                                {isAdmin ? user.nome : aluno?.nome}
                            </Typography>
                        </Tooltip>
                        <Tooltip
                            title={isAdmin ? user.email : aluno?.instituicao_ensino?.nome}
                            placement="bottom-end"
                            PopperProps={{
                                sx: {
                                    zIndex: 10000
                                }
                            }}
                            arrow
                        >
                            <Typography
                                lineHeight='15px'
                                variant="caption"
                                fontWeight='bold'
                                textOverflow='ellipsis'
                                overflow='hidden'
                                maxWidth='100px'
                                whiteSpace='nowrap'
                            >{isAdmin ? user.email : aluno?.instituicao_ensino?.nome}</Typography>
                        </Tooltip>
                    </Grid2>
                </Grid2>}
                <Grid2>
                    <IconButton
                        onClick={handleLogout}
                    >
                        <MdLogout color="white" />
                    </IconButton>
                </Grid2>
            </Grid2>

        </NavbarContainer>
    )
}

export default NavbarComponent