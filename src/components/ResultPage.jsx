import bannerImage from "../assets/top-banner.png";
import aboutIcon from "../assets/about.svg";
import aboutBlueIcon from "../assets/outline-blue.svg";
import rightArrowIcon from "../assets/right-arrow.svg";
import checkIcon from "../assets/check.svg";
import BackIcon from "../assets/back-arrow.svg";
import styled from "styled-components";
import { Subtitle, Title } from "./GlobalStyles";
import { useEffect } from "react";
import { useState } from "react";

export default function ResultPage({ result, setStep }) {
  const [parsedResult, setParsedResult] = useState("");
  // console.log(result?.choices[0]?.text, "result");
  // console.log(JSON.parse(((result?.choices[0]?.text).replace(/\n/g, "")).match(/\{(.*)\}/)[0]));

  useEffect(() => {
    if (result?.choices.length > 0 && result?.choices[0]?.text) {
      const text = (result?.choices[0]?.text).replace(/\n/g, "");
      const regex = /\{(.*)\}/;
      const match = text.match(regex);
      if (JSON.parse(match[0].trim()).regimes?.length > 1) {
        const parsed = JSON.parse(match[0].trim());
        const joined = parsed?.regimes?.slice(0, -1).join(", ") + " y " + parsed?.regimes?.slice(-1);
        setParsedResult(joined)
        return;
      }
      
      setParsedResult((JSON.parse(match[0].trim())).regimes[0]);
    }
  }, [result]);

  // console.log(result, "result");
  // console.log(parsedResult, "parsedResult");

  // console.log(parsedResult?.regimes?.slice(0, -1).join(", ") + " y " + parsedResult?.regimes?.slice(-1));
  // console.log(parsedResult.regimes);

  return (
    <Container>
      <img src={bannerImage} alt="banner" className="banner" />
      <Title style={{ fontSize: "20px" }}>
        ¡Mantente al día y sin preocupaciones con el SAT!
      </Title>
      <CardPlan>
        <div className="items">
          <div className="item-description">Tus posibles regímenes</div>
          <div className="item-title">
            {parsedResult}
          </div>
          <div className="item-about">
            <img src={aboutIcon} alt="about" />
            ¿Por qué estos regímenes?
          </div>
          <div className="divider" />
          <div className="items">
            <div className="item-description">El plan que te recomendamos</div>
            <div className="item-title">Plan completo para 2 regímenes</div>
            <div className="item-about">
              <img src={aboutIcon} alt="about" />
              ¿Qué cubre este plan?
            </div>
          </div>
        </div>
      </CardPlan>
      <BluePlan className="blue">
        <div className="items">
          <div>
            <div className="item-title">Mantenerme sin multas</div>
            <div className="item-about">
              Presentar mis declaraciones mes a mes.
            </div>
          </div>
          <img src={aboutBlueIcon} alt="about" className="about-icon" />
        </div>
        <div className="divider" />
        <div className="items">
          <div>
            <div className="item-title">Recuperar mi posible saldo a favor</div>
            <div className="item-about">
              Recuperá el extra que diste de impuestos.
            </div>
          </div>
          <img src={aboutBlueIcon} alt="about" className="about-icon" />
        </div>
      </BluePlan>
      <div className="faqs">
        Preguntas Frecuentes
        <img src={rightArrowIcon} alt="right-arrow" />
      </div>
      <Subtitle
        secondary
        style={{ fontSize: "13px", paddingBottom: "130px", maxWidth: "350px" }}
      >
        Recuerda que necesitas acceso a tu RFC y contraseña del SAT para poder
        continuar, en caso de no contar con ellos ¡nosotros te podemos ayudar!
      </Subtitle>
      <Buttons>
        <div className="wrapper">
          <ButtonBack>
            <img src={BackIcon} alt="heru" onClick={() => setStep(3)} />
          </ButtonBack>
          <div className="next-button">
            <img src={checkIcon} alt="heru" onClick={() => setStep(3)} />
            ¡Empieza ahora!
          </div>
        </div>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin-top: -64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 100vh;
  .banner {
    width: 100%;
    max-width: 400px;
  }

  .faqs {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    color: var(--blue-600);
    margin-top: 12px;
  }
`;

const CardPlan = styled.div`
  width: 100%;
  max-width: 350px;
  border-radius: 32px;
  box-shadow: 0px 2px 13px -5px rgba(0, 0, 0, 0.25);
  border-radius: 32px;
  background-color: #ffffff;
  padding: 36px 32px;
  margin-top: 16px;

  .items {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .item-description {
    font-size: 14px;
    color: var(--gray-200);
  }

  .item-title {
    font-size: 18px;
    color: var(--blue-600);
    font-weight: 500;
  }

  .item-about {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--gray-200);
  }

  .divider {
    width: 100%;
    height: 2px;
    background-color: var(--gray-200);
    opacity: 0.1;
    margin: 16px 0;
  }
`;

const BluePlan = styled.div`
  width: 100%;
  max-width: 350px;
  border-radius: 32px;
  border-radius: 32px;
  background-color: var(--blue-100);
  padding: 36px 32px;
  margin-top: 8px;
  color: var(--blue-300);
  display: flex;
  flex-direction: column;
  gap: 8px;

  .items {
    display: flex;
    gap: 6px;
    justify-content: space-between;
  }

  .item-title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .item-about {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .about-icon {
    width: 40px;
  }

  .divider {
    width: 100%;
    height: 2px;
    background-color: var(--gray-200);
    opacity: 0.1;
    margin: 16px 0;
  }
`;

const ButtonBack = styled.div`
  cursor: pointer;
  img {
    transition: 250ms;
  }
  img:hover {
    transform: scale(0.96);
  }
`;

const Buttons = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #ebedef;

  .wrapper {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 12px 0;
    gap: 32px;
  }

  .next-button {
    cursor: pointer;
    background-color: var(--blue-300);
    height: 70px;
    width: 100%;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #fff;
    font-weight: 400;
    font-size: 16px;
    border: 5px solid var(--blue-100);
    transition: 250ms;
    &:hover {
      transform: scale(0.96);
    }
  }
`;
