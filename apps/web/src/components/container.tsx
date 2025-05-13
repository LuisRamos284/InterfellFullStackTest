import React, { PropsWithChildren } from "react";

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="bg-white rounded-lg shadow-md p-6">{children}</div>;
};
