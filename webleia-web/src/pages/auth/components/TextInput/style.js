import { Theme } from 'app/shared/utils';
import styled from 'styled-components';

const { TextField } = require('@mui/material');

export const TextInputStyled = styled(TextField)`
 ::placeholder {
    font-family: 'Roboto';
    color: ${Theme.colors.black}
 }
 
 input {
   padding: 12px;
 }

 label {
   font-size: 14px;
   font-family: 'Roboto';
   color: ${Theme.colors.black}
 }
`;
