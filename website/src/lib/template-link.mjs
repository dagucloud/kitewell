const templateId = /^[a-z0-9][a-z0-9-]{0,63}$/;

// templateLink returns the link that opens the desktop app at the template a
// page's query names, or nothing when it names none.
export function templateLink(search) {
  const id = new URLSearchParams(search).get("template") ?? "";
  return templateId.test(id) ? `kitewell://template/${id}` : null;
}
