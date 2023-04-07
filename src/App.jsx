import styled from "styled-components"
import HomePage from "./components/HomePage"
import { Route, Routes } from "react-router-dom"
import IntroductionPage from "./components/IntroductionPage"


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/introduction" element={<IntroductionPage/>} />
    </Routes>
  )
}

export default App

const Container = styled.div `
`