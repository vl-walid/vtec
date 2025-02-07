import React from 'react'
import Split from '../Split'
import Link from 'next/link'

const CallToAction = ({img}) => {
    return (
      <section
        className="call-action section-padding sub-bg bg-img"
        style={{ backgroundImage: `url(${img ? img : "/img/patrn.svg"})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9">
              <div className="content sm-mb30">
                <Split>
                  <h6 className="wow words chars splitting" data-splitting>
                  Sprechen wir
                  </h6>
                  <h2 className="wow words chars splitting" data-splitting>
                  &Uuml;ber Ihre <br /> <b className="back-color">Anpassungen</b>
                    .
                  </h2>
                </Split>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 valign">
              <Link legacyBehavior
                href={`/kontakt/kontakt`}
              >
                <a
                  className="butn bord curve wow fadeInUp"
                  data-wow-delay=".5s"
                >
                  <span>Get In Touch</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
}

export default CallToAction