export default ({ as = "p", classAdd = "", children }) => {
  const Component = as;
  return (
    <Component
      className={`text-xl md:text-lg lg:text-base text-primary-900 dark:text-primary-50${
        classAdd.length > 0 ? ` ${classAdd}` : ""
      }`}
    >
      {children}
    </Component>
  );
};
