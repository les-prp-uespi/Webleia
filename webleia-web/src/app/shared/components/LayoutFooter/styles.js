import { Theme } from "app/shared/utils";
import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${Theme.colors.gray.ligth};
`;
