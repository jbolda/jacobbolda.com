import { h } from "preact";

export default ({ src, avif, alt, ...props }) => {
  return !avif ? (
    <img alt={alt} src={src} {...props} />
  ) : (
    <picture>
      <source srcset={avif} type="image/avif">
        <img alt={alt} src={src} {...props} />
      </source>
    </picture>
  );
};
