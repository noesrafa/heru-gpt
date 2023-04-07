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

export default function IntroductionPage() {
  let navigate = useNavigate();

  const [step, setStep] = useState(0);

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
    console.log(formValues.name, formValues.work, formValues.incomes);

    try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ animal: formValues.name }),
        });
  
        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
  
        setResult(data.result);
        setAnimalInput("");
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }

      console.log(result)
  };




  const [loading, setLoading] = useState(false);
  let [obj, setObj] = useState({ choices: [] });
  const [payload, setPayLoad] = useState({
    prompt: "Como va la vida?",

    temperature: 0.5,
    n: 1,
    model: "text-davinci-003"
  });

  const getRes = (event) => {
    
    event.preventDefault();
    setLoading(true);
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
  };

  const responseHandler = (res) => {
    if (res.status === 200) {
      setObj(res.data);
      setLoading(false);
    }
  };

  {
    /* <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>  */
  }

  return (
    <Layout>
      <ProgressBar
        progress={
          (step === 0 && 15) ||
          (step === 1 && 30) ||
          (step === 2 && 60) ||
          (step === 3 && 90)
        }
      />
      {step === 0 && (
        <>
          <img src={FolderIcon} alt="heru" style={{ marginTop: "12px" }} />
          <Title>Sobre tus impuestos</Title>
          <Subtitle secondary>
            Heru utiliza la información que le proporcionas para sugerirte un
            plan que presente tus impuestos de la manera que más te beneficie.
          </Subtitle>
          <Subtitle secondary>
            Las características principales de Heru no pueden funcionar sin
            estos datos. Sino estás de acuerdo no podrás utilizar la aplicación.
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
              placeholder="Escribe tu nombre"
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
            <QuestionTitle>¿Cuales son tus ingresos aproximados?</QuestionTitle>
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
                <img src={NextIcon} alt="heru" />
              </Button>
            </button>

            <div className="col-6 text_wrap">
            <p>
              {loading ? (
                <span>loading...</span>
              ) : (
                obj?.choices?.map((v, i) => <div>{v.text}</div>)
              )}
            </p>
          </div>
        <div style={{ padding: "0 13px" }}>
          <button disabled={loading} onClick={getRes}>
            {loading ? "Loading... " : "Get resposne"}
          </button>
        </div>
        
          </>
        )}
      </form>
    </Layout>
  );
}

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
  right: 32px;
  bottom: 20px;
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
  left: 32px;
  bottom: 20px;
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
