import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../components/icons/searchIcon";
import MenuItemsComponent from "./menuItems";
import MenuIcon from "../components/icons/menuIcon";
import { Link } from "gatsby";
import SearchComponent from "../components/search.js";

export default function HeaderComponent() {
  // this state is used for showing and hiding the
  // dropdown menu when clicking on search and menu icon
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Link to="/">
            <Logo>
              <span>Portfolio</span>
            </Logo>
          </Link>

          <MenuItemsComponent menuId={"desktop"} />

          {/* A styled component button which has an onclick
          that reverses the boolean value */}
          <ShowDropdownButton
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <SearchIcon />
            <MenuIcon />
          </ShowDropdownButton>
        </HeaderContent>

        {/* DropDownMenu styled div is overflow hidden with a height of 0px
          when the showdropdown value is true it sets the height to auto, making
          the div expand and show the menu or searchbar */}
        <DropDownMenu style={showDropdown ? { height: "auto" } : null}>
          <SearchComponent />
          <MenuItemsComponent menuId={"mobile"} />
        </DropDownMenu>
      </HeaderContainer>
      <Spacer />
    </>
  );
}

const HeaderContainer = styled.div`
  width: calc(100% - 50px);
  max-width: 980px;
  position: fixed;
  z-index: 2;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);

  background-color: var(--header-foreground);
  border-radius: var(--border-radius);
  border: var(--border);
  box-shadow: var(--box-shadow-close);
  backdrop-filter: blur(35px);

  @media (max-width: 600px) {
    width: calc(100% - 24px);
    top: 12px;
  }

  a {
    text-decoration: none;
  }
`;

const ShowDropdownButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: auto;

  .menu {
    display: none;
  }

  @media (max-width: 750px) {
    .menu {
      display: block;
    }

    .search {
      display: none;
    }
  }

  svg {
    width: 22px;
    filter: invert(46%);
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      filter: invert(96%);
    }
  }
`;

const HeaderContent = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  color: var(--accent-bright);
  font-size: 34px;
  margin-right: 24px;

  span {
    line-height: 30px;
    letter-spacing: 0em;
    display: block;
    margin-bottom: 4px;
  }
`;

const DropDownMenu = styled.div`
  height: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.5s ease;

  .mobile {
    padding-bottom: 12px;
  }
`;

const Spacer = styled.div`
  height: 108px;

  @media (max-width: 600px) {
    height: 80px;
  }
`;
