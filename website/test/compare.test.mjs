import { test } from "node:test";
import assert from "node:assert/strict";
import { categories, checked, columns, glance, shortfalls } from "../src/lib/compare.mjs";
import { locales } from "../src/lib/i18n.mjs";

const iso = /^\d{4}-\d{2}-\d{2}$/;
const products = categories.flatMap((category) => category.products);
const facts = categories.flatMap((category) => [...(category.facts ?? []), ...category.products.flatMap((product) => product.facts)]);

// Every text the page shows is written in every language.
function assertTranslated(value, label) {
  for (const locale of locales) {
    assert.equal(typeof value?.[locale], "string", `${label} has ${locale}`);
    assert.ok(value[locale].trim(), `${label} ${locale} is not empty`);
  }
}

test("every fact is written in every language, with an https source and an ISO check date", () => {
  assert.ok(facts.length > 0);
  for (const fact of facts) {
    assertTranslated(fact, fact.source);
    assert.equal(new URL(fact.source).protocol, "https:", fact.source);
    assert.match(fact.checked, iso, fact.source);
    assert.ok(fact.via, `${fact.source} names its publisher`);
  }
});

test("no fact was checked after the date the page shows", () => {
  assert.match(checked, iso);
  for (const fact of facts) assert.ok(fact.checked <= checked, fact.source);
});

test("every product says where Kitewell differs and when to choose the product instead", () => {
  for (const product of products) {
    assert.ok(product.facts.length > 0, `${product.id} has facts`);
    assertTranslated(product.differs, `${product.id} differs`);
    assertTranslated(product.instead, `${product.id} instead`);
  }
});

test("every row of the glance table fills every column, and names a category on the page", () => {
  const ids = new Set(categories.map((category) => category.id));
  assert.equal(columns.en.length, columns.ja.length);
  for (const row of glance) {
    assert.equal(row.cells.length, columns.en.length, row.category ?? row.name.en);
    row.cells.forEach((cell, i) => assertTranslated(cell, `${row.category ?? row.name.en} column ${i}`));
    if (row.category) assert.ok(ids.has(row.category), row.category);
  }
});

test("every shortfall links to the page that explains it", () => {
  for (const item of shortfalls) {
    assertTranslated(item.title, item.href);
    assertTranslated(item.text, item.href);
    assert.match(item.href, /^\/[a-z-/]+\/(#[a-z-]+)?$/);
  }
});
