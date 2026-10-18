import styles from "./text.module.css";

export default ({ as = "p", className = "", children }) => {
  const Component = as;
  return (
    <Component className={[styles.text, className].filter(Boolean).join(" ")}>
      {children}
    </Component>
  );
};
