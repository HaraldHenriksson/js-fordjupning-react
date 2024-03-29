import {
  require_classnames,
  require_jsx_runtime,
  useBootstrapPrefix
} from "./chunk-COLGXPGL.js";
import {
  require_react
} from "./chunk-ST3U5LCA.js";
import {
  __toESM
} from "./chunk-DFKQJ226.js";

// node_modules/react-bootstrap/esm/ButtonGroup.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ButtonGroup = React.forwardRef(({
  bsPrefix,
  size,
  vertical = false,
  className,
  role = "group",
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = "div",
  ...rest
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "btn-group");
  let baseClass = prefix;
  if (vertical)
    baseClass = `${prefix}-vertical`;
  return (0, import_jsx_runtime.jsx)(Component, {
    ...rest,
    ref,
    role,
    className: (0, import_classnames.default)(className, baseClass, size && `${prefix}-${size}`)
  });
});
ButtonGroup.displayName = "ButtonGroup";
var ButtonGroup_default = ButtonGroup;
export {
  ButtonGroup_default as default
};
//# sourceMappingURL=react-bootstrap_ButtonGroup.js.map
