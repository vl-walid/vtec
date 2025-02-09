/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import appData from "../../data/app.json";
import initFullNavbarMenu from "../../common/initFullNavbarMenu";
import { useRouter } from "next/router"; // Import useRouter if not already done
import axios from "axios"; // Import axios if not already done'


const NavbarFullMenu = ({ theme }) => {
  React.useEffect(() => {
    initFullNavbarMenu();
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No token found, user is not authenticated");
        return;
      }

      const response = await axios.post(
        "https://back-end.topspeed-performance.de/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("authToken");
        alert("You have successfully logged out");
        router.push("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out");
    }
  };

  return (
    <>
      <div
        id="navi"
        className={`topnav ${theme ? (theme === "light" ? "light" : "") : ""}`}
      >
        <div className="container-fluid">
          <div className="logo">
            <Link legacyBehavior href="/">
              {theme ? (
                theme === "light" ? (
                  <img src={appData.darkLogo} alt="logo" />
                ) : (
                  <img src={appData.lightLogo} alt="logo" />
                )
              ) : (
                <img src={appData.lightLogo} alt="logo" />
              )}
            </Link>
          </div>
          <div className="menu-icon">
            <span className="icon">
              <i></i>
              <i></i>
            </span>
            <span className="text" data-splitting>
              <span className="menu-text word">Menu</span>
            </span>
          </div>
        </div>
      </div>

      <div className="hamenu">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-8">
              <div className="menu-links">
                <ul className="main-menu">
                  <li>
                    <div className="o-hidden">
                      <Link legacyBehavior href={`/`}>
                        <a className="link">
                          <span className="nm">01.</span>Startseite
                        </a>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="o-hidden">
                      <Link legacyBehavior href={`/admin/new-blog/`}>
                        <a className="link">
                          <span className="nm">02.</span>Neue Neuigkeite
                        </a>
                      </Link>
                    </div>
                  </li>

                  <li>
                    <div className="o-hidden">
                      <Link legacyBehavior href={`/admin/car/search-car/`}>
                        <a className="link">
                          <span className="nm">03.</span>Auto nach Name suchen
                        </a>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="o-hidden">
                      <Link legacyBehavior href={`/admin/car/new-car`}>
                        <a className="link">
                          <span className="nm">04.</span>Neues Auto
                        </a>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="o-hidden">
                      <Link legacyBehavior
                        href={`/admin/car/tuning-eigenschaften-hinzufuegen/`}
                      >
                        <a className="link">
                          <span className="nm">05.</span>Tuning und
                          Eigenschaften
                        </a>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="cont-info">
                <div className="item">
                  <h6>Nummer : </h6>
                  <p>034294/843751</p>
                </div>
                <div className="item">
                  <h6>Offizielle Adresse :</h6>
                  <p>Am Bahndamm 9, 04509 Krostitz</p>
                </div>
                <div className="item">
                  <h6>E-Mail</h6>
                  <p>
                    <a href="mailto:info@vtec-chiptuning.com?subject=Subject">
                      info@vtec-chiptuning.com
                    </a>
                  </p>
                </div>
                <div className="item">
                  <button
                    onClick={handleLogout}
                    className="admin-logout-btn mt-25"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarFullMenu;
