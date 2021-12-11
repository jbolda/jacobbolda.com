import { h } from "preact";

export default ({ as = "li", classAdd = "", children, ...rest }) => {
  if (!["ol", "ul", "li"].includes(as))
    throw new Error(`got ${as} in a List component, invalid`);
  const Component = as;
  return (
    <Component
      class={`${
        as === "ul" ? "list-disc " : "list-decimal "
      }list-inside text-xl md:text-lg lg:text-base text-primary-900 mx-auto px-2 mb-1 max-w-prose${
        classAdd.length > 0 ? ` ${classAdd}` : ""
      }`}
      {...rest}
    >
      {children}
    </Component>
  );
};
