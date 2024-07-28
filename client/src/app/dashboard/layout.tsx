import React from "react";

const layout = (props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) => {
  return <>
  {props.modal}
  {props.children}</>;
};

export default layout;
