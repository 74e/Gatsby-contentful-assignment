import React from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import SEOHeaderComponent from "../components/SEOHeader";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

/*
 * This component is mostly just a repeat of the other structure and logic
 * So I find no need to comments here
 */

export default function Contact({ data }) {
  const { name, phoneNumber, email, githubLink, linkedinLink } =
    data.contentfulContactPage;
  const image = getImage(data.contentfulContactPage.photo);

  return (
    <Layout>
      <SEOHeaderComponent
        title={"Contact"}
        description={`Get in touch with me for inquiries, collaborations,
         or a friendly conversation. I'm open to discussing projects and hearing your thoughts.`}
      />

      <ContentContainer>
        <div className="content">
          <LeftSection>
            <div className="image-container">
              <GatsbyImage image={image} alt="profile" />
            </div>

            <span>{name}</span>
          </LeftSection>
          <RightSection>
            <h2>My Contact Info</h2>

            <div className="entries">
              <span>Email: {email}</span>
              <span>Phone number: {phoneNumber}</span>
              <span>
                Github:{" "}
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  {githubLink}
                </a>
              </span>
              <span>
                Linkedin:{" "}
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </span>
            </div>
          </RightSection>
        </div>
      </ContentContainer>
    </Layout>
  );
}
export const query = graphql`
  query {
    contentfulContactPage {
      name
      email
      phoneNumber
      githubLink
      linkedinLink
      photo {
        gatsbyImageData(width: 120, placeholder: BLURRED, formats: [AUTO, WEBP])
      }
    }
  }
`;

const ContentContainer = styled.div`
  padding: 0 24px;
  .content {
    background-color: var(--foreground);
    border-radius: var(--border-radius);
    border: var(--border);

    color: var(--text-gray);
    max-width: 980px;
    margin: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;

    @media (max-width: 655px) {
      flex-direction: column;
      height: 480px;
    }

    .image-container {
      img {
        border-radius: 300px;
        border: 5px solid #e17e97;
        filter: hue-rotate(3.142rad);
      }
    }
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 34px;
  border-right: 2px solid var(--accent-color);

  span {
    margin-top: 8px;
    font-size: 18px;
    color: var(--text-gray-highlight);
  }

  @media (max-width: 655px) {
    border-right: none;
    border-bottom: 2px solid var(--accent-color);
  }
`;

const RightSection = styled.div`
  padding: 8px 34px;
  h2 {
    margin-bottom: 8px;
  }

  .entries {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    gap: 4px;

    span {
      display: block;
    }

    a {
      text-decoration: none;
      color: var(--accent-color);
    }

    @media (max-width: 655px) {
      font-size: 17px;
    }
  }
`;
