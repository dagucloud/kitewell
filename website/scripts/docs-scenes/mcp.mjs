// MCP and API access: the page with its listener up, the key dialog with its
// permission choices, and the section ChatGPT and Claude are connected from.
const MCP_LISTEN = "127.0.0.1:19742";

// box clips a picture to one element, with a little room around it.
async function box(page, selector, margin = 16) {
  const found = await page.locator(selector).first().boundingBox();
  if (!found) return undefined;
  const x = Math.max(0, found.x - margin);
  const y = Math.max(0, found.y - margin);
  return {
    x,
    y,
    width: Math.min(1440 - x, found.width + margin * 2),
    height: Math.min(900 - y, found.height + margin * 2),
  };
}

// Only one program on a computer can hold the MCP port, and the two services
// the pictures come from share one computer. So the listener is off while
// nothing needs it, and the page's own picture turns it on, takes the
// picture, and turns it off again for the other language's turn.
export async function seed({ api }) {
  if ((await api("/mcp")).body?.config?.enabled) await api("/mcp", { method: "PUT", body: JSON.stringify({ enabled: false, listen: MCP_LISTEN }) });
}

export const scenes = [
  {
    name: "mcp-listening",
    doc: "mcp",
    run: async ({ api, go, until, snap }) => {
      await api("/mcp", { method: "PUT", body: JSON.stringify({ enabled: true, listen: MCP_LISTEN }) });
      const listening = await until(async () => (await api("/mcp")).body?.running, 20_000, 1000);
      if (!listening) throw new Error(`the MCP listener did not come up on ${MCP_LISTEN}; is another Kitewell holding the port?`);
      await go("#mcp", 2500);
      await snap("mcp-listening");
      await api("/mcp", { method: "PUT", body: JSON.stringify({ enabled: false, listen: MCP_LISTEN }) });
    },
  },
  {
    name: "mcp-new-key",
    doc: "mcp",
    run: async ({ page, go, exact, snap }) => {
      await go("#mcp", 2000);
      await page.getByRole("button", { name: await exact("Connect an AI agent") }).first().click();
      await page.waitForTimeout(1200);
      await snap("mcp-new-key", { clip: await box(page, "#modal") });
    },
  },
  {
    name: "mcp-remote",
    doc: "mcp",
    run: async ({ page, go, snap }) => {
      await go("#mcp", 2500);
      await page.locator("#remote-mcp").first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      // A narrow margin keeps the floating assistant tab out of the picture.
      await snap("mcp-remote", { clip: await box(page, "#remote-mcp", 6) });
    },
  },
];
