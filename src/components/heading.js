import { h } from "preact";

export default ({ as = "h1", children }) => {
  const Component = as;
  const weight = (c) => {
    switch (c) {
      case "h1":
        return "font-extrabold text-3xl mb-6 mt-2";
      case "h2":
        return "font-bold text-2xl my-4";
      case "h3":
        return "font-semibold text-xl my-2";
      default:
        return "font-medium text-lg my-1";
    }
  };
  return (
    <Component class={`${weight(as)} text-primary-900 max-w-2xl px-1`}>
      {children}
    </Component>
  );
};
