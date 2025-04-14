import { IconButton, TableCell, TableContainer } from "@mui/material";
import { Theme } from "app/shared/utils";
import styled, { css } from "styled-components";

export const StyledTableContainer = styled(TableContainer)`
  thead {
    background-color: transparent;
    th {
      padding: 10px;
      font-weight: bold;
      color: ${Theme.colors.black} !important;
    }
  }

  td {
      padding: 10px;
      color: ${Theme.colors.black} !important;
    }

  tbody {
    font-size: 14px;
  }
`;

const cellHoverStyle = css`
  &:hover {
    background-color: ${Theme.colors.gray.default};
  }
`;

export const TableCellHover = styled(TableCell)`
  ${(props) => props.hasHover && cellHoverStyle}
`;

export const TableActionButton = styled(IconButton)`
  width: 35px;
  height: 35px;
  background-color: ${Theme.colors.blue.default} !important;
  svg {
    color: #fff;
  }

  &:hover {
    background-color: ${Theme.colors.blue.dark} !important;
  }
`
