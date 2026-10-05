// The kinds of step a person sees on a chore's run and in a sketched plan.
// They name what a step works on, in the visitor's words, not the YAML action.

export const kinds = {
  website: { en: "Website", ja: "Web サイト" },
  desktop: { en: "Desktop app", ja: "デスクトップアプリ" },
  email: { en: "Email", ja: "メール" },
  excel: { en: "Excel", ja: "Excel" },
  ai: { en: "AI", ja: "AI" },
  agent: { en: "Coding agent", ja: "コーディングエージェント" },
  script: { en: "Script", ja: "スクリプト" },
  server: { en: "Server", ja: "サーバー" },
  api: { en: "API", ja: "API" },
  approval: { en: "Your OK", ja: "あなたの OK" },
  person: { en: "You", ja: "あなた" },
};

export const kindNames = Object.keys(kinds);

// Stroke icons drawn on a 16-unit grid, one per kind.
export const kindIcons = {
  website: '<rect x="1.5" y="2.5" width="13" height="11" rx="2"/><path d="M1.5 5.5h13"/><path d="M4 4h.01M6 4h.01"/>',
  desktop: '<rect x="1.5" y="2.5" width="13" height="8.5" rx="1.5"/><path d="M6 14h4M8 11v3"/>',
  email: '<rect x="1.5" y="3.5" width="13" height="9" rx="1.5"/><path d="m2 4.5 6 4.5 6-4.5"/>',
  excel: '<rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><path d="M1.5 6.5h13M1.5 10h13M6 2.5v11"/>',
  ai: '<path d="M8 1.5c.6 3.2 2.3 4.9 5.5 5.5-3.2.6-4.9 2.3-5.5 5.5-.6-3.2-2.3-4.9-5.5-5.5 3.2-.6 4.9-2.3 5.5-5.5Z"/><path d="M13 11.5v3M11.5 13h3"/>',
  agent: '<rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><path d="m4.5 6.5 2 1.5-2 1.5M8 10h3.5"/>',
  script: '<path d="M5.5 4 2 8l3.5 4M10.5 4 14 8l-3.5 4"/>',
  server: '<rect x="2" y="2" width="12" height="5" rx="1.2"/><rect x="2" y="9" width="12" height="5" rx="1.2"/><path d="M4.5 4.5h.01M4.5 11.5h.01"/>',
  api: '<path d="M6 2v3M10 2v3"/><path d="M4 5h8v3a4 4 0 0 1-8 0V5Z"/><path d="M8 12v2.5"/>',
  approval: '<path d="M8 1.5 13.5 4v4c0 3.3-2.3 5.6-5.5 6.5C4.8 13.6 2.5 11.3 2.5 8V4L8 1.5Z"/><path d="m5.5 8 1.8 1.8L10.8 6"/>',
  person: '<circle cx="8" cy="5" r="2.8"/><path d="M2.5 14.5c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5"/>',
};
