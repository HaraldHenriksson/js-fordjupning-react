import {
  FormCheckInput_default
} from "./chunk-E524BORC.js";
import {
  createWithBsPrefix
} from "./chunk-PJJ6LJK7.js";
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

// node_modules/react-bootstrap/esm/InputGroup.js
var import_classnames = __toESM(require_classnames());
var React2 = __toESM(require_react());
var import_react = __toESM(require_react());

// node_modules/react-bootstrap/esm/InputGroupContext.js
var React = __toESM(require_react());
var context = React.createContext(null);
context.displayName = "InputGroupContext";
var InputGroupContext_default = context;

// node_modules/react-bootstrap/esm/InputGroup.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var InputGroupText = createWithBsPrefix("input-group-text", {
  Component: "span"
});
var InputGroupCheckbox = (props) => (0, import_jsx_runtime.jsx)(InputGroupText, {
  children: (0, import_jsx_runtime.jsx)(FormCheckInput_default, {
    type: "checkbox",
    ...props
  })
});
var InputGroupRadio = (props) => (0, import_jsx_runtime.jsx)(InputGroupText, {
  children: (0, import_jsx_runtime.jsx)(FormCheckInput_default, {
    type: "radio",
    ...props
  })
});
var InputGroup = React2.forwardRef(({
  bsPrefix,
  size,
  hasValidation,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "input-group");
  const contextValue = (0, import_react.useMemo)(() => ({}), []);
  return (0, import_jsx_runtime.jsx)(InputGroupContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime.jsx)(Component, {
      ref,
      ...props,
      className: (0, import_classnames.default)(className, bsPrefix, size && `${bsPrefix}-${size}`, hasValidation && "has-validation")
    })
  });
});
InputGroup.displayName = "InputGroup";
var InputGroup_default = Object.assign(InputGroup, {
  Text: InputGroupText,
  Radio: InputGroupRadio,
  Checkbox: InputGroupCheckbox
});
export {
  InputGroup_default as default
};
//# sourceMappingURL=react-bootstrap_InputGroup.js.map
