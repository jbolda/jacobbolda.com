import { h } from "preact";

export default ({ as = "li", children, ...rest }) => {
  if (!["ol", "ul", "li"].includes(as))
    throw new Error(`got ${as} in a List component, invalid`);
  const Component = as;
  return (
    <Component
      class={`text-xl md:text-lg lg:text-base text-gray-500 mx-auto mb-1`}
      {...rest}
    >
      {children}
    </Component>
  );
};
