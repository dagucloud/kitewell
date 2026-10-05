// Import an API: the library with one service imported, and the screen that
// connects it. The service is invented for this page, so the seed writes its
// OpenAPI document itself; nothing is fetched and no request is ever sent.
const WORDS = {
  en: {
    title: "Support desk · apis page",
    description: "The help desk Harbor Supply raises tickets in.",
    secretNote: "Support desk token · apis page",
    findCustomer: "Find a customer",
    listTickets: "List open tickets",
    raiseTicket: "Raise a ticket",
    customerId: "The customer's number in the support desk.",
    subject: "One line saying what the ticket is about.",
    body: "What happened, in full.",
  },
  ja: {
    title: "サポート窓口 · apis ページ",
    description: "みなと資材が問い合わせ票を起票する窓口です。",
    secretNote: "サポート窓口のトークン · apis ページ",
    findCustomer: "顧客を照会する",
    listTickets: "未対応の問い合わせ票を一覧する",
    raiseTicket: "問い合わせ票を起票する",
    customerId: "サポート窓口での顧客番号です。",
    subject: "問い合わせ票の件名を 1 行で書きます。",
    body: "何が起きたかを詳しく書きます。",
  },
};

const API_ID = "apis-support-desk";
const SECRET_REF = "apis-page/support-token";

const document = (w) => `openapi: 3.0.3
info:
  title: ${w.title}
  version: "1.4"
  description: ${w.description}
servers:
  - url: https://api.example.com/v1
security:
  - bearerAuth: []
paths:
  /customers/{customerId}:
    get:
      operationId: findCustomer
      summary: ${w.findCustomer}
      parameters:
        - name: customerId
          in: path
          required: true
          description: ${w.customerId}
          schema: {type: string, example: "C-10428"}
      responses:
        "200":
          description: ${w.findCustomer}
          content:
            application/json:
              schema:
                type: object
                properties:
                  id: {type: string}
                  name: {type: string}
                  email: {type: string, format: email}
                  plan: {type: string}
  /tickets:
    get:
      operationId: listTickets
      summary: ${w.listTickets}
      parameters:
        - name: status
          in: query
          required: false
          schema: {type: string, enum: [open, pending, closed]}
        - name: limit
          in: query
          required: false
          schema: {type: integer, example: 25}
      responses:
        "200":
          description: ${w.listTickets}
          content:
            application/json:
              schema:
                type: object
                properties:
                  tickets:
                    type: array
                    items:
                      type: object
                      properties:
                        id: {type: string}
                        subject: {type: string}
    post:
      operationId: raiseTicket
      summary: ${w.raiseTicket}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [customerId, subject]
              properties:
                customerId: {type: string, example: "C-10428"}
                subject: {type: string, description: ${JSON.stringify(w.subject)}}
                body: {type: string, description: ${JSON.stringify(w.body)}}
      responses:
        "201":
          description: ${w.raiseTicket}
          content:
            application/json:
              schema:
                type: object
                properties:
                  id: {type: string}
                  url: {type: string}
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
`;

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

export async function seed({ lang, api, go }) {
  const w = WORDS[lang];
  await go("#apis", 1500);
  const existing = (await api("/apis")).body?.apis ?? {};
  if (existing[API_ID]) return;
  const secrets = (await api("/secrets")).body;
  const list = Array.isArray(secrets) ? secrets : (secrets?.secrets ?? []);
  if (!list.some((secret) => secret.ref === SECRET_REF)) {
    await api("/secrets", { method: "POST", body: JSON.stringify({ ref: SECRET_REF, description: w.secretNote, value: "demo-token" }) });
  }
  const spec = document(w);
  const preview = await api("/apis/preview", { method: "POST", body: JSON.stringify({ spec }) });
  if (preview.status !== 200) throw new Error(`preview refused the document: ${JSON.stringify(preview.body)}`);
  const saved = await api(`/apis/${API_ID}`, {
    method: "PUT",
    headers: { "If-Match": '""' },
    body: JSON.stringify({
      name: w.title,
      description: w.description,
      baseUrl: "https://api.example.com/v1",
      spec,
      auth: { type: "bearer", secretRef: SECRET_REF },
    }),
  });
  if (saved.status !== 200) throw new Error(`saving the API failed: ${JSON.stringify(saved.body)}`);
}

export const scenes = [
  {
    name: "api-library",
    doc: "apis",
    run: async ({ go, snap }) => {
      await go("#apis", 2500);
      await snap("api-library");
    },
  },
  {
    name: "api-actions",
    doc: "apis",
    run: async ({ page, go, snap }) => {
      await go("#apis", 2500);
      await page.locator(`[data-api-edit="${API_ID}"]`).first().click();
      await page.waitForTimeout(2000);
      await snap("api-actions", { clip: await box(page, "#api-connection", 12) });
    },
  },
];
