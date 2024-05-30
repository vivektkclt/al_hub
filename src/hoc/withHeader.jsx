import React from "react";
import CustomStatusBar from "../components/StatusBar/CustomStatusBar.component";

export const withHeader = ({ BodyComponent, HeaderComponent }) => {
  return () => (
    <>
      <CustomStatusBar />
      <HeaderComponent />
      <BodyComponent />
    </>
  );
};
