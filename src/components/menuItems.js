import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

export default function MenuItemsComponent({ menuId }) {
  // These are the menu items that are in the header
  // I chose to put them into an array which I can then loop over
  // const links = [
  //   { endpoint: "/", name: "Home" },
  //   { endpoint: "/portfolio", name: "Portfolio" },
  //   { endpoint: "/about", name: "About" },
  //   { endpoint: "/contact", name: "Contact" },
  // ];

  const queryData = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          menuLinks {
            endpoint
            name
          }
        }
      }
    }
  `);

  const links = queryData.site.siteMetadata.menuLinks;

  return (
    <Menu className={menuId || ""}>
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            to={link.endpoint}
            // activeStyle means current active page
            activeStyle={{
              color: "white",
            }}
          >
            {link.name}
          </Link>
        );
      })}
    </Menu>
  );
}

const Menu = styled.div`
  color: var(--text-gray);
  display: flex;
  gap: 16px;
  font-size: 20px;

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.5s ease;

    &:hover {
      color: var(--text-white);
    }
  }

  &.desktop {
    @media (max-width: 750px) {
      display: none;
    }
  }

  &.mobile {
    @media (min-width: 750px) {
      display: none;
    }

    @media (max-width: 600px) {
      font-size: 18px;
    }
  }
`;
