import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SEOHeader from "../components/SEOHeader";

export default function PortfolioPost({ data }) {
  // Since it's a simple element, I can destructure
  // any keys I want from the Contentful object.
  const { title, date, assignmentType, postContent, category } =
    data.contentfulPortfolioContent;
  // Here im using getImage gatsby helper functiona gain to get image
  const image = getImage(data.contentfulPortfolioContent.image);

  return (
    <Layout>
      <SEOHeader
        title={`${title} Project`}
        description={`Explore the details of the ${title} project,
        including technologies used and key insights.`}
      />
      <Main>
        <PostContainer>
          <PostTopBar>
            <PostTitle>{title}</PostTitle>
            <PostDate>{date}</PostDate>
          </PostTopBar>

          <ImageContainer>
            <GatsbyImage image={image} alt={title} />
          </ImageContainer>

          <InfoContainer>
            <h4>{assignmentType}</h4>

            {/* I am using contentful long text here, I didnt like the
            default formatting so I split the paragraphs on the
            new lines and envelopmed them into p tags to make styling easier */}
            {postContent.postContent.split("\n").map((paragraph, i) => {
              return <p key={i}>{paragraph}</p>;
            })}

            <p>Some technologies and tools used:</p>
            <TagContainer>
              {category.categories.map((tag) => {
                return <li key={tag}>{tag}</li>;
              })}
            </TagContainer>
          </InfoContainer>
        </PostContainer>
      </Main>
    </Layout>
  );
}

/* Here I'm getting the single post from the ID
 * that the page link was made with.
 * contentfulPortfolioContent(id: { eq: $postId }) queries for
 * an entry with a specific ID
 */
export const query = graphql`
  query ($postId: String!) {
    contentfulPortfolioContent(id: { eq: $postId }) {
      title
      assignmentType
      postContent {
        postContent
      }
      date
      image {
        gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP])
      }
      category {
        categories
      }
    }
  }
`;

// Styled components start here --------------
const Main = styled.div`
  padding: 10px 26px;
`;

const PostContainer = styled.div`
  background-color: var(--foreground);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-low);
  border: var(--border);

  display: flex;
  flex-direction: column;
  color: var(--text-gray);
  padding: 0px 16px 16px 16px;
  max-width: 900px;
  margin: auto;

  @media (max-width: 830px) {
    width: 100%;
  }
`;

const PostTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
`;

const PostTitle = styled.h3`
  color: var(--accent-bright);
`;

const PostDate = styled.span`
  display: block;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: var(--border-radius);
  margin: auto;
`;

const InfoContainer = styled.div`
  padding: 8px 14px;
  color: inherit;

  h4 {
    color: var(--text-white);
    margin-bottom: 16px;
  }

  p {
    line-height: 16px;
    margin: 4px 0 16px 0;
    font-size: 15px;
    color: var(--text-gray-highlight);
  }
`;

const TagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;

  li {
    list-style: none;
    background-color: #122b39;
    display: block;
    width: fit-content;
    padding: 6px 12px;
    border: var(--border);
    border-radius: 24px;
    color: var(--accent-bright);
    font-size: 12px;
    font-weight: bold;
  }
`;
// Styled components end here --------------
