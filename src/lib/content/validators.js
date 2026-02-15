const RESOURCE_REQUIRED = ['title', 'slug', 'type', 'tags', 'url', 'creator', 'description'];
const TRANSMISSION_REQUIRED = ['title', 'slug', 'tags', 'summary'];

const RESOURCE_TYPES = ['book', 'article', 'video', 'podcast', 'tool', 'audio'];
const EMBED_TYPES = ['youtube', 'spotify', 'soundcloud', 'applepodcasts', 'audio', 'image', 'video', 'link'];

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

function pushMissing(errors, fields, data) {
  fields.forEach((field) => {
    if (isBlank(data[field])) errors.push(`- ${field} is required`);
  });
}

function parseOptionalYear(value, errors) {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    errors.push('- year must be a number when provided');
    return undefined;
  }
  return parsed;
}

function parseOptionalDate(value, errors) {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') {
    errors.push('- date must be a string when provided');
    return undefined;
  }
  return value;
}

function validateEmbeds(embeds, errors) {
  if (embeds === undefined) return undefined;
  if (!Array.isArray(embeds)) {
    errors.push('- embeds must be an array');
    return undefined;
  }

  return embeds.map((embed, index) => {
    if (!embed || typeof embed !== 'object' || Array.isArray(embed)) {
      errors.push(`- embeds[${index}] must be an object`);
      return embed;
    }

    const type = embed.type ?? embed.kind;
    if (!EMBED_TYPES.includes(type)) {
      errors.push(`- embeds[${index}].type must be one of ${EMBED_TYPES.join(', ')}`);
    }
    if (isBlank(embed.url)) {
      errors.push(`- embeds[${index}].url is required`);
    }
    if (embed.title !== undefined && typeof embed.title !== 'string') {
      errors.push(`- embeds[${index}].title must be a string when provided`);
    }
    if (embed.caption !== undefined && typeof embed.caption !== 'string') {
      errors.push(`- embeds[${index}].caption must be a string when provided`);
    }

    return {
      ...embed,
      type: type || embed.type,
    };
  });
}

function assertValid(errors, filePath) {
  if (errors.length > 0) {
    throw new Error(`Invalid frontmatter in ${filePath}\n${errors.join('\n')}`);
  }
}

export function validateResource(data, filePath) {
  const errors = [];
  pushMissing(errors, RESOURCE_REQUIRED, data);

  if (!RESOURCE_TYPES.includes(data.type)) {
    errors.push(`- type must be one of ${RESOURCE_TYPES.join(', ')}`);
  }
  if (!Array.isArray(data.tags)) {
    errors.push('- tags must be an array');
  }
  if (data.cover !== undefined && typeof data.cover !== 'string') {
    errors.push('- cover must be a string when provided');
  }
  if (data.featured !== undefined && typeof data.featured !== 'boolean') {
    errors.push('- featured must be a boolean when provided');
  }

  const year = parseOptionalYear(data.year, errors);
  const embeds = validateEmbeds(data.embeds, errors);
  assertValid(errors, filePath);

  return {
    ...data,
    featured: data.featured === true,
    year,
    embeds,
  };
}

export function validateTransmission(data, filePath) {
  const errors = [];
  pushMissing(errors, TRANSMISSION_REQUIRED, data);

  if (!Array.isArray(data.tags)) {
    errors.push('- tags must be an array');
  }
  if (data.cover !== undefined && typeof data.cover !== 'string') {
    errors.push('- cover must be a string when provided');
  }
  if (data.audio !== undefined && typeof data.audio !== 'string') {
    errors.push('- audio must be a string when provided');
  }
  if (data.video !== undefined && typeof data.video !== 'string') {
    errors.push('- video must be a string when provided');
  }

  const date = parseOptionalDate(data.date, errors);
  const embeds = validateEmbeds(data.embeds, errors);
  assertValid(errors, filePath);

  return {
    ...data,
    date,
    embeds,
  };
}
