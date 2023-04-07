import styled from "styled-components";

const Title = styled.h1`
  color: var(--blue-600);
  font-size: 18px;
  font-weight: 700;
  max-width: 280px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: ${(props) =>
    props.secondary ? "var(--gray-200)" : "var(--blue-600)"};
  font-size: 15px;
  font-weight: 400;
  max-width: 280px;
  text-align: center;
  line-height: 1.4;
`;

const TermsText = styled.p`
  color: var(--gray-200);
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  max-width: 320px;
  text-align: center;
  span {
    text-decoration: underline;
  }
`;

const StyledButton = styled.div`
  background-color: var(--blue-300);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  width: 320px;
  text-align: center;
  border-radius: 8px;
  padding: 13px 0;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    transform: translateY(-2px);
  }
`;

const SecondaryStyledButton = styled.div`
    margin-top: 12px;
  background-color: var(--blue-100);
  color: var(--blue-300);
  font-size: 15px;
  font-weight: 500;
  width: 320px;
  text-align: center;
  border-radius: 8px;
  padding: 13px 0;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    transform: translateY(-2px);
  }
`;

export { Title, Subtitle, TermsText, StyledButton, SecondaryStyledButton };
