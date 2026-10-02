import { css as s } from "@umbraco-cms/backoffice/external/lit";
function o(i, a, e) {
  i?.peek(a, { data: { message: e } });
}
const r = s`
  :host {
    display: block;
    padding: var(--uui-size-layout-1);
  }
  .form {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: var(--uui-size-space-3) var(--uui-size-space-5);
    align-items: center;
    margin-bottom: var(--uui-size-space-5);
  }
  .actions {
    display: flex;
    gap: var(--uui-size-space-3);
    justify-content: flex-end;
    margin-top: var(--uui-size-space-5);
  }
`;
export {
  o as n,
  r
};
//# sourceMappingURL=root-view.styles-zhTrEhZY.js.map
