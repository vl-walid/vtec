/* eslint-disable @next/next/no-css-tags */
import React from "react";
import Head from "next/head";
import Link from "next/link";

const LightTheme = ({ children, mobileappstyle }) => {
  React.useEffect(() => {
    window.theme = "light";
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/light.css" />
        {mobileappstyle ? (
          <link rel="stylesheet" href="/css/mobile-app-light.css" />
        ) : null}
      </Head>
      {children}
    </>
  );
};

export default LightTheme;
