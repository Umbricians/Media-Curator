import { UmbTreeServerDataSourceBase } from "@umbraco-cms/backoffice/tree";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { MediaCuratorService, type RulesetModel } from "../../api/index.js";
import { toTreeItem, sortRulesetsByName, type McRulesetTreeItemModel } from "./ruleset-tree.mapper.js";

type ServerItem = RulesetModel & { hasChildren: boolean };

export class McRulesetTreeServerDataSource extends UmbTreeServerDataSourceBase<ServerItem, McRulesetTreeItemModel> {
  constructor(host: UmbControllerHost) {
    super(host, {
      getRootItems,
      getChildrenOf,
      getAncestorsOf,
      mapper: (item) => toTreeItem(item),
    });
  }
}

const getRootItems = async () => {
  const response = await MediaCuratorService.getRulesets();
  if (response.error || !response.data) {
    return { error: response.error as never };
  }
  const items = sortRulesetsByName(response.data).map((r) => ({ ...r, hasChildren: false }));
  // One unpaged page, so nothing comes before or after it (Umbraco 18's tree reads totalBefore/totalAfter).
  return { data: { items, total: items.length, totalBefore: 0, totalAfter: 0 } };
};

// Rulesets are flat; the root's children are the rulesets, nothing has children.
const getChildrenOf = async (args: { parent: { unique: string | null } }) =>
  args.parent.unique === null ? getRootItems() : { data: { items: [] as ServerItem[], total: 0, totalBefore: 0, totalAfter: 0 } };

// Rulesets sit directly under the root, so a ruleset's ancestry is just itself (the menu
// structure adds the root); breadcrumbs and sidebar expansion rely on this.
const getAncestorsOf = async (args: { treeItem: { unique: string } }) => {
  const response = await MediaCuratorService.getRuleset({ path: { key: args.treeItem.unique } });
  if (response.error || !response.data) {
    return { error: response.error as never };
  }
  return { data: [{ ...response.data, hasChildren: false }] };
};
