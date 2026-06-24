/* Shared cleanup utilities so MediaCurator specs are idempotent and re-runnable. */

const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

type RawApi = {
  get(url: string): Promise<{ json(): Promise<unknown>; status(): number }>;
  put(url: string, body?: unknown): Promise<unknown>;
  delete(url: string): Promise<unknown>;
};

type UmbracoApi = RawApi & {
  mediaType: { getByName(name: string): Promise<MediaTypeModel> };
};

interface MediaTypeModel {
  id: string;
  properties: Array<{ alias: string; container?: { id: string } }>;
  containers: Array<{ id: string; name: string }>;
  [key: string]: unknown;
}

/** Deletes every MediaCurator ruleset whose name starts with the given prefix. */
export async function deleteRulesetsByPrefix(umbracoApi: UmbracoApi, prefix: string): Promise<void> {
  const response = await umbracoApi.get(`${base()}/umbraco/mediacurator/api/v1/rulesets`);
  const rulesets = (await response.json()) as Array<{ key: string; name: string }>;
  for (const ruleset of rulesets ?? []) {
    if (ruleset.name?.startsWith(prefix)) {
      await umbracoApi.delete(`${base()}/umbraco/mediacurator/api/v1/rulesets/${ruleset.key}`);
    }
  }
}

/** Removes a MediaCurator-provisioned property (and an emptied Media Curator group)
 * from a media type, restoring the pre-provisioning schema for test repeatability. */
export async function removeProvisionedProperty(
  umbracoApi: UmbracoApi,
  mediaTypeName: string,
  propertyAlias: string,
): Promise<void> {
  const mediaType = await umbracoApi.mediaType.getByName(mediaTypeName);
  if (!mediaType?.properties?.some((p) => p.alias === propertyAlias)) {
    return;
  }

  const properties = mediaType.properties.filter((p) => p.alias !== propertyAlias);
  const usedContainerIds = new Set(properties.map((p) => p.container?.id).filter(Boolean));
  const containers = mediaType.containers.filter(
    (c) => c.name !== 'Media Curator' || usedContainerIds.has(c.id),
  );

  const { id, ...rest } = mediaType;
  await umbracoApi.put(`${base()}/umbraco/management/api/v1/media-type/${id}`, {
    ...rest,
    properties,
    containers,
  });
}
