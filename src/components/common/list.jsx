import styles from "./list.module.css";

export default ({ as = "li", className = "", children, ...rest }) => {
  if (!["ol", "ul", "li"].includes(as))
    throw new Error(`got ${as} in a List component, invalid`);
  const Component = as;
  const listStyle =
    as === "ul" ? styles.ul : as === "ol" ? styles.ol : "";
  return (
    <Component
      className={[styles.list, listStyle, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Component>
  );
};
