import { h } from "preact";

export default ({ as = "h1", children }) => {
  const Component = as;
  const weight = (c) => {
    switch (c) {
      case "h1":
        return "font-extrabold text-3xl mb-6 mt-2";
      case "h2":
        return "font-bold text-2xl mb-4";
      case "h3":
        return "font-semibold text-xl mb-2";
      default:
        return "font-medium text-lg mb-1";
    }
  };
  return (
    <Component class={`${weight(as)} text-gray-900 mx-auto`}>
      {children}
    </Component>
  );
};
