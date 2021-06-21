import { h } from "preact";

export default ({ as = "h1", children }) => {
  const Component = as;
  const weight = (c) => {
    switch (c) {
      case "h1":
        return "font-extrabold text-3xl mb-8 mt-2";
      case "h2":
        return "font-bold text-2xl mb-6";
      case "h3":
        return "font-semibold text-xl mb-4";
      default:
        return "font-medium text-lg mb-3";
    }
  };
  return (
    <Component class={`${weight(as)} text-primary-900 mx-auto max-w-2xl`}>
      {children}
    </Component>
  );
};
