import React from "react";
import Link from "next/link";
import cardMouseEffect from "../../common/cardMouseEffect";

const Services3 = () => {
  React.useEffect(() => {
    cardMouseEffect(document.querySelectorAll(".feat .items"));
  }, []);
  return (
    <section className="feat sub-bg ">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10">
            <div className="sec-head">


            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 items md-mb30">
            <div className="item wow fadeIn" data-wow-delay=".3s">
              <span className="icon">
                <i className="ion-ios-bolt-outline"></i>
              </span>
              <h5>Alle Marken</h5>
              <p>
              Durch eigene Software-Entwicklung, ein Team von Programmierern und ein Entwicklungszentrum können wir hochwertige Tuning-Software für nahezu alle Fahrzeuge des Weltmarkts anbieten. </p>
              <Link legacyBehavior href="/ueber-uns/ueber-uns/">
                <a className="more-stroke">
                  <span></span>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 items active md-mb30">
            <div className="item wow fadeIn" data-wow-delay=".3s">
              <span className="icon">
                <i className="ion-ios-star"></i>
              </span>
              <h5>Kundenvertrauen
</h5>
              <p>
              Unser Erfolg – die Qualit&auml;t unserer Arbeit und vor allem unserer Beratung spiegelt sich in der hohen Kundenzufriedenheit wieder.

              </p>
              <Link legacyBehavior href="/ueber-uns/ueber-uns/">
                <a className="more-stroke">
                  <span></span>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 items sm-mb30">
            <div className="item wow fadeIn" data-wow-delay=".3s">
              <span className="icon">
                <i className="ion-ios-people"></i>
              </span>
              <h5>APR St&uuml;tzpunkt</h5>
              <p>
              Durch unsere langj&auml;hrige und professionelle Arbeit konnten wir die APR Deutschland GmbH als starken Partner gewinnen.

              </p>
              <Link legacyBehavior href="/ueber-uns/ueber-uns/">
                <a className="more-stroke">
                  <span></span>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 items">
            <div className="item wow fadeIn" data-wow-delay=".3s">
              <span className="icon">
                <i className="ion-ios-color-wand"></i>
              </span>
              <h5>Seit 2011 am Markt</h5>
              <p>
              Unser Bestreben: Unsere Käufer sollen nicht nur f&uuml;r wenige Kilometer Spa&szlig; an Ihrem leistungsgesteigerten Fahrzeug haben, sondern idealerweise ein Autoleben lang.

              </p>
              <Link legacyBehavior href="/ueber-uns/ueber-uns/">
                <a className="more-stroke">
                  <span></span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services3;
