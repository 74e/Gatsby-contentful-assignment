import React, { useState } from "react";
import styled from "styled-components";
import SearchItemComponent from "./searchItem";

export default function ResultDropDownComponent({ props }) {
  const { searchValue, isFocused, filteredResult, currentIndex } = props;
  const [onModal, setOnModal] = useState(false);

  return (
    <>
      {/*
       isFocused makes the UX better by automatically hiding the search window
       when the user clicks away, ensuring an intuitive interaction.

       Here its checking that the input is focused OR the mouse is on
       the search modal window AND that searchValue is valid (i.e. no empty string).
       With this approach the search window doesn't dissapear when trying to click on
       one of the search results after the input gets unfocused.
      */}
      {(isFocused || onModal) && searchValue && (
        <ResultDropDown
          // mouseEnter and mouseLeave event listeners that set onModal to
          // true when mouse over and false when its off
          onMouseEnter={() => setOnModal(true)}
          onMouseLeave={() => setOnModal(false)}
        >
          <div className="result-header">
            <span>Result(s)</span>
          </div>
          <div className="result-container">
            {/* Rendering search results, searchItem takes care of the displaying
            sending in onModal and index is to change the styles for the first search result
            to give the indication of "selected" */}
            {filteredResult.map((result, index) => {
              return (
                <SearchItemComponent
                  key={result.id}
                  props={{ result, onModal, index, currentIndex }}
                />
              );
            })}

            {/* If there are no search results then display a message */}
            {filteredResult.length === 0 && (
              <span className="no-matches">No matching search term</span>
            )}
          </div>
        </ResultDropDown>
      )}
    </>
  );
}

const ResultDropDown = styled.div`
  position: fixed;
  left: 50%;
  top: 94px;
  transform: translateX(-50%);

  min-width: 425px;
  min-height: 125px;

  background-color: var(--header-foreground);
  border-radius: var(--border-radius);
  border: var(--border);
  box-shadow: var(--box-shadow-high);
  backdrop-filter: blur(35px);

  color: var(--text-gray-highlight);
  padding: 8px;

  @media (max-width: 480px) {
    min-width: 325px;
  }

  .no-matches {
    text-align: center;
    line-height: 60px;
  }

  .result-header {
    border-bottom: 2px solid var(--accent-color);
    padding: 0 8px 4px 8px;
    font-size: 22px;
    color: var(--text-gray-highlight);

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  .result-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 8px;
  }
`;
