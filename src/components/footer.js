import React from "react";
import styled from "styled-components";
import GithubIcon from "./icons/githubIcon";

export default function FooterComponent() {
  return (
    <FooterContainer>
      <div className="footer-content">
        <GithubIcon />
        <span>
          Github:{" "}
          <a href="https://github.com/74e" rel="noreferrer" target="_blank">
            https://github.com/74e
          </a>
        </span>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  margin-top: 30px;
  background-color: var(--background-dark);
  border-top: 2px solid var(--border-color);
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;

  .footer-content {
    color: var(--text-gray);
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      color: var(--accent-color);
      text-decoration: none;
    }

    .github {
      filter: invert(46%);
      width: 40px;
      height: 35px;
    }
  }
`;
