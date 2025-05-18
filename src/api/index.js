import matter from 'gray-matter';
import fs from 'fs';
import { join } from 'path';

const getDir = (contentPath) => {
  return join(process.cwd(), 'src/content', contentPath);
};

const gamesDirectory = getDir('games');
const privacyDirectory = getDir('privacy-policy');

export function getGameBySlug(slug) {
  return getItemBySlug(slug, gamesDirectory);
}

export function getPrivacyPolicyBySlug(slug) {
  return getItemBySlug(slug, privacyDirectory);
}

export function getAllGames() {
  const slugs = getGamesSlugs();
  return getAllItems(slugs, getGameBySlug);
}

function getSlugs(dir) {
  return fs.readdirSync(dir);
}

function getGamesSlugs() {
  return getSlugs(gamesDirectory);
}

function getItemBySlug(slug, dir) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(dir, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const item = {}
  item['content'] = content

  Object.keys(data).forEach((field) => {
    if (field === 'slug') {
      item[field] = realSlug
    }

    if (data.hasOwnProperty(field)) {
      item[field] = data[field]
    }
  })

  return item;
}

function getAllItems(slugs, get) {
  const posts = slugs
    .map((slug) => get(slug))
    .sort((item1, item2) => (item1.date > item2.date ? -1 : 1))
  return posts
}


