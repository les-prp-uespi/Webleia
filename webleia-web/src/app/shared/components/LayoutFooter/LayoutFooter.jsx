import { FooterContainer } from "./styles";
import packageInfo from "../../../../../package.json";

const VERSAO_WEB = packageInfo.version;
const LayoutFooter = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <FooterContainer>
      <small>Copyright &copy; {currentYear} UESPI | Powered by UESPI</small>

      <small
        style={{
          position: "absolute",
          left: 10
        }}
      >
        Versão {VERSAO_WEB}
      </small>
    </FooterContainer>
  );
};

export default LayoutFooter;
