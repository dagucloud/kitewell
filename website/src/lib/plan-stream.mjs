// Reads a JSON object as it streams in and reports each top-level field the
// moment its value is complete, and each item of one array field as the item
// completes, so a sketch can show its steps one by one.

export function jsonFields({ onField, onItem, arrayKey }) {
  let text = "";
  let at = 0;
  let depth = 0;
  let inString = false;
  let escaped = false;
  let expectKey = false;
  let keyStart = -1;
  let key = null;
  let valueStart = -1;
  let itemStart = -1;

  const parse = (from, to) => JSON.parse(text.slice(from, to));
  const finishValue = (end) => {
    if (key !== arrayKey) onField(key, parse(valueStart, end));
    valueStart = -1;
  };

  return function push(chunk) {
    text += chunk;
    for (; at < text.length; at++) {
      const c = text[at];
      if (inString) {
        if (escaped) escaped = false;
        else if (c === "\\") escaped = true;
        else if (c === '"') {
          inString = false;
          if (depth === 1 && keyStart >= 0) {
            key = parse(keyStart, at + 1);
            keyStart = -1;
          } else if (depth === 1 && valueStart >= 0) {
            finishValue(at + 1);
          }
        }
        continue;
      }
      if (c === '"') {
        inString = true;
        if (depth === 1 && expectKey) keyStart = at;
        else if (depth === 1 && valueStart < 0) valueStart = at;
      } else if (c === "{" || c === "[") {
        if (depth === 0) expectKey = true;
        else if (depth === 1 && valueStart < 0) valueStart = at;
        else if (depth === 2 && key === arrayKey && itemStart < 0) itemStart = at;
        depth++;
      } else if (c === "}" || c === "]") {
        if (depth === 1 && valueStart >= 0) finishValue(at);
        depth--;
        if (depth === 2 && key === arrayKey && itemStart >= 0) {
          onItem(parse(itemStart, at + 1));
          itemStart = -1;
        } else if (depth === 1 && valueStart >= 0) {
          finishValue(at + 1);
        }
      } else if (depth === 1) {
        if (c === ":") expectKey = false;
        else if (c === ",") {
          if (valueStart >= 0) finishValue(at);
          expectKey = true;
        } else if (!expectKey && valueStart < 0 && !/\s/.test(c)) {
          valueStart = at;
        }
      }
    }
  };
}

// Writes one server-sent event.
export function sse(event, data) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}
