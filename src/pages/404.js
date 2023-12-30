import * as React from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import { navigate } from "gatsby";
import SEOHeaderComponent from "../components/SEOHeader";

export default function NotFoundPage() {
  return (
    <Layout>
      <SEOHeaderComponent
        title={"404 Not Found"}
        description={`Whatever you were looking for doesn't exist.
        Let's navigate back or explore other content on the site.`}
      />

      <ContentContainer>
        <div className="content">
          <h1>404 Not Found</h1>
          <p>Whatever you were looking for doesn't exist.</p>
          <button onClick={() => navigate("/")}>Go back</button>
        </div>
      </ContentContainer>
    </Layout>
  );
}

// Styled components start here --------------
const ContentContainer = styled.div`
  padding: 0 24px;
  .content {
    background-color: var(--foreground);
    border-radius: var(--border-radius);
    border: var(--border);
    padding: 20px;
    color: var(--text-gray);
    max-width: 500px;
    margin: auto;

    p {
      margin-bottom: 24px;
      font-size: 16px;
    }

    button {
      padding: 20px 100px;
      font-size: 16px;
      font-family: inherit;
      font-weight: bold;
      text-decoration: none;
      border: 2px solid var(--accent-color);
      color: var(--accent-color);
      background-color: transparent;
      border-radius: var(--border-radius);
      transition: background-color 0.3s, color 0.3s;
      margin: auto;
      display: block;

      &:hover {
        background-color: var(--accent-color);
        color: #fff;
      }
    }
  }
`;
// Styled components end here --------------
