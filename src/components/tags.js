import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Tags({ posts, activeTags, setActiveTags }) {
  // Here im getting the data from the response
  const [tags, setTags] = useState([]);

  /* useEffect is responsible for creating
   * an array of all unique tags (i.e. no duplicates)
   * its later used for mapping over and rendering buttons
   * the benefit of this method makes sure that no matter
   * how many new tags come in the future it would automatically
   * adjust to the layout.
   *
   * Regarding the Set constructor, sets are a datatype that can only
   * have one of the same, similar to objects which can only have unique key names
   */
  useEffect(() => {
    const uniqueTags = [...new Set(posts.flatMap((post) => post.tags))];
    setTags(Array.from(uniqueTags));
  }, [posts]);

  /* tagUpdate function:
   * This function runs onClick for the tag buttons
   * It checks if the tag is in activeTags state or not
   * if it is, it gets removed
   * if its not, it gets added
   */
  function tagUpdate(tag) {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((el) => el !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  }

  return (
    <TagContainer>
      {tags.map((tag) => {
        return (
          <button
            key={tag}
            onClick={() => tagUpdate(tag)}
            className={"tag " + (activeTags.includes(tag) && "active")}
          >
            <span className="status">
              {activeTags.includes(tag) ? "+" : "-"}
            </span>
            <span>{tag}</span>
          </button>
        );
      })}
    </TagContainer>
  );
}

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;

  .tag {
    border: var(--border);
    display: flex;
    align-items: center;
    padding: 4px 12px 4px 8px;
    border-radius: 24px;
    font-weight: bold;
    user-select: none;
    font-size: 12px;
    cursor: pointer;

    color: var(--text-gray);
    background-color: var(--foreground);

    &.active,
    &:hover {
      background-color: #122b39;
      color: var(--accent-bright);
    }

    .status {
      margin-right: 4px;
      font-size: 13px;
    }
  }
`;
