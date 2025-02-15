/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import AboutUs1Date from "../../data/sections/about-us1.json";

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 valign md-mb50">
            <div className="mb-50">
              <h6 className="fw-100 text-u ls10 mb-10">
                Warum ?
              </h6>
              <h3 className="fw-600 text-u ls1 mb-30 color-font-down">
              VTEC Chiptuning
              </h3>
              <p>Chiptuning ist ein zulassungspflichtiges Handwerk nachdem Leitfaden zur Abgrenzung der Berufe. Somit bedarf es der Zulassung durch die zust&#228;ndige Handwerkskammer. Sollten Sie sich f&#252;r ein anderes Unternehmen entscheiden, lassen Sie sich im Vorfeld die Eintragungsnummer zeigen. Unsere Zulassungsnummer k&#246;nnen Sie im Impressum einsehen.
</p>
              <Link legacyBehavior href="/ueber-uns/ueber-uns">
                <a className="butn bord curve mt-30">
                  <span>Mehr lesen</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-7 img">
            <img src={AboutUs1Date.image} alt="" />
            <div className="stauts">
              {AboutUs1Date.stauts.map((item) => (
                <div className="item" key={item.id}>
                  <h4>
                    {item.number}
                    <span>{item.letter}</span>
                  </h4>
                  <h6>{item.stautsName}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
