/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Vimeo from "react-vimeo"; // Ensure you have the react-vimeo package installed
import Split from "../Split";
const Intro3 = () => {
  const [isVimeoSource, setIsVimeoSource] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // State to manage mute status

  const toggleMute = () => {
    setIsMuted((prev) => !prev); // Toggle mute status
  };

  return (
    <div className="full-screen-container marginnavbar" style={styles.container}>
      <div className="label-text" style={styles.labelText}>
        {isVimeoSource ? "Vimeo iFrame" : "HTML Video Element"}
      </div>
      <label className="switch" style={styles.switch}>
        <input
          type="checkbox"
          onClick={() => setIsVimeoSource((prev) => !prev)}
        />
        <span className="slider round" />
      </label>

      {/* Video Element */}
      <video
        className="full-screen-video"
        playsInline
        autoPlay
        muted={isMuted} // Control mute with state
        loop
        style={styles.video}
      >
        <source
          src={
            "https://res.cloudinary.com/dhagemzyp/video/upload/v1726429564/SnapSave.io-Lamborghini_Aventador_LP_750-4_SV_Superveloce_wb7fy8.mp4"
          }
          type="video/mp4"
        />
      </video>

      {/* Mute/Unmute Button */}
      <button onClick={toggleMute} style={styles.muteButton} className="mute-button">
        {isMuted ? (
          <img
            width="80"
            height="80"
            src="https://img.icons8.com/ios/50/FFFFFF/mute--v1.png"
            alt="mute"
            style={styles.volumeIcon}
          />
        ) : (
          <img
            width="80"
            height="80"
            src="https://img.icons8.com/ios/50/FFFFFF/room-sound.png"
            alt="unmute"
            style={styles.volumeIcon}
          />
        )}
      </button>
      <div className="slider" style={styles.social}>
        <div className="social-icon">
          <a href="https://www.facebook.com/vtec.chip">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/vtecchiptuning/">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

      </div>
      {/* Email Section */}



      <div className="mail-us" style={styles.mailUs}>
        <a href="mailto:info@vtec-chiptuning.com?subject=Subject">
          <div className="flex" style={styles.flexContainer}>
            <div className="text valign" style={styles.textContainer}>
              <div className="full-width">
                <p style={styles.contactText}>Get In Touch</p>
                <h6 style={styles.contactEmail}>info@vtec-chiptuning.com</h6>
              </div>
            </div>
            <div className="mail-icon" style={styles.iconContainer}>
              <div className="icon-box">
                <span
                  style={styles.icon}
                  className="icon color-font pe-7s-mail"
                ></span>
              </div>
            </div>
          </div>
        </a>

        <a href="tel:+4934294843751">
          <div className="flex" style={styles.flexContainer}>
            <div className="text valign" style={styles.textContainer}>
              <div className="full-width">
                <h6 style={styles.contactEmail}>034294/843751</h6>
              </div>
            </div>
            <div className="mail-icon" style={styles.iconContainer}>
              <div className="icon-box">
                <span
                  style={styles.icon}
                  className="icon color-font pe-7s-phone"
                ></span>
              </div>
            </div>
          </div>
        </a>
        <a href="https://www.google.com/maps?ll=51.440052,12.411616&z=16&t=m&hl=fr&gl=DE&mapclient=embed&q=Am+Bahndamm+9+04509+Krostitz">
          <div className="flex" style={styles.flexContainer}>
            <div className="text valign" style={styles.textContainer}>
              <div className="full-width">
                <h6 style={styles.contactEmail}>Am Bahndamm 9,
                <br />
                04509 Krostitz  , Deutschland</h6>
              </div>
            </div>
            <div className="mail-icon" style={styles.iconContainer}>
              <div className="icon-box">
                <span
                  style={styles.icon}
                  className="icon color-font pe-7s-map-2"
                ></span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {

    position: "relative",
    height: "90vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  labelText: {
    color: "#fff",
    marginBottom: "20px",
  },
  switch: {
    marginBottom: "20px",
  },
  video: {
    position: "absolute",
    marginTop : "0",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content : {
    position: "absolute",
    width: "150px",
    bottom: "7px", // Position from the bottom
    left: "150px", // Position from the left

    zIndex: 10, // Ensure it appears above the video

  },
  contentsmalltitel :{
    color: "rgb(18, 194, 233)", // Apply the RGB color

  },

  muteButton: {
    position: "absolute", // Position the button above social links
    zIndex: 10, // Ensure it appears above the video
    bottom: "20px", // Position from the top
    // Position from the left
    background: "none", // Remove background
    border: "none", // Remove border
    cursor: "pointer", // Change cursor to pointer
    color: "#fff", // Icon color
    fontSize: "24px", // Icon size
  },
  volumeIcon: {
    fontSize: "24px", // Set icon size
  },
  social: {
    position: "absolute",
    width: "40px",
    bottom: "5px", // Position from the bottom
    left: "20px", // Position from the left

    zIndex: 10, // Ensure it appears above the video
  },
  socialLink: {
    display: "flex", // Use flex
    color: "#fff", // Set the icon color
    fontSize: "45px", // Set icon size
    marginBottom: "5px", // Space between icons
  },
  mailUs: {
    position: "absolute",
    bottom: "20px", // Position from the bottom
    right: "0px", // Position from the right
    zIndex: 10, // Ensure it appears above the video
    display: "flex", // Use flex to align items

    flexDirection: "column",
  },
  flexContainer: {
    display: "flex", // Use flex to align items
    alignItems: "center", // Center vertically
    marginTop: "8px",
  },
  textContainer: {
    marginRight: "10px", // Add space between text and icon
  },
  contactText: {
    margin: 0,
    color: "#fff",
  },
  contactEmail: {
    color: "#fff",
    fontSize: "16px",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center", // Align icon vertically
  },
  icon: {
    fontSize: "40px", // Increase font size to make the icon bigger
    marginRight: "40px",
  },
};

export default Intro3;
