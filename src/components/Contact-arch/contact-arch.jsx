import React, { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";

const ContactArch = () => {
  const [buttonText, setButtonText] = useState("Send Message");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  const sendMessage = async (values) => {
    setIsSubmitting(true);
    setButtonText("Sending..."); // Change button text while sending

    try {
      const response = await fetch("https://topspeed-performance.de/api/send-partner-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setButtonText("Your Partner Request has been successfully sent!"); // Success message
        setTimeout(() => {
          setButtonText("Send Message"); // Reset after 2 seconds
        }, 2000);
      } else {
        setButtonText(result.message || "Failed to send the request."); // Error message
        setTimeout(() => {
          setButtonText("Send Message"); // Reset after 2 seconds
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setButtonText("An error occurred. Please try again later.");
      setTimeout(() => {
        setButtonText("Send Message");
      }, 2000);
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="contact-arch"
      className="contact-sec style2 section-padding position-re bg-img"
      style={{ backgroundImage: "url(/img/patrn1.png)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="sec-head text-center">
              <h2 className="wow fadeIn" data-wow-delay=".3s">
                Contact Us
              </h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="form wow fadeInUp" data-wow-delay=".5s">
              <Formik
                initialValues={{
                  firmenname: "",
                  name: "",
                  adresse: "",
                  telefon: "",
                  email: "",
                  evcKundennummer: "",
                  tuningtools: "",
                  message: "",
                }}
                onSubmit={async (values) => {
                  await sendMessage(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form id="contact-form">
                    <div className="messages"></div>
                    <br />
                    <div className="controls">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Field
                              id="form_firmenname"
                              type="text"
                              name="firmenname"
                              placeholder="Firmenname *"
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Field
                              id="form_name"
                              type="text"
                              name="name"
                              placeholder="Name *"
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Field
                              id="form_adresse"
                              type="text"
                              name="adresse"
                              placeholder="Adresse *"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Field
                              id="form_telefon"
                              type="tel"
                              name="telefon"
                              placeholder="Telefon"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              validate={validateEmail}
                              id="form_email"
                              type="email"
                              name="email"
                              placeholder="E-Mail *"
                              required="required"
                            />
                            {errors.email && touched.email && <div>{errors.email}</div>}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Field
                              id="form_evc_kundennummer"
                              type="text"
                              name="evcKundennummer"
                              placeholder="EVC Kundennummer"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Field
                              id="form_tuningtools"
                              type="text"
                              name="tuningtools"
                              placeholder="vorhandene Tuningtools"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <Field
                              as="textarea"
                              id="form_message"
                              name="message"
                              placeholder="Message"
                              rows="4"
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="text-center">
                            <button
                              type="submit"
                              className="nb butn light mt-30 full-width"
                              disabled={isSubmitting}
                            >
                              <span className="ls3 text-u">{buttonText}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactArch;
