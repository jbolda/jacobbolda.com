import { h } from "preact";

export default ({ as = "p", children }) => {
  const Component = as;
  return (
    <Component
      class={`text-xl md:text-lg lg:text-base text-primary-900 px-1 max-w-prose`}
    >
      {children}
    </Component>
  );
};
