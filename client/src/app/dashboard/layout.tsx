import Navigation from "@/components/Navigation";
import React from "react";
// implementation for parallel route route with intersecting route
const layout = (props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) => {
  return <div className="flex">
  <Navigation />
  {props.modal}
  {props.children}</div>;
};

export default layout;
