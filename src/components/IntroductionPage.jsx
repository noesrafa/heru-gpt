import ProgressBar from "./progressBar";
import FolderIcon from "../assets/folder.svg";
import NextIcon from "../assets/next-arrow.svg";
import BackIcon from "../assets/back-arrow.svg";
import Layout from "./Layout";
import {
  SecondaryStyledButton,
  StyledButton,
  Subtitle,
  TermsText,
  Title,
} from "./GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import GeneratePrompt from "../utils/prompts";
import ResultPage from "./ResultPage";

export default function IntroductionPage() {
  let navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    work: "",
    incomes: "",
  });
  const [result, setResult] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setResult("");
    setLoading(true);

    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_OPENAI_API_KEY,
      },
      body: JSON.stringify({
        prompt: GeneratePrompt(
          formValues.name,
          formValues.work,
          formValues.incomes
        ),
        temperature: 0.2,
        n: 1,
        model: "text-davinci-003",
        max_tokens: 1500,
      }),
    })
      .then((response) => response.json())
      .then((data) => dataHandler(data))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  function dataHandler(data) {
    if (data.choices.length > 0) {
      setResult(data);
      setLoading(false);
      setStep(4);
    }
  }

  return (
    <Layout>
      <Container className="form">
        {step !== 4 && (
          <ProgressBar
            progress={
              (step === 0 && 15) ||
              (step === 1 && 30) ||
              (step === 2 && 60) ||
              (step === 3 && 90)
            }
          />
        )}
        {step === 0 && (
          <>
            <img src={FolderIcon} alt="heru" />
            <Title>Sobre tus impuestos</Title>
            <Subtitle secondary>
              Heru utiliza la información que le proporcionas para sugerirte un
              plan que presente tus impuestos de la manera que más te beneficie.
            </Subtitle>
            <Subtitle secondary>
              Las características principales de Heru no pueden funcionar sin
              estos datos. Sino estás de acuerdo no podrás utilizar la
              aplicación.
            </Subtitle>
            <Subtitle secondary>
              Importante: el plan es solo una aproximación, es necesario que
              cuentes con tu RFC y contraseña del SAT.
            </Subtitle>
            <div className="buttons">
              <StyledButton onClick={() => setStep(1)}>
                Bien, empezemos
              </StyledButton>
              <SecondaryStyledButton>
                No cuento con RFC / Contraseña del SAT
              </SecondaryStyledButton>
            </div>
            <TermsText>
              Al pulsar ‘Bien, empezemos’, usted acepta el tratamiento de sus
              datos fiscales. Para más información, consulte nuestra{" "}
              <span>Política de Privacidad.</span>
            </TermsText>
          </>
        )}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <QuestionTitle>¿Cuál es tu nombre?</QuestionTitle>
              <StyledInput
                rows="20"
                cols="60"
                value={formValues.name}
                onChange={handleInputChange}
                type="text"
                name="name"
                placeholder="Escribe tu nombre y apellidos"
                onKeyDown={(event) => event.key === "Enter" && setStep(2)}
              />
              <ButtonBack>
                <img src={BackIcon} alt="heru" onClick={() => setStep(0)} />
              </ButtonBack>
              <Button>
                <img src={NextIcon} alt="heru" onClick={() => setStep(2)} />
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <QuestionTitle>¿A que te dedicas?</QuestionTitle>
              <ExampleText>
                Por ejemplo: Trabajo como empleado en una empresa de Seguros y
                también trabajo como freelance para clientes de varios países.
              </ExampleText>
              <StyledInput
                rows="20"
                cols="60"
                value={formValues.work}
                onChange={handleInputChange}
                type="text"
                name="work"
                placeholder="Trabajo como..."
                onKeyDown={(event) => event.key === "Enter" && setStep(3)}
              />
              <ButtonBack>
                <img src={BackIcon} alt="heru" onClick={() => setStep(1)} />
              </ButtonBack>
              <Button>
                <img src={NextIcon} alt="heru" onClick={() => setStep(3)} />
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <QuestionTitle>
                ¿Cuales son tus ingresos aproximados?
              </QuestionTitle>
              <ExampleText>
                Por ejemplo: Gano 7,000 al mes en la empresa de seguros y unos
                4,000 al mes con mis trabajos de freelance.
              </ExampleText>
              <StyledInput
                rows="20"
                cols="60"
                value={formValues.incomes}
                onChange={handleInputChange}
                type="text"
                name="incomes"
                placeholder="Gano ..."
              />

              <ButtonBack>
                <img src={BackIcon} alt="heru" onClick={() => setStep(2)} />
              </ButtonBack>
              <button type="submit">
                <Button>
                  { loading ? (
                    <>
                      <div class="jelly-triangle">
                        <div class="jelly-triangle__dot"></div>
                        <div class="jelly-triangle__traveler"></div>
                      </div>

                      <svg width="0" height="0" class="jelly-maker">
                        <defs>
                          <filter id="uib-jelly-triangle-ooze">
                            <feGaussianBlur
                              in="SourceGraphic"
                              stdDeviation="7.3"
                              result="blur"
                            />
                            <feColorMatrix
                              in="blur"
                              mode="matrix"
                              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                              result="ooze"
                            />
                            <feBlend in="SourceGraphic" in2="ooze" />
                          </filter>
                        </defs>
                      </svg>
                    </>
                  ) : (
                    <img src={NextIcon} alt="heru" />
                  )}
                </Button>
              </button>
            </>
          )}
        </form>
        {step === 4 && (
          <>
            {/* <ExampleText>{result && result?.choices[0]?.text}</ExampleText>
            <ButtonBack>
              <img src={BackIcon} alt="heru" onClick={() => setStep(3)} />
            </ButtonBack> */}
            <ResultPage result={result} setStep={setStep}/>
          </>
        )}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  /* position: relative;
  height: 100vh; */
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

const QuestionTitle = styled.h2`
  width: 320px;
  font-size: 28px;
  font-weight: 500;
  color: var(--blue-600);
`;

const StyledInput = styled.textarea`
  border: none;
  outline: none;
  background-color: #fff;
  width: 320px;
  font-size: 18px;
  color: var(--blue-600);
  font-weight: 300;
  margin-top: 32px;
`;

const Button = styled.div`
  cursor: pointer;
  position: absolute;
  right: 8px;
  bottom: 8px;
  img {
    transition: 250ms;
  }
  img:hover {
    transform: scale(0.96);
  }
`;

const ButtonBack = styled.div`
  cursor: pointer;
  position: absolute;
  left: 8px;
  bottom: 8px;
  img {
    transition: 250ms;
  }
  img:hover {
    transform: scale(0.96);
  }
`;

const ExampleText = styled.p`
  font-size: 14px;
  color: var(--blue-600);
  background-color: var(--blue-100);
  padding: 10px 16px;
  border-radius: 8px;
  margin-top: 16px;
  max-width: 330px;
  width: 100%;
`;
