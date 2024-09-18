const decodeFromBase64Url = (base64Url) => {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(base64.length + (base64.length % 4), "=");
  const decodedString = atob(paddedBase64);
  return JSON.parse(decodedString);
};

export default decodeFromBase64Url;
