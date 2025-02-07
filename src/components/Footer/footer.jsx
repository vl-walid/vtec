/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import appData from "../../data/app.json";
import axios from "axios";
import { useRouter } from 'next/router'; // To handle redirects

const Footer = ({ hideBGCOLOR }) => {
  const [recentNews, setRecentNews] = useState([]);
  const [email, setEmail] = useState('');
  const router = useRouter(); // Use router to navigate to the desired page

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog-overviews/latest');
        setRecentNews(response.data);
      } catch (error) {
        console.error("Error fetching recent news:", error);
      }
    };

    fetchRecentNews();
  }, []);

  // Function to handle email submission
  const handleEmailSubmit = () => {
    const consentGiven = localStorage.getItem('cookiesConsent'); // Check if consent is given

    if (consentGiven === 'true') {
      // Save the email in a cookie if consent is true
      localStorage.setItem('UserEmail', email)
    }

    // Redirect to the "/kontaktpage" page
    router.push('/kontakt/kontakt/');
  };

  return (
    <footer className={`${!hideBGCOLOR ? "sub-bg" : ""} section-padding-about`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="item md-mb50">
              <div className="title">
                <h5>Kontaktieren Sie uns</h5>
              </div>
              <ul>
                <li>
                  <span className="icon pe-7s-map-marker"></span>
                  <div className="cont">
                    <h6>Offizielle Adresse</h6>
                    <p>Am Bahndamm 9, 04509 Krostitz</p>
                  </div>
                </li>
                <li>
                  <span className="icon pe-7s-mail"></span>
                  <div className="cont">
                    <h6>Schreiben Sie uns eine E-Mail</h6>
                    <p>info@vtec-chiptuning.com</p>
                  </div>
                </li>
                <li>
                  <span className="icon pe-7s-call"></span>
                  <div className="cont">
                    <h6>Rufen Sie uns an</h6>
                    <p>034294/843751</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="item md-mb50">
              <div className="title">
                <h5>Aktuelle Nachrichten</h5>
              </div>
              <ul>
                {recentNews.map((news) => (
                  <li key={news.id}>
                    <div className="img">
                      <Link legacyBehavior href={`/blog-details/${news.id}`}>
                        <a>
                          <img src={news.main_image} alt={news.main_title} />
                        </a>
                      </Link>
                    </div>
                    <div className="sm-post">
                      <Link legacyBehavior href={`/blog-details/${news.id}`}>
                        <a>
                          <p>{news.main_title}</p>
                        </a>
                      </Link>
                      <br />
                      <span className="date">{new Date(news.date_added).toLocaleDateString()}</span>
                    </div>
                  </li>
                ))}
                <li>
                  <div className="subscribe">
                    <input
                      type="text"
                      placeholder="Type Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Set the email state
                    />
                    <span
                      className="subs pe-7s-paper-plane"
                      onClick={handleEmailSubmit} // Trigger the email handling
                    ></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="item">
              <div className="logo">
                <img src={appData.lightLogo} alt="" />
              </div>
              <div className="social">
                <a href="https://www.facebook.com/vtec.chip">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/vtecchiptuning/">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="copy-right">
                <p>
                  ©Copyright 2024 VTEC Chiptuning. Made with passion by
                  <Link legacyBehavior href="#">
                    <a target="_blank"> VTEC Chiptuning</a>
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ height: "1px", backgroundColor: "#ff0000", border: "none" }} />
        <div className="row">
          <div className="col-12">
            <h6>Nützliche Links</h6>
            <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: 0, margin: 0 }}>
              <li className="nutz-links">
                <Link legacyBehavior href="/nuetzliche-links/agb-s">
                <a>AGB&apos;s</a>
                </Link>
              </li>
              <li className="nutz-links">
                <Link legacyBehavior href="/nuetzliche-links/daten-shutz-erklaerung">
                  <a>Datenschutzerklärung</a>
                </Link>
              </li>
              <li className="nutz-links">
                <Link legacyBehavior href="/nuetzliche-links/impressum">
                  <a>Impressum</a>
                </Link>
              </li>
              <li className="nutz-links">
                <Link legacyBehavior href="/kontakt/partner-werden">
                  <a>Partner werden</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
