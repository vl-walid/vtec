import React from "react";
import Image from "next/image"; // Import the Image component from next/image

const ProjectDescription = () => {
  return (
    <section className="intro-section section-padding-decription">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="htit">
              <h5>
                <span>01 </span> Werden Sie VTEC Chiptuning H&auml;ndler
              </h5>
              <div className="img mt-40">
                <a
                  href="https://www.evc.de/de/check_evc_license.asp?k=IvzXAFpGm48s9S3YriIEnw%3d%3d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Replacing <img> with <Image> */}
                  <Image
                    src="https://www.evc.de/common/check_evc_license_image.asp?k=IvzXAFpGm48s9S3YriIEnw%3d%3d"
                    alt="AVD License"
                    width={300} // You can set a width based on your design
                    height={150} // You can set a height based on your design
                    objectFit="contain" // Ensures the image is contained within the specified dimensions
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-8 offset-lg-1 col-md-8">
            <div className="text js-scroll__content">
              <p className="extra-text">
                Sie haben eine Kfz-Werkstatt, ein Autohaus oder ein
                Tuninggesch&auml;ft und m&ouml;chten Ihr Produktsortiment
                erweitern? Dann werden Sie VTEC Chiptuning H&auml;ndler und
                profitieren Sie von unserem erstklassigen Service. Wir bieten
                Ihnen die M&ouml;glichkeit, alle ben&ouml;tigten Tools und
                Softwareprodukte &uuml;ber uns zu beziehen und
                gew&auml;hrleisten Ihnen professionellen Support. Dank unserer
                langj&auml;hrigen Erfahrung in der Softwareentwicklung
                garantieren wir Ihnen h&ouml;chste Qualit&auml;tsstandards und
                fundiertes Know-how.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDescription;
