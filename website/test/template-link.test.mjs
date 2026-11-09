import { test } from "node:test";
import assert from "node:assert/strict";
import { templateLink } from "../src/lib/template-link.mjs";

test("a page's query opens the template it names", () => {
  assert.equal(templateLink("?template=month-end-invoices"), "kitewell://template/month-end-invoices");
});

test("a query that names no template opens nothing", () => {
  for (const search of ["", "?template=", "?template=Invoices", "?template=-a", "?template=a/b", "?template=a%3Fnext%3D1", "?other=a"]) {
    assert.equal(templateLink(search), null, search);
  }
});
