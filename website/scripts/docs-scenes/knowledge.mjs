// Pictures for "Knowledge": the project's pages beside the one that is open.
// The pages are written for the demo project's invoice run, so the picture
// says what the page beside it says.
import { words } from "./_seed.mjs";

const PAGES = {
  en: [
    {
      title: "Supplier portal sign-in",
      text: [
        "The portal password is the secret portal-password. Nobody needs to know it; the workflow reads it.",
        "",
        "## Watch out",
        "",
        "- Sign-in asks for a one-time code on the first run of each month. The code goes to the shared office phone.",
        "- The portal is down for maintenance on the first Sunday of the month. A failed run that day is expected.",
      ].join("\n"),
      job: "invoices",
    },
    {
      title: "Invoice run: what to watch",
      text: [
        "Every weekday at 9:00 this run collects the new invoices, enters them in Ledger, waits for someone to approve, saves them, and emails the office a summary.",
        "",
        "## Watch out",
        "",
        "- The approval holds the run until someone answers it. Nobody approves on a holiday, so Monday's run can carry Friday's invoices too.",
        "- Ledger turns away an invoice with no order number. Those are meant to fail: send them back to the supplier.",
        "",
        "## Fixed before",
        "",
        "2026-09-14: the run stopped at Enter them in Ledger because Ledger renamed its amount field. The step now reads the field by its label.",
      ].join("\n"),
      job: "invoices",
    },
  ],
  ja: [
    {
      title: "取引先ポータルのサインイン",
      text: [
        "ポータルのパスワードはシークレット portal-password です。人が覚える必要はなく、ワークフローが読みます。",
        "",
        "## 注意",
        "",
        "- 毎月はじめの実行では、サインインでワンタイムコードを求められます。コードは共用の事務所の電話に届きます。",
        "- 毎月第 1 日曜はポータルのメンテナンス日です。その日の失敗は想定どおりです。",
      ].join("\n"),
      job: "invoices",
    },
    {
      title: "請求書処理で見ておくこと",
      text: [
        "この実行は毎平日 9:00 に新しい請求書を集め、台帳に入力し、承認を待ち、保存して、概要をメールで送ります。",
        "",
        "## 注意",
        "",
        "- 承認があるまで実行は止まったままです。休日は誰も承認しないので、月曜の実行が金曜の分まで運ぶことがあります。",
        "- 注文番号のない請求書は台帳が受け付けません。これは失敗して当然なので、取引先に差し戻してください。",
        "",
        "## 過去の不具合",
        "",
        "2026-09-14: 台帳が金額の項目名を変えたため、「台帳に入力する」で止まりました。今は項目をラベルで読むようにしています。",
      ].join("\n"),
      job: "invoices",
    },
  ],
  zh: [
    {
      title: "供应商门户登录",
      text: [
        "门户密码存放在密钥 portal-password 中。谁都不需要知道这个密码，由工作流来读取。",
        "",
        "## 注意事项",
        "",
        "- 每月第一次运行时，登录会要求输入一次性验证码。验证码会发到办公室的公用电话上。",
        "- 每月第一个星期日，门户会停机维护。当天运行失败属于预期情况。",
      ].join("\n"),
      job: "invoices",
    },
    {
      title: "发票处理：需要留意的地方",
      text: [
        "每个工作日 9:00，这个运行会收集新发票、录入 Ledger、等待有人批准、保存，然后用邮件把摘要发给办公室。",
        "",
        "## 注意事项",
        "",
        "- 在有人回应审批之前，运行会一直暂停。节假日没有人批准，因此周一的运行可能还包含周五的发票。",
        "- Ledger 会拒收没有订单号的发票。这类发票本就应该失败：请退回给供应商。",
        "",
        "## 修复记录",
        "",
        "2026-09-14：Ledger 更改了金额字段的名称，运行因此停在了“录入到 Ledger”。现在该步骤按标签读取这个字段。",
      ].join("\n"),
      job: "invoices",
    },
  ],
  ko: [
    {
      title: "공급업체 포털 로그인",
      text: [
        "포털 비밀번호는 portal-password라는 시크릿입니다. 아무도 비밀번호를 알 필요가 없습니다. 워크플로가 읽습니다.",
        "",
        "## 주의할 점",
        "",
        "- 매월 첫 실행에서는 로그인할 때 일회용 코드를 요구합니다. 코드는 사무실 공용 전화로 옵니다.",
        "- 매월 첫째 일요일에는 포털이 점검으로 중단됩니다. 그날 실행이 실패하는 것은 예상된 일입니다.",
      ].join("\n"),
      job: "invoices",
    },
    {
      title: "청구서 처리: 눈여겨볼 점",
      text: [
        "이 실행은 평일마다 9:00에 새 청구서를 모아 Ledger에 입력하고, 누군가 승인할 때까지 기다렸다가 저장한 뒤, 사무실에 요약을 이메일로 보냅니다.",
        "",
        "## 주의할 점",
        "",
        "- 승인은 누군가 응답할 때까지 실행을 멈춰 둡니다. 휴일에는 아무도 승인하지 않으므로, 월요일 실행이 금요일 청구서까지 함께 처리할 수 있습니다.",
        "- Ledger는 주문 번호가 없는 청구서를 받지 않습니다. 이런 청구서는 실패하는 것이 정상이니, 공급업체에 돌려보내세요.",
        "",
        "## 이전에 고친 문제",
        "",
        "2026-09-14: Ledger가 금액 필드의 이름을 바꾸는 바람에 실행이 ‘Ledger에 입력하기’에서 멈췄습니다. 이제 이 단계는 필드를 레이블 기준으로 읽습니다.",
      ].join("\n"),
      job: "invoices",
    },
  ],
  fr: [
    {
      title: "Connexion au portail fournisseurs",
      text: [
        "Le mot de passe du portail est le secret portal-password. Personne n’a besoin de le connaître : c’est le workflow qui le lit.",
        "",
        "## Points d’attention",
        "",
        "- À la première exécution de chaque mois, la connexion demande un code à usage unique. Ce code arrive sur le téléphone partagé du bureau.",
        "- Le portail est en maintenance le premier dimanche du mois. Une exécution en échec ce jour-là est normale.",
      ].join("\n"),
      job: "invoices",
    },
    {
      title: "Traitement des factures : ce qu’il faut surveiller",
      text: [
        "Chaque jour ouvré à 9:00, ce traitement récupère les nouvelles factures, les saisit dans Ledger, attend qu’une personne approuve, les enregistre, puis envoie un résumé par e-mail au bureau.",
        "",
        "## Points d’attention",
        "",
        "- L’approbation bloque l’exécution jusqu’à ce que quelqu’un y réponde. Personne n’approuve les jours fériés : l’exécution du lundi peut donc aussi contenir les factures du vendredi.",
        "- Ledger refuse toute facture sans numéro de commande. Ces factures sont censées échouer : renvoyez-les au fournisseur.",
        "",
        "## Déjà corrigé",
        "",
        "14/09/2026 : l’exécution s’est arrêtée à l’étape « Les saisir dans Ledger », car Ledger avait renommé son champ de montant. L’étape lit désormais le champ d’après son libellé.",
      ].join("\n"),
      job: "invoices",
    },
  ],
  de: [
    {
      title: "Anmeldung im Lieferantenportal",
      text: [
        "Das Portal-Passwort steht im Secret portal-password. Niemand muss es kennen; der Workflow liest es aus.",
        "",
        "## Achtung",
        "",
        "- Bei der ersten Ausführung jedes Monats verlangt die Anmeldung einen Einmalcode. Der Code geht an das gemeinsame Bürotelefon.",
        "- Am ersten Sonntag im Monat ist das Portal wegen Wartung nicht erreichbar. Eine fehlgeschlagene Ausführung an diesem Tag ist zu erwarten.",
      ].join("\n"),
      job: "invoices",
    },
    {
      title: "Rechnungslauf: worauf zu achten ist",
      text: [
        "Jeden Werktag um 9:00 sammelt dieser Rechnungslauf die neuen Rechnungen, erfasst sie in Ledger, wartet, bis jemand genehmigt, speichert sie und schickt dem Büro eine Zusammenfassung per E-Mail.",
        "",
        "## Achtung",
        "",
        "- Die Genehmigung hält die Ausführung an, bis jemand antwortet. An einem Feiertag genehmigt niemand, deshalb kann die Ausführung am Montag auch die Rechnungen vom Freitag enthalten.",
        "- Ledger lehnt Rechnungen ohne Bestellnummer ab. Diese Fehlschläge sind gewollt: Schicken Sie solche Rechnungen an den Lieferanten zurück.",
        "",
        "## Bereits behoben",
        "",
        "14.09.2026: Die Ausführung blieb bei „In Ledger erfassen“ stehen, weil Ledger sein Betragsfeld umbenannt hatte. Der Schritt liest das Feld jetzt über seine Beschriftung.",
      ].join("\n"),
      job: "invoices",
    },
  ],
};

// seed writes the two pages the picture shows. A page already there is
// brought to this text rather than added again, so the service can be
// captured as often as it likes.
export async function seed({ lang, api }) {
  const w = words(lang);
  const jobs = (await api("/jobs")).body ?? [];
  const pages = ((await api("/knowledge")).body ?? {}).pages ?? [];
  for (const page of PAGES[lang]) {
    const job = jobs.find((item) => item.name === w[page.job].name);
    const body = JSON.stringify({ title: page.title, text: page.text, workflows: job ? [job.id] : [] });
    const existing = pages.find((item) => item.title === page.title);
    if (!existing) {
      await api("/knowledge", { method: "POST", body });
      continue;
    }
    if (existing.text === page.text) continue;
    await api(`/knowledge/${existing.id}`, { method: "PUT", headers: { "If-Match": `"${existing.version}"` }, body });
  }
}

export const scenes = [
  {
    name: "knowledge-pages",
    doc: "knowledge",
    run: async ({ go, snap }) => {
      await go("#knowledge", 2500);
      await snap("knowledge-pages");
    },
  },
];
