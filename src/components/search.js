import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, navigate } from "gatsby";
import ResultDropDownComponent from "./resultDropDown";

export default function SearchComponent() {
  const [data, setData] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * useStaticQuery is used here because this isn't a page react component.
   * Incase of none page components queries the data will be fetched through useStaticQuery
   *
   * As for the query itself there is nothing out of the ordinary expect the image size
   */
  const queryData = useStaticQuery(graphql`
    query {
      allContentfulPortfolioContent {
        nodes {
          id
          title
          assignmentType
          image {
            gatsbyImageData(
              width: 65
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
          category {
            categories
          }
        }
      }
    }
  `);

  useEffect(() => {
    /* In this useEffect I update the data useState with the contentful query
     * but before adding it to the useState I modify the object, adding an additional
     * key "keyWords". It condenses all the searching terms to one string making it
     * easier to filter through in the next step.
     */
    const rawData = queryData.allContentfulPortfolioContent.nodes;
    const alteredData = rawData.map((node) => {
      return {
        ...node,
        keyWords: `${node.title} ${
          node.assignmentType
        } ${node.category.categories.join(" ")}`,
      };
    });

    setData(alteredData);
  }, [queryData]);

  useEffect(() => {
    // Reset currentIndex everytime searchValue changes
    setCurrentIndex(0);

    // Here im checking that the searchValue isn't an empty string
    if (searchValue) {
      // Using filter array method onthe useState data
      // the condition for the filter is if any searchValue string matches
      // matches any substring in the keyWords. Key words being one long string
      // of all the relevent data one would search for
      const filteredData = data.filter((node) =>
        node.keyWords.toLowerCase().includes(searchValue.toLowerCase())
      );

      setFilteredResult(filteredData);
    } else {
      // set results to empty array since theres nothing in the input
      setFilteredResult([]);
    }
  }, [searchValue, data]);

  // handleControlOptions fires off on every key press or when the search button is clicked
  // if said key is enter or button clicked it'll try to redirect to the first search result
  // if the button is arrow up or arrow down it'll increase or decrease currentIndex
  // which will change current selected post.
  function handleControlOptions(e) {
    if (e.key === "Enter" || e.type === "click") {
      if (filteredResult.length === 0) return;
      // Navigating to the current selected post
      navigate(`/post/${filteredResult[currentIndex].id}`);
    }

    if (e.key === "ArrowUp") {
      // Using Math.max so the value cant be lower than 0
      setCurrentIndex(Math.max(currentIndex - 1, 0));
    }

    if (e.key === "ArrowDown") {
      // Using Math.min so the value cant be higher than the amount of results
      setCurrentIndex(Math.min(currentIndex + 1, filteredResult.length - 1));
    }
  }

  return (
    <SearchContainer>
      <input
        type="text"
        value={searchValue}
        // onFocus and onBlur event listeners that set isFocused to true when focused
        // and false when its not focused
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => handleControlOptions(e)}
      />
      <button onClick={(e) => handleControlOptions(e)}>Search</button>

      <ResultDropDownComponent
        props={{ isFocused, searchValue, filteredResult, currentIndex }}
      />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
  margin-bottom: 12px;
  input {
    background-color: var(--background);
    border: var(--border);
    border-radius: 7px;
    color: var(--text-white);
    font-size: 16px;
    padding: 4px 16px;

    &:focus {
      outline: none;
    }
  }

  button {
    margin-left: 8px;
    border: var(--border);
    display: flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 7px;
    font-weight: bold;
    user-select: none;
    font-size: 12px;

    color: var(--text-gray);
    background-color: var(--foreground);

    &:hover {
      background-color: #122b39;
      color: var(--accent-bright);
    }
  }
`;
