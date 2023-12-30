import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import SEOHeaderComponent from "../components/SEOHeader";

export default function About({ data }) {
  // Getting the data from query
  const rawData = data.allContentfulAboutPage.nodes[0];
  const title = rawData.title;
  const profileImg = getImage(rawData.profileImage);
  // Getting markdown content from query
  const content = rawData.content.childMarkdownRemark.rawMarkdownBody;

  return (
    <Layout>
      <SEOHeaderComponent
        title={"About me"}
        description={`Discover more about me, my background, and my interest in frontend development.
        Explore my skills and experiences that contribute to my approach in creating digital solutions.`}
      />
      <ContentContainer>
        <div className="content">
          <div className="image-container">
            {/* GatsbyImage for corrent displaying and optimazation */}
            <GatsbyImage image={profileImg} alt="profile" />
          </div>

          <h1>{title}</h1>
          {/* ReactMarkdown is react library to convert markdon into html */}
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </ContentContainer>
    </Layout>
  );
}

/* Here I'm doing a query to AboutPage entries
 * the content is a set as markdown in contentful
 * so to extract the data I used childMarkdownRemark
 * and then I got the rawMarkdownBody.
 *
 * For the image I chose to go with 300 width due to it
 * only being a profile picture which wont take up much space
 */
export const query = graphql`
  query {
    allContentfulAboutPage {
      nodes {
        title
        content {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        profileImage {
          gatsbyImageData(
            width: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  }
`;

// Styled components start here --------------
const ContentContainer = styled.div`
  padding: 0 24px;
  .content {
    background-color: var(--foreground);
    border-radius: var(--border-radius);
    border: var(--border);
    padding: 20px;
    color: var(--text-gray);
    max-width: 980px;
    margin: auto;

    h1,
    h2 {
      margin-bottom: 8px;
      color: var(--text-gray-bright);
    }

    p {
      margin-bottom: 24px;
      font-size: 16px;
    }

    .image-container {
      float: right;
      margin-left: 16px;

      img {
        height: 280px;
        aspect-ratio: 1;
        border-radius: 300px;
        border: 5px solid #e17e97;
        filter: hue-rotate(3.142rad);
      }

      @media (max-width: 750px) {
        margin: auto;
        float: none;
        width: fit-content;

        img {
          height: 200px;
        }
      }
    }
  }
`;
// Styled components end here --------------
