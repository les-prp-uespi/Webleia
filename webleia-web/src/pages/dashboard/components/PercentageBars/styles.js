import { Theme } from 'app/shared/utils';
import styled from 'styled-components';

export const Title = styled.p`
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.15000000596046448px;
    text-align: left;
    color: ${Theme.colors.black}
`;

export const TextBar = styled.p`
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.17000000178813934px;
    text-align: left;
    align-self: center;
    vertical-align: middle;
    margin: 0;
`;

export const Bar = styled.div`
    background-color: #7FA4D6;
    height: 24px;
    border-radius: 0px 16px 16px 0px;
    width: ${(props) => props.value}%;
    transition: width 0.3s ease-in-out;
    align-self: center;
    vertical-align: middle;
`;
