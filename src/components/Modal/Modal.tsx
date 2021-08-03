import React from "react";
import { ModelProps } from "./model.types";

export const Modal: React.FC<ModelProps> = (props) => {
  const { isOpen, children } = { ...props };

  return (
    <>
      {isOpen && (
        <div
          id="model-container"
          className="model-container position-fixed justify-center align-center">
          {children}
        </div>
      )}
    </>
  );
};
