import { Theme } from 'app/shared/utils';
import styled from 'styled-components';

export const LayoutContainer = styled.div`
    background-color: ${Theme.colors.blue.dark};
    width: 100%;
    min-height: 100vh;
    padding: 30px 0px 10px;
    overflow: visible;
`;

export const Content = styled.div`
    margin-top: 25px;
    padding: 10px 50px;
`;

export const Logo = styled.img`
    max-width: 160px;
    display: block;
    margin: auto;
`;
