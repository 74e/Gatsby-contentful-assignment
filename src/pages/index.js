import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import backgroundImage from "../images/bg.webp";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, navigate } from "gatsby";
import SEOHeaderComponent from "../components/SEOHeader";

export default function FrontPage({ data }) {
  // Extracting data from the query
  const { greeting, occupation } = data.contentfulFrontPage;
  const image = getImage(data.contentfulFrontPage.profileImage);

  return (
    <Layout>
      <SEOHeaderComponent
        title={"Portfolio frontpage"}
        description={`Browse through a collection of my frontend projects, showcasing various web development and user interface work.
         Get insights into my skills and approach to digital experiences.`}
      />
      <MainHero>
        <HeroContent>
          {/* Using GatsbyImage component instead of img tag */}
          <GatsbyImage image={image} alt="profile" />

          <TextContainer>
            <span>{greeting}</span>
            <span>{occupation}</span>
          </TextContainer>
        </HeroContent>

        <BlurLayer />
      </MainHero>

      <HeroBottom>
        {/* Using the navigate function from gatsy I can pass in a route which gets triggered on button click */}
        <button onClick={() => navigate("/portfolio")}>Go to projects</button>
      </HeroBottom>
    </Layout>
  );
}

/*
 * This query looks for the content for Front page
 * it gets the text which is the introduction on the page
 * and then the profile image with the gatsby image plugins
 */
export const query = graphql`
  query {
    contentfulFrontPage {
      greeting
      occupation
      profileImage {
        gatsbyImageData(width: 300, placeholder: BLURRED, formats: [AUTO, WEBP])
      }
    }
  }
`;

// Styled components start here --------------
const MainHero = styled.div`
  width: calc(100% - 54px);
  max-width: 980px;
  margin: auto;
  padding: 30px 0;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  overflow: hidden;
  border: var(--border);
  box-shadow: var(--box-shadow-close);
  position: relative;
  z-index: 1;
  isolation: isolate;
  display: flex;
`;

const HeroBottom = styled(MainHero)`
  margin-top: 35px;
  height: 150px;

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

    &:hover {
      background-color: var(--accent-color);
      color: #fff;
    }
  }
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  align-items: center;
  margin: auto;

  img {
    height: 300px;
    aspect-ratio: 1;
    border-radius: 150px;
    border: 5px solid #e17e97;
    filter: hue-rotate(3.142rad);
  }

  @media (max-width: 905px) {
    flex-direction: column;

    img {
      height: 200px;
    }
  }
`;

const TextContainer = styled.div`
  color: var(--accent-color);
  font-size: 40px;
  background: rgba(15, 23, 42, 0.82);
  width: fit-content;
  height: fit-content;
  padding: 30px;
  border-radius: var(--border-radius);
  border: var(--border);
  margin: 40px 24px;
  box-shadow: var(--box-shadow-close);

  span {
    display: block;
  }

  @media (max-width: 905px) {
    font-size: 30px;
    padding: 16px;
  }

  @media (max-width: 470px) {
    font-size: 24px;
    padding: 8px;
  }
`;

const BlurLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(35px);
  z-index: -1;
`;
// Styled components end here --------------
