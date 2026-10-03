import { UMB_ACTION_EVENT_CONTEXT as c } from "@umbraco-cms/backoffice/action";
import { UmbRequestReloadChildrenOfEntityEvent as f } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MEDIA_ROOT_ENTITY_TYPE as d } from "@umbraco-cms/backoffice/media";
import { M as i } from "./sdk.gen-BaXox45_.js";
const u = "00000000-0000-0000-0000-000000000000";
function l(t, n, o) {
  const e = [], r = /* @__PURE__ */ new Set();
  for (const s of t) {
    const a = s.toLowerCase();
    r.has(a) || (r.add(a), e.push(
      a === u ? { entityType: o, unique: null } : { entityType: n, unique: s }
    ));
  }
  return e;
}
const E = "media";
async function _(t, n) {
  if (n.length !== 0)
    try {
      const { data: o } = await i.getAncestorFolders({ body: { mediaKeys: [...n] } });
      if (!o) return;
      const e = await t.getContext(c);
      if (!e) return;
      for (const r of l(o.folderKeys, E, d))
        e.dispatchEvent(new f(r));
    } catch {
    }
}
async function g() {
  try {
    const { data: t } = await i.getSettings();
    return t?.detectPeople ?? !1;
  } catch {
    return !1;
  }
}
export {
  g as p,
  _ as r,
  l as t
};
//# sourceMappingURL=reload-people-badges-CcKaP8q6.js.map
