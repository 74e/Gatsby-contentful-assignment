import React, { useState } from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import styled from "styled-components";
import PostComponent from "../components/post";
import Tags from "../components/tags";
import SEOHeaderComponent from "../components/SEOHeader";

export default function Portfolio({ data }) {
  // Here im getting the data from the response
  const posts = data.allContentfulPortfolioPost.nodes;
  const [activeTags, setActiveTags] = useState([]);

  /* filteredPost function:
   * This will be the rendered data.
   * The data gets rendered in 2 ways
   * first is the base case with no tags select
   * which just returns the raw data posts.
   *
   * Second is the filtering by tag, if every tag returns true
   * for one post it'll get returned at the end of the loop.
   */
  function filteredPosts() {
    if (activeTags.length === 0) return posts;

    return posts.filter((post) => {
      return activeTags.every((tag) => post.category.categories.includes(tag));
    });
  }

  return (
    <Layout>
      <SEOHeaderComponent
        title={"Portfolio overview"}
        description={`Explore a collection of frontend projects showcasing my skills and
           expertise. From web development to user interfaces, discover the diverse range of projects in my portfolio.`}
      />
      <AllContentContainer>
        <AllPostsContainer>
          {filteredPosts().map((post, index) => {
            return <PostComponent key={index} post={post} />;
          })}

          {filteredPosts().length === 0 && (
            <span className="no-match">No matching projects</span>
          )}
        </AllPostsContainer>
        <FilterContainer>
          <div className="filter-header">
            {activeTags.length === 0 ? (
              <span>Filter By tags</span>
            ) : (
              <button className="clear" onClick={() => setActiveTags([])}>
                Clear tag(s)
              </button>
            )}
          </div>
          <Tags
            posts={posts}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
        </FilterContainer>
      </AllContentContainer>
    </Layout>
  );
}

// Here start my styled components
const AllContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 0 24px;

  @media (max-width: 830px) {
    flex-direction: column-reverse;
    padding: 0 24px;
  }
`;

const AllPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  min-width: 500px;

  .no-match {
    text-align: center;
    color: var(--text-gray);
    font-size: 20px;
    margin-top: 100px;
  }

  @media (max-width: 830px) {
    min-width: auto;
  }
`;

const FilterContainer = styled.div`
  width: 300px;
  padding-left: 24px;

  @media (max-width: 830px) {
    width: 100%;
    padding: 0;
  }

  .filter-header {
    background-color: var(--foreground);
    color: var(--text-white);
    text-align: center;
    border-radius: var(--border-radius);
    border: var(--border);
    padding: 16px 0;

    button {
      background-color: transparent;
      border: none;
      font-weight: bold;
      color: var(--text-white);
      font-size: inherit;
      cursor: pointer;

      &:hover {
        color: var(--accent-bright);
      }
    }
  }
`;
// Here end my styled components

/*
 * This query gets all posts which includes
 * id, title, assignmentType, shortDescription, date
 * further on I get the image with gatsbys image optimazation
 * where it restricts size and format, first is AUTO where it tries
 * to get the most fitting format and if thats not possible
 * it defaults to WEBP.
 * I am getting category from categories because category references categories.
 * Additionally im also getting the ID for the fullPostContent
 * its used for the linking of the page when clicking on a post.
 */
export const query = graphql`
  query {
    allContentfulPortfolioPost {
      nodes {
        id
        title
        assignmentType
        shortDescription
        date
        thumbnail {
          gatsbyImageData(
            width: 500
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
        category {
          categories
        }
        fullPostContent {
          id
        }
      }
    }
  }
`;
