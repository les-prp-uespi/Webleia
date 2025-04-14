import { Box, Drawer, Grid2, IconButton, List, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { MdLogout, MdOutlineClose } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"
import packageInfo from "../../../../package.json";
import { setDrawerState } from "app/redux/reducers/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { MenuListItemButton, MenuLogo } from "./styles";
import { AuthUtils, Theme } from "app/shared/utils";
import { BsFillPieChartFill } from "react-icons/bs";
import { FiFile } from "react-icons/fi";

const VERSAO_WEB = packageInfo.version;

const DrawerComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const drawerState = useSelector(state => state.global.drawerState)

    const handleShowMenu = (value) => {
        dispatch(setDrawerState(value))
    }

    const handleLogout = () => {
        AuthUtils.logout()
    }

    const items = [
        {
            path: "/admin",
            label: "Dashboard",
            icon: BsFillPieChartFill,
        },
        {
            path: "/admin/textual-genre",
            label: "Gêneros textuais",
            icon: FiFile,
        }
    ]
    return (
        <>
            <Drawer
                style={{ zIndex: 99999 }}
                open={drawerState}
                onClose={() => handleShowMenu(false)}
            >
                <Box
                    width='300px'
                    padding="10px 0px 0px"
                    height='100%'
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                    bgcolor={Theme.colors.blue.dark}
                >
                    <Box display='flex' flexDirection='column'>
                        <Box px="8px" display='flex' alignItems='center' justifyContent='space-between'>
                            <MenuLogo alt="logo" src="/images/logo_with_slogan.svg" />
                            <IconButton
                                onClick={() => handleShowMenu(false)}
                            >
                                <MdOutlineClose color="white" size={28} />
                            </IconButton>
                        </Box>
                        <Box mt="10px">
                            <List disablePadding>
                                {items.map((item, index) => {
                                    const selected = location.pathname === item.path
                                    return (
                                        <Box
                                            key={index}
                                        >
                                            <MenuListItemButton
                                                onClick={() => {
                                                    navigate(item.path)
                                                    handleShowMenu(false)
                                                }}
                                                selected={selected}
                                            >
                                                <ListItemIcon>
                                                    <item.icon size={20} color={selected ? 'black' : "white"} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    sx={{
                                                        color: selected ? 'black' : "white"
                                                    }}
                                                >
                                                    <Typography fontWeight='500'>{item.label}</Typography>
                                                </ListItemText>
                                            </MenuListItemButton>
                                        </Box>
                                    )
                                })}
                                <Box>
                                    <MenuListItemButton
                                        onClick={handleLogout}
                                        isLast
                                        selected={false}
                                    >
                                        <ListItemIcon>
                                            <MdLogout size={20} color={"white"} />
                                        </ListItemIcon>
                                        <ListItemText
                                            sx={{
                                                color: "white"
                                            }}
                                        >
                                            <Typography fontWeight='500'>Sair</Typography>
                                        </ListItemText>
                                    </MenuListItemButton>
                                </Box>
                            </List>
                        </Box>
                    </Box>
                    <Box
                        bgcolor='white'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        flexDirection='column'
                        padding='10px'
                    >
                        <Grid2 justifyContent={'center'} container spacing={2} margin={'10px 0'}>
                            <img width={67} src="/images/logo_gov_piaui.svg" alt="" />
                            <img width={26} src="/images/logo_uespi.svg" alt="" />
                            <img width={63} src="/images/logo_letras.svg" alt="" />
                            <img width={73} src="/images/logo_leia.svg" alt="" />
                        </Grid2>
                        <Typography>
                            Versão {VERSAO_WEB}
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}

export default DrawerComponent