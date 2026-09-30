import styles from "./heading.module.css";

const weightClass = (c) => {
  switch (c) {
    case "h1":
      return styles.h1;
    case "h2":
      return styles.h2;
    case "h3":
      return styles.h3;
    default:
      return styles.default;
  }
};

export default ({ as = "h1", className = "", children }) => {
  const Component = as;
  return (
    <Component
      className={[styles.text, weightClass(as), className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
};
