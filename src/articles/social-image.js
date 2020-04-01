import React from "react";

const Border = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      position: "relative",
      padding: "1px",
      boxSizing: "border-box",
      background: "#192c3b",
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "2rem",
      zIndex: 99
    }}
  >
    {children}
  </div>
);

export default ({ title = "this is a test title" }) => {
  return (
    <div
      style={{
        background: "#52777d",
        padding: "1rem",
        width: "1200px",
        height: "630px"
      }}
    >
      <Border>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            width: "100%",
            height: "100%",
            borderRadius: "2rem",
            backgroundColor: "#192c3b",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='58' viewBox='0 0 42 58'%3E%3Cg fill='%2352777d' fill-opacity='0.04'%3E%3Cpath fill-rule='evenodd' d='M12 18h12v18h6v4H18V22h-6v-4zm-6-2v-4H0V0h36v6h6v36h-6v4h6v12H6v-6H0V16h6zM34 2H2v8h24v24h8V2zM6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM2 50h32v-8H10V18H2v32zm28-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'/%3E%3C/g%3E%3C/svg%3E\")"
          }}
        >
          <div
            style={{
              textAlign: "center",
              flexGrow: 2,
              paddingTop: "10rem",
              fontSize: "6rem",
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: "600",
              lineHeight: "1"
            }}
          >
            {title}
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: "2rem",
              padding: "5rem",
              fontFamily: '"Cormorant Garamond", serif'
            }}
          >
            by Jacob Bolda
          </div>
        </div>
      </Border>
    </div>
  );
};
