export default ({ src, avif, alt, ...props }) => {
  return !avif ? (
    <img alt={alt} src={src} {...props} />
  ) : (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <img alt={alt} src={src} {...props} />
    </picture>
  );
};
