/** @jsx jsx */
import { jsx } from "theme-ui";

export default props => {
  return (
    <pre {...props} sx={{ ...props.sx }}>
      {props.children}
    </pre>
  );
};
