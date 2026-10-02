import type { DetailedHTMLProps, HTMLAttributes } from "react";

/** UUI web components rendered from the React Flow nodes. */
type UuiElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  name?: string;
  look?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "uui-icon": UuiElementProps;
      "uui-tag": UuiElementProps;
    }
  }
}
