import { h } from "preact";

export default ({ as = "a", flair = "37", children, ...rest }) => {
  const Component = as;
  return (
    <Component
      class={
        flair === "37"
          ? `text-base font-semibold text-primary-600 hover:text-primary-300`
          : ``
      }
      {...rest}
    >
      {children}
    </Component>
  );
};
