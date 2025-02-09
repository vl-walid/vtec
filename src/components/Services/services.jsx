import React from "react";
import featuresData from "../../data/sections/features.json";

const Services = () => {
  return (
    <section className="services bords section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="sec-head text-center">
              <h6 className="wow fadeIn" data-wow-delay=".5s">
              &uuml;ber unser Leistungs-spektrum
              </h6>
              <h3 className="wow color-font">
              Hier finden Sie eine Auswahl unserer Dienstleistungen, die Ihr Fahrzeug optimieren.
                </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {featuresData.slice(0, 6).map((feature, index) => (
            <div
              key={feature.id}
              className="col-lg-4 wow fadeInLeft"
              data-wow-delay={`${0.5 + index * 0.2}s`} // Dynamic delay
            >
              <div className="item-box">
                <span className={`icon ${feature.icon}`}></span>
                <h6>{feature.title}</h6>
                <p>{feature.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
