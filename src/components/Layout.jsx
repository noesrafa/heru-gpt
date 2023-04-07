import styled from "styled-components";

export default function Layout({ color = "#fff", children }) {
  return (
    <Container color={color}>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.color};
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
`;
