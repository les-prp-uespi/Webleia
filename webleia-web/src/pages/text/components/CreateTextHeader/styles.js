import { IconButton } from "@mui/material";
import { Theme } from "app/shared/utils";
import styled from "styled-components";

export const BackButton = styled(IconButton)`
  background-color: ${Theme.colors.blue.default} !important;
  svg {
    color: #fff;
  }

  &:hover {
    background-color: ${Theme.colors.blue.dark} !important;
  }
`
