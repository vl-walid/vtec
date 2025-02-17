import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import Image from "next/image";

const NewAdmin = () => {
  const [errorMessage, setErrorMessage] = useState("");

  // Password match validation function
  const validatePasswords = (values) => {
    const errors = {};
    if (values.password !== values.confirm_password) {
      errors.confirm_password = "Passwords must match!";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    setErrorMessage(""); // Clear previous error messages

    if (values.password !== values.confirm_password) {
      setErrorMessage("Passwords must match!");
      return; // Prevent form submission if passwords don't match
    }

    // Send the data to backend if passwords match
    try {
      const response = await fetch("https://topseed-performance.de/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          admin_code: values.password_admin, // Aligning with backend field
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If registration is successful, alert success message from backend
        alert("Admin registered successfully!");
      } else if (data.errors) {
        // Handle validation errors from the backend
        let errorMessage = "Validation errors: \n";
        for (const [field, messages] of Object.entries(data.errors)) {
          messages.forEach((message) => {
            errorMessage += `${field}: ${message}\n`;
          });
        }
        alert(errorMessage); // Show backend validation errors
      } else if (data.message) {
        // If there's a message like invalid admin code
        alert(data.message);
      } else {
        alert("An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while submitting the form.");
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <section className="contact section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mt-115">
            <div className="form md-mb50">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirm_password: "",
                  password_admin: "",
                }}
                validate={validatePasswords} // Password matching validation
                onSubmit={handleSubmit} // Handle submit with async function
              >
                {() => (
                  <Form id="register-form">
                    <div className="form-group">
                      <Field
                        id="form_name"
                        type="text"
                        name="name"
                        placeholder="Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        id="form_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        id="form_password"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        id="form_confirm_password"
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage
                        name="confirm_password"
                        component="div"
                        className="error"
                      />
                    </div>
                    {errorMessage && (
                      <div className="error">{errorMessage}</div>
                    )}
                    <div className="form-group">
                      <Field
                        id="form_password_admin"
                        type="password"
                        name="password_admin"
                        placeholder="Password from Admin"
                      />
                      <ErrorMessage
                        name="password_admin"
                        component="div"
                        className="error"
                      />
                    </div>
                    <button type="submit" className="butn bord">
                      <span>Register</span>
                    </button>

                    <Link legacyBehavior href={`/admin/admin`}>
                      <a className="text-login ml-4">Login</a>
                    </Link>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <Image
              src="/img/login.jpg"
              alt="Display"
              className="rounded"
              width={690}
              height={690}
              style={{ borderRadius: "15px", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewAdmin;
