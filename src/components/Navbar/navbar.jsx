/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import appData from "../../data/app.json";
import { handleDropdown, handleMobileDropdown } from "../../common/navbar";

const Navbar = ({ lr, nr, theme }) => {
  return (
    <nav
      ref={nr}
      className={`navbar navbar-expand-lg change ${
        theme === "themeL" ? "light" : ""
      }`}
    >
      <div className="container">
        <Link legacyBehavior href="/">
          <a className="logo">
            {theme ? (
              theme === "themeL" ? (
                <img ref={lr} src={appData.darkLogo} alt="logo" />
              ) : (
                <img ref={lr} src={appData.lightLogo} alt="logo" />
              )
            ) : (
              <img ref={lr} src={appData.lightLogo} alt="logo" />
            )}
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMobileDropdown}
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar">
            <i className="fas fa-bars"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
              <Link legacyBehavior href={`/`}>
                <a className="nav-link">Startseite</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link legacyBehavior href={`/news-list/news-list`}>
                <a className="nav-link">News</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link legacyBehavior href={`/ueber-uns/ueber-uns`}>
                <a className="nav-link">&Uuml;ber Uns</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link legacyBehavior href={`/kontakt/partner-werden`}>
                <a className="nav-link">Partner werden</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link legacyBehavior href={`/kontakt/kontakt`}>
                <a className="nav-link">Kontakt</a>
              </Link>

            </li>
            <li className="nav-item">
              <Link legacyBehavior href="https://portal.ols-fileservice.com/panel">
                <a className="nav-link">Fileservice</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
