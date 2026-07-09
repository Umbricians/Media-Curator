import { UMB_AUTH_CONTEXT as i } from "@umbraco-cms/backoffice/auth";
import { c as s } from "./client.gen-CkijBioZ.js";
const n = "Umbricians.MediaCurator.Styles", r = "/App_Plugins/MediaCurator/media-curator.css";
function l() {
  if (document.getElementById(n)) return;
  const e = document.createElement("link");
  e.id = n, e.rel = "stylesheet", e.href = r, document.head.appendChild(e);
}
const m = async (e, o) => {
  l();
  const t = await e.getContext(i);
  if (!t) {
    console.warn("UMB_AUTH_CONTEXT not available — extension API client will not be authenticated");
    return;
  }
  t.configureClient(s), console.log("Hello from my extension 🎉");
}, d = (e, o) => {
  console.log("Goodbye from my extension 👋");
};
export {
  m as onInit,
  d as onUnload
};
//# sourceMappingURL=entrypoint-BXDH0O8K.js.map
