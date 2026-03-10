import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const vault = path.resolve(process.cwd());
const inputDirs = ['10_corpus', '20_nodes', '30_paths', '40_fragments'];
const outputRoot = path.join(vault, 'content');
const allowedStatus = new Set(['draft', 'review', 'published', 'archived']);

function splitFrontmatter(raw) {
  const m = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!m) return null;
  return { front: m[1], body: raw.slice(m[0].length) };
}

function toArray(value) {
  if (Array.isArray(value)) return value.map((v) => String(v));
  if (typeof value === 'string' && value.trim()) return value.split(',').map((v) => v.trim()).filter(Boolean);
  return [];
}

function normalizeTargets(frontmatter) {
  if (Array.isArray(frontmatter.targets) && frontmatter.targets.length > 0) {
    return frontmatter.targets.map((v) => String(v));
  }
  if (!Array.isArray(frontmatter.attachments)) return [];
  const out = [];
  for (const item of frontmatter.attachments) {
    if (typeof item === 'string' && item.trim()) {
      out.push(item.trim());
      continue;
    }
    if (!item || typeof item !== 'object') continue;
    const ref = typeof item.ref === 'string' ? item.ref.trim() : '';
    if (!ref) continue;
    const role = typeof item.role === 'string' ? item.role.trim().toLowerCase() : 'primary';
    out.push(role && role !== 'primary' ? `${role}|${ref}` : ref);
  }
  return out;
}

function orderedObject(obj) {
  const preferred = [
    'id', 'kind', 'content_type', 'title', 'slug', 'status', 'site_ref', 'audiences', 'topics', 'targets',
    'language', 'version', 'summary', 'published_at', 'source_updated_at',
  ];
  const out = {};
  for (const key of preferred) if (obj[key] !== undefined) out[key] = obj[key];
  for (const key of Object.keys(obj)) if (out[key] === undefined) out[key] = obj[key];
  return out;
}

function walkMarkdownFiles(dir, output = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkMarkdownFiles(full, output);
    else if (st.isFile() && name.toLowerCase().endsWith('.md')) output.push(full);
  }
  return output;
}

fs.mkdirSync(outputRoot, { recursive: true });
let generated = 0;

for (const relDir of inputDirs) {
  const srcDir = path.join(vault, relDir);
  if (!fs.existsSync(srcDir)) continue;

  for (const file of walkMarkdownFiles(srcDir)) {
    const raw = fs.readFileSync(file, 'utf8');
    const parts = splitFrontmatter(raw);
    if (!parts) continue;

    const frontmatter = YAML.parse(parts.front) || {};
    if (!frontmatter || typeof frontmatter !== 'object' || Array.isArray(frontmatter)) continue;

    const next = { ...frontmatter };
    next.kind = typeof next.kind === 'string' && next.kind.trim() ? next.kind.trim() : 'mediation';
    next.content_type = typeof next.content_type === 'string' && next.content_type.trim()
      ? next.content_type.trim()
      : (typeof next.node_kind === 'string' && next.node_kind.trim() ? next.node_kind.trim() : 'node');

    next.site_ref = typeof next.site_ref === 'string' && next.site_ref.trim()
      ? next.site_ref.trim()
      : (typeof next.site === 'string' && next.site.trim() ? next.site.trim() : 'devey');

    const status = typeof next.status === 'string' ? next.status.trim().toLowerCase() : 'draft';
    next.status = allowedStatus.has(status) ? status : 'draft';
    next.language = typeof next.language === 'string' && next.language.trim() ? next.language.trim() : 'fr';
    next.version = Number.isInteger(next.version) && next.version > 0 ? next.version : 1;

    if (typeof next.summary !== 'string' || !next.summary.trim()) {
      if (typeof next.summary_short === 'string' && next.summary_short.trim()) next.summary = next.summary_short.trim();
    }

    const topics = toArray(next.topics);
    if (topics.length === 0) {
      const tags = toArray(next.tags);
      if (tags.length > 0) next.topics = tags;
    }

    const targets = normalizeTargets(next);
    if (targets.length > 0) next.targets = targets;

    const audiences = toArray(next.audiences);
    if (audiences.length === 0) {
      next.audiences = (typeof next.visibility === 'string' && next.visibility.trim().toLowerCase() === 'internal')
        ? ['internal']
        : ['public'];
    }

    const normalized = orderedObject(next);
    const fm = YAML.stringify(normalized).trimEnd();
    const outRaw = `---\n${fm}\n---\n\n${parts.body.replace(/^\s*/, '')}`;

    const relPath = path.relative(vault, file);
    const outFile = path.join(outputRoot, relPath);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, outRaw, 'utf8');
    generated += 1;
  }
}

console.log(`Generated ${generated} normalized markdown files into content/`);
