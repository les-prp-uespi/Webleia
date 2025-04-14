import { ListItemButton } from "@mui/material";
import { Theme } from "app/shared/utils";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const LayoutContainer = styled.div`
    background-color: #F9FAFC;
    width: 100%;
    min-height: 100vh;
    padding: 62px 10px 80px;
    overflow: visible;
    
`

export const Content = styled.div`
    margin: 0;
    margin-top: 20px;
    padding: 0px 5px;
    width: 100%;
`

export const MenuLink = styled(Link)`
    text-decoration: none;
    height: 48px;
`

export const MenuLogo = styled.img`
    width: 140px;
`

export const MenuListItemButton = styled(ListItemButton)`
    border-top: 1px solid white !important;
    padding: 0px 8px;

    ${props => props.isLast && "border-bottom: 1px solid white !important;"}
    ${props => props.selected && `background: ${Theme.colors.yellow} !important;`}
`

export const NavbarContainer = styled.div`
    background-color: ${Theme.colors.blue.dark};
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    color: #fff;
    padding: 0px 10px 0px 20px;

    z-index: 9999;

    display: flex;
    align-items: center;
    justify-content: space-between;

    #logo {
        height: 40px;
    }
`