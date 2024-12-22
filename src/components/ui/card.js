import React from "react";

export const Card = ({ children }) => (
  <div className="border rounded-lg shadow-md p-4">{children}</div>
);

export const CardHeader = ({ children }) => <div className="font-bold mb-2">{children}</div>;

export const CardContent = ({ children }) => <div>{children}</div>;

export const CardTitle = ({ children }) => <h3 className="text-lg">{children}</h3>;
