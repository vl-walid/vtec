/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Intro2 = ({ sliderRef }) => {
  return (
    <header ref={sliderRef} className="slider-st valign position-re marginnavbar">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 valign">
            <div className="cont md-mb50">
              <div className="sub-title mb-5">
                <h6>Partner werden im Automotive Tuning </h6>
              </div>
              <h1 className="mb-10 fw-600">Erfolg im Tuning.</h1>
              <p>
                Profitieren Sie von unserer langj&auml;hrigen Erfahrung im
                Chiptuning und Fahrzeuganpassungen. Werden Sie Teil unseres
                Netzwerks und profitieren Sie von m&auml;ßgeschneiderten
                L&ouml;sungen f&uuml;r Ihr Unternehmen.
              </p>
              <Link legacyBehavior href={`/ueber-uns/ueber-uns`}>
                <a className="butn bord curve mt-30">
                  <span> &Uuml;ber Uns</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="img">
              <img src="/img/slid/001.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="line bottom left"></div>
    </header>
  );
};

export default Intro2;
