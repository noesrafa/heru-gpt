import styled from "styled-components";
import HeruLogo from "../assets/heru.svg";
import ManIcon from "../assets/man.svg";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { StyledButton, Subtitle, TermsText, Title } from "./GlobalStyles";

export default function HomePage() {
  let navigate = useNavigate();

  return (
    <Layout color={"var(--blue-100)"}>
      <img src={HeruLogo} alt="heru" style={{ margin: "20px 0 12px 0" }} />
      <img src={ManIcon} alt="heru" style={{width: "200px"}}/>
      <Title style={{marginTop: "12px"}}>Heru me ayuda a presentar mis impuestos muy fácil</Title>
      <Subtitle>
        En 5 minutos con conocimientos mínimos de impuestos y del SAT.
      </Subtitle>
      <StyledButton onClick={() => navigate("/introduction")}>
        Empezar
      </StyledButton>
      <TermsText>
        Si continuas usando la aplicación aceptas nuestros{" "}
        <span>Términos y condiciones.</span>
      </TermsText>
    </Layout>
  );
}


