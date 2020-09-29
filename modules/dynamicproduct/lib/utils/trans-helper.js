function dp_trans(str) {
  const hash = hashCode(str);
  const translation = dp_translations[hash];
  if (translation) {
    return translation;
  }
  return str;
}

function hashCode(str) {
  let hash = 0;
  let i;
  let chr;
  if (str.length === 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

module.exports = {dp_trans, hashCode};
