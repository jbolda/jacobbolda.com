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
      background: "#e9edf6",
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "2rem",
      zIndex: 99
    }}
  >
    {children}
  </div>
);

export default ({ frontmatter: { title } }) => {
  return (
    <div
      style={{
        background: "#39f1a2",
        padding: "1rem",
        width: "1200px",
        height: "630px"
      }}
    >
      <Border>
        <div
          style={{
            color: "white",
            textAlign: "center",
            width: "400px",
            fontSize: "3rem",
            backgroundColor: "#192c3b",
            backgroundImage: url(`${SvgBackground}`)
          }}
        >
          <span
            style={{
              fontSize:
                "calc(var(--width) / (var(--length, 1) * 0.5) * var(--scale, 1))",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              lineHeight: 1,
              margin: "1rem 0"
            }}
          >
            {title}
          </span>
        </div>
      </Border>
    </div>
  );
};

const SvgBackground = props => (
  <svg viewBox="0 0 42 58" {...props}>
    <path
      fillRule="evenodd"
      fill="#52777d"
      fillOpacity="0.07"
      d="M12 18h12v18h6v4H18V22h-6v-4zm-6-2v-4H0V0h36v6h6v36h-6v4h6v12H6v-6H0V16h6zM34 2H2v8h24v24h8V2zM6 8a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zM2 50h32v-8H10V18H2v32zm28-6a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4zm0-8a2 2 0 100 4 2 2 0 000-4zm0-8a2 2 0 100 4 2 2 0 000-4zm0-8a2 2 0 100 4 2 2 0 000-4z"
    />
  </svg>
);
