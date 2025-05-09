"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        success: {
          iconTheme: {
            primary: "#4B5563",
            secondary: "#FFF",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#FFF",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
