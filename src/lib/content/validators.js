const resourceRequired = ['title', 'slug', 'type', 'tags', 'url', 'creator', 'year', 'description'];
const transmissionRequired = ['title', 'slug', 'date', 'tags', 'summary'];
const allowedTypes = ['book', 'article', 'video', 'podcast', 'tool'];

export function validateResource(data, filePath) {
  validateRequired(resourceRequired, data, filePath);
  if (!allowedTypes.includes(data.type)) throw new Error(`Invalid frontmatter in ${filePath}\n- type must be one of ${allowedTypes.join(', ')}`);
  if (!Array.isArray(data.tags)) throw new Error(`Invalid frontmatter in ${filePath}\n- tags must be an array`);
  if (Number.isNaN(Number(data.year))) throw new Error(`Invalid frontmatter in ${filePath}\n- year must be a number`);
  return { ...data, year: Number(data.year) };
}

export function validateTransmission(data, filePath) {
  validateRequired(transmissionRequired, data, filePath);
  if (!Array.isArray(data.tags)) throw new Error(`Invalid frontmatter in ${filePath}\n- tags must be an array`);
  return data;
}

function validateRequired(fields, data, filePath) {
  const missing = fields.filter((field) => data[field] === undefined || data[field] === null || data[field] === '');
  if (missing.length > 0) throw new Error(`Invalid frontmatter in ${filePath}\n${missing.map((field) => `- ${field} is required`).join('\n')}`);
}
