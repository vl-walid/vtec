/* eslint-disable @next/next/no-css-tags */
import React from "react";
import Head from "next/head";
import Link from "next/link"

const DarkTheme = ({ children, useSkin, mobileappstyle }) => {
  React.useEffect(() => {
    window.theme = "dark";
  }, []);
  return (
    <>
      <Head>
        <Link legacyBehavior rel="stylesheet" href="/css/dark.css" />
        {useSkin ? (
          <Link legacyBehavior rel="stylesheet" href="/css/arch-skin-dark.css" />
        ) : (
          ""
        )}
        {mobileappstyle ? (
          <Link legacyBehavior href="/css/mobile-app-dark.css" rel="stylesheet" />
        ) : (
          ""
        )}
      </Head>
      {children}
    </>
  );
};

export default DarkTheme;
