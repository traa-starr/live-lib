export default class MiniSearch {
  constructor({ idField = 'id', fields = [] } = {}) {
    this.idField = idField;
    this.fields = fields;
    this.docs = [];
  }

  addAll(docs) {
    this.docs.push(...docs.map((doc) => ({ ...doc, __blob: this.fields.map((field) => String(doc[field] ?? '')).join(' ').toLowerCase() })));
  }

  search(query = '') {
    const q = query.trim().toLowerCase();
    if (!q) return this.docs.map((doc) => ({ id: doc[this.idField], score: 1 }));
    return this.docs
      .map((doc) => ({ id: doc[this.idField], score: scoreBlob(doc.__blob, q) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);
  }
}

function scoreBlob(blob, query) {
  if (blob.includes(query)) return 10 + query.length;
  const terms = query.split(/\s+/).filter(Boolean);
  let score = 0;
  for (const term of terms) {
    if (blob.includes(term)) score += 2;
  }
  return score;
}
