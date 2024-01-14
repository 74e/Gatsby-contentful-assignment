import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function SearchItemComponent({ props }) {
  const { result, onModal, index, currentIndex } = props;
  const image = getImage(result.thumbnail);

  return (
    <Link to={"/post/" + result.fullPostContent.id}>
      {/* here is the highlighting donem if currentindex matches the index of the item it
      gets highlighted. If the mouse is on the modal however it goes away so the mouse
      can do the highlighting  */}
      <Item
        className={index === currentIndex && !onModal ? "current-index" : null}
      >
        <div className="image-container">
          <GatsbyImage image={image} alt="project" />
        </div>
        <div className="info-container">
          <span className="title">{result.title}</span>
          <span className="assignment-type">{result.assignmentType}</span>
        </div>
      </Item>
    </Link>
  );
}

const Item = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 8px;
  transition: all 0.5s;
  border-radius: var(--border-radius);
  border: var(--border);
  min-height: 70px;

  @media (max-width: 480px) {
    padding: 4px;
  }

  .image-container {
    img {
      border-radius: 5px;
      border: var(--border);
    }
  }

  .info-container {
    padding-left: 16px;

    span {
      display: block;
      transition: all 0.5s;
    }

    .title {
      color: var(--text-gray-highlight);
    }

    .assignment-type {
      color: var(--text-gray);
      font-size: 14px;
    }
  }

  &.current-index {
    transition: all 0.1s;
    border-color: var(--accent-color);

    .info-container {
      .title {
        color: var(--text-white);
      }

      .assignment-type {
        color: var(--text-gray-highlight);
      }
    }
  }

  &:hover {
    border-color: var(--accent-color);

    .info-container {
      .title {
        color: var(--text-white);
      }

      .assignment-type {
        color: var(--text-gray-highlight);
      }
    }
  }
`;
