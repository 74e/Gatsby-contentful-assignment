import React from "react";
import "./layout.css";
import HeaderComponent from "./header";
import FooterComponent from "./footer";
import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <>
      <HeaderComponent />
      <Main>{children}</Main>
      <FooterComponent />
    </>
  );
}

const Main = styled.div`
  min-height: calc(100vh - 100px);
`;
