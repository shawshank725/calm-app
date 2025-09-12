import React from "react";
import { Redirect } from "expo-router";

const HomeIndex = () => {
  return <Redirect href={"/(expert)/(home)"} />;
};

export default HomeIndex;
