import { Outlet } from "react-router";
import { Content, LayoutContainer } from "./styles";
import NavbarComponent from "./NavbarComponent";
import { LayoutFooter } from "app/shared/components";
import { useApp } from "app/shared/hooks";
import { useEffect } from "react";
import { AuthUtils } from "app/shared/utils";
import DrawerComponent from "./DrawerComponents";

const MainLayout = () => {
    const { updateUser } = useApp()

    useEffect(() => {
        const user = AuthUtils.getUser()
        updateUser(user)
    }, []);

    return (
        <>
            <DrawerComponent />
            <NavbarComponent />
            <LayoutContainer>
                <Content>
                    <Outlet />
                </Content>
            </LayoutContainer>
            <LayoutFooter />
        </>
    );
};

export default MainLayout;
