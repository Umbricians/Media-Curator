import { c as t } from "./client.gen-Duro_iP4.js";
class c {
  static getExclusions(e) {
    return (e?.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/exclusions",
      ...e
    });
  }
  static setExclusion(e) {
    return (e.client ?? t).put({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/exclusions/{mediaKey}",
      ...e
    });
  }
  static executeCuration(e) {
    return (e?.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/execute",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static executeMediaCuration(e) {
    return (e.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/media/{mediaKey}/execute",
      ...e
    });
  }
  static planMediaCuration(e) {
    return (e.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/media/{mediaKey}/plan",
      ...e
    });
  }
  static planCuration(e) {
    return (e?.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/plan",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static getQueueStatus(e) {
    return (e?.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/queue",
      ...e
    });
  }
  static queueCuration(e) {
    return (e?.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/queue",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static getRuns(e) {
    return (e?.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/runs",
      ...e
    });
  }
  static getRunItems(e) {
    return (e.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/runs/{runKey}/items",
      ...e
    });
  }
  static undoRun(e) {
    return (e.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/curation/runs/{runKey}/undo",
      ...e
    });
  }
  static getProviders(e) {
    return (e?.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/providers",
      ...e
    });
  }
  static analyzeMediaImages(e) {
    return (e.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/recognition/media/{mediaKey}/analyze",
      ...e
    });
  }
  static listImagesToAnalyze(e) {
    return (e.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/recognition/media/{mediaKey}/images",
      ...e
    });
  }
  static countMediaImages(e) {
    return (e.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/recognition/media/{mediaKey}/images/count",
      ...e
    });
  }
  static reanalyzeImages(e) {
    return (e?.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/recognition/reanalyze",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static testPizzaOriginal(e) {
    return (e?.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/recognition/test-pizza/original",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static testPizzaPrepared(e) {
    return (e?.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/recognition/test-pizza/prepared",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static applyRequirements(e) {
    return (e?.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/requirements/apply",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static checkRequirements(e) {
    return (e.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/requirements/check/{rulesetKey}",
      ...e
    });
  }
  static getRulesets(e) {
    return (e?.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/rulesets",
      ...e
    });
  }
  static saveRuleset(e) {
    return (e?.client ?? t).put({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/rulesets",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static deleteRuleset(e) {
    return (e.client ?? t).delete({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/rulesets/{key}",
      ...e
    });
  }
  static getRuleset(e) {
    return (e.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/rulesets/{key}",
      ...e
    });
  }
  static getRulesetByScope(e) {
    return (e.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/rulesets/by-scope/{scopeRootKey}",
      ...e
    });
  }
  static exportRulesets(e) {
    return (e?.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/rulesets/export",
      ...e
    });
  }
  static importRulesets(e) {
    return (e?.client ?? t).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/rulesets/import",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static getSettings(e) {
    return (e?.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/settings",
      ...e
    });
  }
  static saveSettings(e) {
    return (e?.client ?? t).put({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/settings",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
  static getAiOptions(e) {
    return (e?.client ?? t).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/settings/ai-options",
      ...e
    });
  }
  static setTypeSafeApiKey(e) {
    return (e?.client ?? t).put({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/mediacurator/api/v1/settings/typesafe-api-key",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e?.headers
      }
    });
  }
}
export {
  c as M
};
//# sourceMappingURL=sdk.gen-Bq8ZVkDW.js.map
