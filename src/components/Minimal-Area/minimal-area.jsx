/* eslint-disable @next/next/no-img-element */
import React from "react";
import cardMouseEffect from "../../common/cardMouseEffect";
import { thumparallaxDown } from "../../common/thumparallax";

const MinimalArea = () => {
  React.useEffect(() => {
    cardMouseEffect(document.querySelectorAll(".feat .items"));
    setTimeout(() => {
      thumparallaxDown();
    }, 1000);
  }, []);
  return (
    <section className="min-area sub-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="img">
              <img
                className="thumparallax-down"
                src="/img/min-area.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="content pt-0">
              <h4 className="wow color-font"> &Uuml;ber Uns</h4>
              <p className="wow txt" data-splitting>
              Seit 2011 z&auml;hlt VTEC-Chiptuning zu den f&uuml;hrenden Anbietern von professionellem Chiptuning in Leipzig.

              </p>
              <ul className="feat">
                <li className="wow fadeInUp" data-wow-delay=".2s">
                  <h6>
                    <span>1</span> Unsere Mission
                  </h6>
                  <p>
                  Mit h&ouml;chster Pr&auml;zision und Qualit&auml;t entwickeln wir individuelle Softwarel&ouml;sungen, die perfekt auf Ihr Fahrzeug abgestimmt sind.
                  </p>
                </li>
                <li className="wow fadeInUp" data-wow-delay=".4s">
                  <h6>
                    <span>2</span> Unsere Ziele
                  </h6>
                  <p>
                  Wir streben nach Exzellenz in allem, was wir tun &ndash; von der Beratung bis zur Umsetzung, um Ihre Erwartungen zu &uuml;bertreffen.
                  </p>
                </li>
                <li className="wow fadeInUp" data-wow-delay=".6s">
                  <h6>
                    <span>3</span> Warum Wir?
                  </h6>
                  <p>
                  Dank unserer langj&auml;hrigen Erfahrung, eigenen Softwareentwicklung und Partnerschaften wie der mit APR Deutschland GmbH garantieren wir L&ouml;sungen, die Vertrauen schaffen und Ihre Zufriedenheit sicherstellen.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalArea;
