import { IconButton } from '@mui/material';
import { Theme } from 'app/shared/utils';
import styled from 'styled-components';

export const TitlePage = styled.p`
    font-family: 'Roboto';
    font-size: 34px;
    font-weight: 400;
    letter-spacing: 0.25px;
    text-align: left;
    margin: 0;
`;

export const SubtitlePage = styled.p`
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.4000000059604645px;
    text-align: left;
    margin: 0;
    margin-bottom: 20px;
`;

export const BackButton = styled(IconButton)`
  background-color: ${Theme.colors.blue.default} !important;
  svg {
    color: #fff;
  }

  &:hover {
    background-color: ${Theme.colors.blue.dark} !important;
  }
`;
