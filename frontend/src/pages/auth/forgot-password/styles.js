import { Button } from '@mui/material';
import { Theme } from 'app/shared/utils';
import styled from 'styled-components';

export const Link = styled.a`
    padding-top: 0px;
    padding-bottom: 10px;
    margin-top: 0;
    text-align: right;
    color: ${Theme.colors.blue.default};
    text-transform: uppercase;
    font-weight: 500;
    float: right;
    cursor: pointer;
`;
