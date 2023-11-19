export default ({ as = "a", flair = "37", children, ...rest }) => {
  const Component = as;
  return (
    <Component
      className={
        flair === "37"
          ? `text-base font-semibold text-primary-600 dark:text-primary-300 hover:text-primary-300`
          : ``
      }
      {...rest}
    >
      {children}
    </Component>
  );
};
