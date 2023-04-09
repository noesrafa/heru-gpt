import styled from "styled-components";

export default function ProgressBar({ progress = 30 }) {
  return (
    <Container >
      <Progress className="progress" progress={progress}/>
    </Container>
  );
}

const Container = styled.div`
  width: 150px;
  height: 4px;
  background-color: var(--blue-100);
  position: relative;
  border-radius: 10px;
  margin: 32px auto 12px auto;
`;

const Progress = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: var(--blue-300);
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  transition: 700ms;
`;
