import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// post is a normal react prop, however the data is from the parant components query
export default function PostComponent({ post }) {
  // Here I'm using getImage helper function from gatsyby
  // It gets the image from the nested object
  const image = getImage(post.thumbnail);

  return (
    <PostContainer>
      {/* Here I am linking to the indiviual post, I am using the ID from
       the referenced fullContentPost */}
      <Link className="post-link" to={"/post/" + post.fullPostContent.id}>
        <PostTopBar>
          <PostTitle>{post.title}</PostTitle>
          <PostDate>{post.date}</PostDate>
        </PostTopBar>

        <ImageContainer>
          <GatsbyImage image={image} alt={post.title} />
        </ImageContainer>
      </Link>

      <InfoContainer>
        <h4>{post.assignmentType}</h4>
        <p>{post.shortDescription}</p>
        <a
          href={post.linkToPortfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          Go to project
        </a>{" "}
        |{" "}
        <Link className="project-link" to={"/post/" + post.fullPostContent.id}>
          Go to post
        </Link>
        <TagContainer>
          {/* Here I'm just looping through all the tags from the reference */}
          {post.category.categories.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </TagContainer>
      </InfoContainer>
    </PostContainer>
  );
}

// Styled components start here --------------
const PostContainer = styled.div`
  background-color: var(--foreground);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-low);
  border: var(--border);

  display: flex;
  flex-direction: column;
  color: var(--text-gray);
  transition: all 0.5s ease;

  max-width: 500px;
  margin: auto;

  @media (max-width: 830px) {
    width: 100%;
  }

  .post-link {
    text-decoration: none;
    font-family: inherit;
    color: inherit;
  }

  &:hover {
    border: 1.5px solid rgba(76, 252, 208, 0.45);

    h3 {
      color: var(--accent-bright);
    }

    h4 {
      color: var(--text-white);
    }

    p {
      color: var(--text-gray-highlight);
    }

    .project-link {
      color: var(--accent-bright);
    }
  }
`;

const PostTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
`;

const PostTitle = styled.h3`
  color: inherit;
  transition: all 0.5s ease;
`;

const PostDate = styled.span`
  display: block;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: var(--border-radius);
  width: calc(100% - 16px);
  margin: auto;
`;

const InfoContainer = styled.div`
  padding: 8px 14px;
  color: inherit;

  h4 {
    transition: all 0.5s ease;
  }

  p {
    transition: all 0.5s ease;
    line-height: 16px;
    margin: 4px 0 12px 0;
    font-size: 15px;
  }

  .project-link {
    transition: all 0.5s ease;
    text-decoration: none;
    color: inherit;
  }
`;

const TagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 16px;
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
