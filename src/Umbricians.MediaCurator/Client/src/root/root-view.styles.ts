import { css } from "@umbraco-cms/backoffice/external/lit";

export const rootViewStyles = css`
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
