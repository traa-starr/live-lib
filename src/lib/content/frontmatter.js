export function parseFrontmatter(raw = '') {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, fm, content] = match;
  const data = {};
  const lines = fm.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const pair = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!pair) {
      i += 1;
      continue;
    }

    const [, key, valueRaw] = pair;
    if (valueRaw === '') {
      if (lines[i + 1]?.trim().startsWith('- ')) {
        const list = [];
        i += 1;
        while (i < lines.length && lines[i].trim().startsWith('- ')) {
          const itemText = lines[i].trim().slice(2);
          if (itemText.includes(':')) {
            const obj = {};
            const [k, ...rest] = itemText.split(':');
            obj[k.trim()] = normalizeValue(rest.join(':').trim());
            i += 1;
            while (i < lines.length && lines[i].startsWith('    ')) {
              const nested = lines[i].trim();
              const [nk, ...nrest] = nested.split(':');
              obj[nk.trim()] = normalizeValue(nrest.join(':').trim());
              i += 1;
            }
            list.push(obj);
            continue;
          }
          list.push(normalizeValue(itemText));
          i += 1;
        }
        data[key] = list;
        continue;
      }
      data[key] = '';
      i += 1;
      continue;
    }

    data[key] = normalizeValue(valueRaw);
    i += 1;
  }

  return { data, content };
}

function normalizeValue(value = '') {
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed.slice(1, -1).split(',').map((item) => normalizeValue(item.trim())).filter(Boolean);
  }
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}
