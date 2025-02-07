import React from "react";
import Split from "../Split";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const Numbers2 = () => {
  React.useEffect(() => {
    console.clear();
  });
  return (
    <section className="block-sec section-padding-number ">
      <div className="container">
        <div className="number-sec">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="item md-mb50">
                <span className="icon pe-7s-smile"></span>
                <h3 className="custom-font">
                  &nbsp;
                  <CountUp redraw={true} end={1789} duration="3">
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span className="count" ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h3>
                <Split>
                  <p className="wow words chars splitting txt" data-splitting>
                  Gl&uuml;ckliche Kunden
                  </p>
                </Split>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="item md-mb50">
                <span className="icon pe-7s-server"></span>
                <h3 className="custom-font">
                  &nbsp;
                  <CountUp redraw={true} end={14241} duration="3">
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span className="count" ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h3>
                <Split>
                  <p className="wow txt words chars splitting " data-splitting>
                  Fahrzeugdatenbank
                  </p>
                </Split>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="item sm-mb50">
                <span className="icon pe-7s-config"></span>
                <h3 className="custom-font">
                  &nbsp;
                  <CountUp redraw={true} end={139488} duration="3">
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span className="count" ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                  
                </h3>
                <Split>
                  <p className="wow txt words chars splitting" data-splitting>
                  Winols Datenbank

                  </p>
                </Split>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="item">
                <span className="icon pe-7s-medal"></span>
                <h3 className="custom-font">
                  &nbsp;
                  <CountUp redraw={true} end={3} duration="1">
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span className="count" ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h3>
                <Split>
                  <p className="wow txt words chars splitting" data-splitting>
                  Auszeichnungen
                  </p>
                </Split>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Numbers2;
