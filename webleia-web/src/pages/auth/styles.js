import { Button } from '@mui/material';
import { Theme } from 'app/shared/utils';
import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';

export const ButtonBlue = styled(LoadingButton)`
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    margin: 5px 0!important;
`;

export const ButtonWhite = styled(LoadingButton)`
    background-color: #FFFFFF!important;
    color: ${Theme.colors.blue.default}!important;
    border-radius: 5px;
    border: 1px solid ${Theme.colors.blue.default}!important;
    margin: 5px 0!important;
`;

export const Version = styled.p`
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 400;
    text-align: center;
`;

export const FormAuth = styled.form`
    .MuiFormControl-root {
        margin: 8px 0;
    }

    .MuiAutocomplete-inputRoot {
        margin: 0px;
        padding: 0px;
        max-height: 47px;
    }

    .MuiAutocomplete-fullWidth {
        label {
            font-size: 14px;
            font-family: 'Roboto';
            color: black;
        }
    }
`;

export const ErrorAuth = styled.p`
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: ${Theme.colors.red};
`;
