import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => {
              navigate("/privacy-terms");
            }}
          >
            Terms Of Use
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigate("/privacy-terms");
            }}
          >
            Privacy-Policy
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigate("/privacy-terms");
            }}
          >
            About
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigate("/privacy-terms");
            }}
          >
            Blog
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigate("/privacy-terms");
            }}
          >
            FAQ
          </li>
        </ul>
        <div className="infoText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
