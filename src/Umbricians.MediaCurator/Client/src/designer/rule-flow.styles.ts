import xyflowCss from "@xyflow/react/dist/style.css?inline";
import ruleFlowCss from "./rule-flow.css?inline";

let sharedSheet: CSSStyleSheet | undefined;

export function adoptRuleFlowStyles(shadowRoot: ShadowRoot): void {
  if (!sharedSheet) {
    sharedSheet = new CSSStyleSheet();
    sharedSheet.replaceSync(`${xyflowCss}\n${ruleFlowCss}`);
  }

  if (!shadowRoot.adoptedStyleSheets.includes(sharedSheet)) {
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sharedSheet];
  }
}
