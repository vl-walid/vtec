import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Link to create internal links
import Image from "next/image";

const CookiesConsent = () => {
  const [isVisible, setIsVisible] = useState(false); // Default to hidden

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookiesConsent");
    if (!consentGiven) {
      setIsVisible(true); // Show the popup only if no consent is stored
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesConsent", "true"); // Store the user's consent
    setIsVisible(false); // Hide the popup
  };

  const handleClose = () => {
    localStorage.setItem("cookiesConsent", "true"); // Treat closing as acceptance
    setIsVisible(false); // Hide the popup
  };

  if (!isVisible) return null; // Return nothing if the popup is hidden

  return (
    <div
      className="cookiesConsentContainer"
      style={styles.cookiesConsentContainer}
    >
      <button
        className="cookiesConsentClose"
        onClick={handleClose}
        style={styles.cookiesConsentClose}
      >
        ✖
      </button>
      <Image
        className="cookiesConsentImage"
        src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
        alt="cookies-img"
        width={50} // Adjust as needed
        height={50} // Adjust as needed
        style={styles.cookiesConsentImage}
      />
      <p className="cookiesConsentText" style={styles.cookiesConsentText}>
        Wir verwenden Cookies, um das Nutzererlebnis zu verbessern, Analysen
        durchzuf&uuml;hren und Marketingma&szlig;nahmen zu erm&ouml;glichen.
        Indem Sie zustimmen, akzeptieren Sie unsere
        <Link legacyBehavior href="nuetzliche-links/agb-s/">
          <a className="cookiesConsentLink" style={styles.cookiesConsentLink}>
            AGB
          </a>
        </Link>{" "}
        und{" "}
        <Link legacyBehavior href="nuetzliche-links/daten-shutz-erklaerung/">
          <a className="cookiesConsentLink" style={styles.cookiesConsentLink}>
            Datenschutzerkl&auml;rung
          </a>
        </Link>
        .
        <br />
        Weitere Informationen zur Nutzung von Cookies finden Sie in unserer
        Datenschutzerkl&auml;rung.
      </p>
      <div
        className="cookiesConsentButtonContainer"
        style={styles.cookiesConsentButtonContainer}
      >
        <button
          className="cookiesConsentAccept"
          onClick={handleAccept}
          style={styles.cookiesConsentAccept}
        >
          Das ist in Ordnung!
        </button>
      </div>
    </div>
  );
};

const styles = {
  cookiesConsentContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(135deg, #f0f0f0, #ffffff)", // Light grey to white gradient
    color: "#333",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999, // Ensure it is above other content
    boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)", // Optional, for a subtle shadow
  },
  cookiesConsentClose: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    color: "black", // Close button is black
    fontSize: "20px",
    cursor: "pointer",
  },
  cookiesConsentImage: {
    width: "40px",
    height: "40px",
  },
  cookiesConsentText: {
    margin: "0 20px",
    fontSize: "16px", // Increased font size for longer text
  },
  cookiesConsentLink: {
    color: "#0066cc",
    textDecoration: "none",
  },
  cookiesConsentButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  cookiesConsentAccept: {
    backgroundColor: "#333", // Dark gray mixed with black
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "14px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
};

export default CookiesConsent;
