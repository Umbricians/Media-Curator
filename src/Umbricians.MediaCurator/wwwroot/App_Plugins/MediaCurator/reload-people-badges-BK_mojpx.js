import { UMB_ACTION_EVENT_CONTEXT as c } from "@umbraco-cms/backoffice/action";
import { UmbRequestReloadChildrenOfEntityEvent as f } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MEDIA_ROOT_ENTITY_TYPE as u } from "@umbraco-cms/backoffice/media";
import { M as i } from "./sdk.gen-DBpJrjP9.js";
const d = "00000000-0000-0000-0000-000000000000";
function l(e, n, o) {
  const t = [], a = /* @__PURE__ */ new Set();
  for (const s of e) {
    const r = s.toLowerCase();
    a.has(r) || (a.add(r), t.push(
      r === d ? { entityType: o, unique: null } : { entityType: n, unique: s }
    ));
  }
  return t;
}
function _(e, n, o) {
  const t = e?.element.firstElementChild;
  t && (t.data = { headline: n, message: o });
}
const E = "media";
async function g(e, n) {
  if (n.length !== 0)
    try {
      const { data: o } = await i.getAncestorFolders({ body: { mediaKeys: [...n] } });
      if (!o) return;
      const t = await e.getContext(c);
      if (!t) return;
      for (const a of l(o.folderKeys, E, u))
        t.dispatchEvent(new f(a));
    } catch {
    }
}
async function h() {
  try {
    const { data: e } = await i.getSettings();
    return e?.detectPeople ?? !1;
  } catch {
    return !1;
  }
}
export {
  h as p,
  g as r,
  l as t,
  _ as u
};
//# sourceMappingURL=reload-people-badges-BK_mojpx.js.map
