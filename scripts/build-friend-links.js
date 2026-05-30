import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const API_URL = process.env.FRIEND_LINKS_API_URL ?? 'https://api.ipflex.ink/api/links';
const OUTPUT_PATH = process.env.FRIEND_LINKS_OUTPUT_PATH
  ? pathToFileURL(process.env.FRIEND_LINKS_OUTPUT_PATH)
  : new URL('../public/friend-links.json', import.meta.url);

async function buildFriendLinks() {
  let response;

  try {
    response = await fetch(API_URL);
  } catch (error) {
    await useExistingFriendLinks(error);
    return;
  }

  if (!response.ok) {
    await useExistingFriendLinks(
      new Error(`Failed to fetch friend links: ${response.status} ${response.statusText}`)
    );
    return;
  }

  const data = await response.json();
  const links = Array.isArray(data?.data?.links) ? data.data.links : [];

  await writeFile(
    OUTPUT_PATH,
    JSON.stringify(
      {
        links,
        generatedAt: new Date().toISOString(),
      },
      null,
      2
    ) + '\n'
  );

  console.log(`Generated public/friend-links.json with ${links.length} links`);
}

async function useExistingFriendLinks(error) {
  try {
    const existing = await readFile(OUTPUT_PATH, 'utf8');
    const data = JSON.parse(existing);
    const links = Array.isArray(data?.links) ? data.links : [];

    console.warn(
      `Failed to fetch friend links (${error.message}); using existing public/friend-links.json with ${links.length} links`
    );
  } catch {
    throw error;
  }
}

buildFriendLinks().catch((error) => {
  console.error(error);
  process.exit(1);
});
