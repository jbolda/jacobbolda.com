import styles from "./link.module.css";

export default ({ as = "a", children, className = "", ...rest }) => {
  const Component = as;
  return (
    <Component className={className || styles.link} {...rest}>
      {children}
    </Component>
  );
};
