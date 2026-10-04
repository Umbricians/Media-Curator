// Filled glyphs for the people signs. Umbraco's icons are outlines, which shrink to a few pale strokes at
// the ~8px a tree sign is drawn at; a solid shape with a surface-coloured edge stays readable. The fill
// follows the sign's `iconColorAlias` (currentColor).
const glyph = (shape: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="overflow:visible"><g style="stroke:var(--uui-color-surface,#fff);stroke-width:3;paint-order:stroke">${shape}</g></svg>`;

export const PERSON_ICON = "icon-mediacurator-person";
export const DOT_ICON = "icon-mediacurator-dot";

export default [
  {
    name: PERSON_ICON,
    path: () => Promise.resolve({ default: glyph('<path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.6-9 6v2h18v-2c0-3.4-4-6-9-6Z"/>') }),
  },
  {
    name: DOT_ICON,
    path: () => Promise.resolve({ default: glyph('<circle cx="12" cy="12" r="8"/>') }),
  },
];
