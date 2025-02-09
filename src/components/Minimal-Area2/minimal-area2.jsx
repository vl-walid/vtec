/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import Link from "next/link";

const MinimalArea2 = () => {
  return (
    <section className="min-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="img">
              <img
                className="thumparallax-down" // You can change or remove this class if you no longer need it.
                src="/img/min-area.jpg"
                alt="VTEC Chiptuning" // Add a meaningful alt text for better accessibility
              />
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="content">
              <h4 className="color-font">WILLKOMMEN BEI VTEC-CHIPTUNING</h4>
              <h6 className="mb-10">LASSEN AUCH SIE SICH…</h6>
              <Split>
                <p className="wow txt words chars splitting" data-splitting>
                  …begeistern, vom zus&auml;tzlichen Leistungspotential, welches
                  wir dem Motor Ihres Fahrzeugs durch ein speziell entwickeltes
                  Chiptuning entlocken k&ouml;nnen. Viele Tests und ausgiebige
                  Erfahrungen mit unterschiedlichsten Fahrzeugmodellen machen es
                  uns m&ouml;glich, Ihnen f&uuml;r ein breit gef&auml;chertes
                  Spektrum an Fahrzeugmodellen professionelle
                  Leistungssteigerungen durch Kennfeldoptimierungen anbieten zu
                  k&ouml;nnen.
                </p>
              </Split>
              <ul>
                <li className="wow fadeInUp" data-wow-delay=".3s">
                  Wir gehen nicht an die Grenzen des M&ouml;glichen, sondern
                  sch&ouml;pfen das Sinnvolle aus.
                </li>
              </ul>
              <Link legacyBehavior href={`/ueber-uns/ueber-uns`}>
                <a
                  className="butn bord curve mt-40 wow fadeInUp"
                  data-wow-delay=".8s"
                >
                  <span>Entdecken</span>
                </a>
              </Link>

              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalArea2;
