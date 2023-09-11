import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/watchbox1.png";
import iconlogo from "../../assets/logoicon.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [storage, setStorage] = useState(null);

  // console.log("check", array);

  const existingUserDetails =
    JSON.parse(localStorage.getItem("userDetails")) || [];

  useEffect(() => {
    setStorage(existingUserDetails);
  }, [existingUserDetails]);

  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
    setTimeout(() => {
      setShowSearch(false);
    }, 5000);
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  const onProfileClick = () => {
    navigate("/log-in");
  };

  const directToMyProfile = () => {
    navigate("/my-profile");
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo " onClick={() => navigate("/")}>
          <img src={iconlogo} />
          <img src={logo} />
        </div>
        <ul className="menuItems">
          <button
            class="Btn"
            onClick={() => {
              navigate("/subscription");
            }}
          ></button>
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("movie");
            }}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("tv");
            }}
          >
            TV Shows
          </li>

          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
          <li className="menuItem">
            {storage?.data?.name ||
            status?.data?.name ||
            storage?.data?.user?.name ||
            status?.data?.user?.name ? (
              <Avatar
                name={
                  storage?.data?.name ||
                  status?.data?.name ||
                  status?.data?.user?.name ||
                  storage?.data?.user?.name
                }
                size="40"
                round={true}
                className="profileImg"
                onClick={directToMyProfile}
              />
            ) : (
              <FaUser onClick={onProfileClick} />
            )}
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {storage?.data?.name ||
          status?.data?.name ||
          storage?.data?.user?.name ||
          status?.data?.user?.name ? (
            <Avatar
              name={
                storage?.data?.name ||
                status?.data?.name ||
                status?.data?.user?.name ||
                storage?.data?.user?.name
              }
              size="25"
              round={true}
              className="profileImg"
              onClick={directToMyProfile}
            />
          ) : (
            <FaUser onClick={onProfileClick} />
          )}
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
