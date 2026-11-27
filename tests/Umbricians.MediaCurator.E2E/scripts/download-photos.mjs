// Downloads the demo photos the screenshots use into screenshots/photos (git ignores it).
//
//   node scripts/download-photos.mjs      (npm run screenshots runs it first)
//
// The photos aren't kept in the repository. screenshots/photos.json lists each one: its Wikimedia Commons file, author,
// licence and the SHA-1 of the original. Before downloading, the script asks Commons for each file's current licence
// and checksum, and refuses a photo that is no longer CC0 or public domain, or whose file has changed. A photo already
// downloaded with the right checksum is kept.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const screenshotsDir = resolve(dirname(fileURLToPath(import.meta.url)), '../screenshots');
const photosDir = join(screenshotsDir, 'photos');
const manifest = JSON.parse(readFileSync(join(screenshotsDir, 'photos.json'), 'utf8'));
const allowedLicences = ['CC0', 'Public domain'];
const headers = { 'User-Agent': 'MediaCuratorDemoPhotos/1.0 (open-source Umbraco package demo; https://github.com/Umbricians/Media-Curator)' };

mkdirSync(photosDir, { recursive: true });

const sha1 = (bytes) => createHash('sha1').update(bytes).digest('hex');
const missing = manifest.filter((photo) => {
  const path = join(photosDir, photo.file);
  return !existsSync(path) || sha1(readFileSync(path)) !== photo.sha1;
});
if (missing.length === 0) {
  console.log(`All ${manifest.length} photos are already downloaded.`);
  process.exit(0);
}

const problems = [];
for (let at = 0; at < missing.length; at += 50) {
  const batch = missing.slice(at, at + 50);
  const current = await commonsInfo(batch.map((photo) => photo.title));
  for (const photo of batch) {
    const info = current.get(photo.title);
    if (!info) {
      problems.push(`${photo.file}: ${photo.title} is no longer on Commons.`);
      continue;
    }
    if (!allowedLicences.includes(info.licence)) {
      problems.push(`${photo.file}: its licence is now "${info.licence}", not CC0 or public domain.`);
      continue;
    }
    if (info.sha1 !== photo.sha1) {
      problems.push(`${photo.file}: the file on Commons has changed since it was chosen.`);
      continue;
    }
    const bytes = Buffer.from(await (await fetchWithRetry(info.url)).arrayBuffer());
    if (sha1(bytes) !== photo.sha1) {
      problems.push(`${photo.file}: the download doesn't match its checksum.`);
      continue;
    }
    writeFileSync(join(photosDir, photo.file), bytes);
    console.log(`Downloaded ${photo.file} (${(bytes.length / 1048576).toFixed(1)} MB)`);
  }
}

if (problems.length) {
  console.error(`${problems.length} photo(s) couldn't be used; replace them in screenshots/photos.json:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`Downloaded ${missing.length} photo(s); all ${manifest.length} are ready.`);

async function commonsInfo(titles) {
  const query = new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    titles: titles.join('|'),
    prop: 'imageinfo',
    iiprop: 'url|sha1|extmetadata',
    iiextmetadatafilter: 'LicenseShortName',
  });
  const body = await (await fetchWithRetry(`https://commons.wikimedia.org/w/api.php?${query}`)).json();
  // Commons reports titles normalised (underscores as spaces); map them back to the titles asked for.
  const asked = new Map((body.query.normalized ?? []).map((entry) => [entry.to, entry.from]));
  return new Map(
    body.query.pages
      .filter((page) => page.imageinfo?.length)
      .map((page) => {
        const info = page.imageinfo[0];
        return [
          asked.get(page.title) ?? page.title,
          { url: info.url, sha1: info.sha1, licence: info.extmetadata?.LicenseShortName?.value ?? '' },
        ];
      }),
  );
}

async function fetchWithRetry(url) {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url, { headers });
    if (response.ok) return response;
    if (attempt === 4 || ![429, 500, 502, 503, 504].includes(response.status)) {
      throw new Error(`${url} answered ${response.status} ${response.statusText}.`);
    }
    await new Promise((done) => setTimeout(done, attempt * 5000));
  }
}
