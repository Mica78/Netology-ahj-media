import { test, expect } from "@jest/globals";
import { JSDOM } from "jsdom";
import Form from "../form";

describe("testing App", () => {
  beforeEach(() => {
    const dom = new JSDOM();
    global.window = dom.window;
    global.document = dom.window.document;
  });
  test("with space", () => {
    const res = new Form("body").getValidatedData("51.50851, −0.12572");
    expect(res).toEqual({ latitude: "51.50851", longitude: "−0.12572" });
  });
  test("without space", () => {
    const res = new Form("body").getValidatedData("51.50851,−0.12572");
    expect(res).toEqual({ latitude: "51.50851", longitude: "−0.12572" });
  });
  test("with brackets", () => {
    const res = new Form("body").getValidatedData("[51.50851, −0.12572]");
    expect(res).toEqual({ latitude: "51.50851", longitude: "−0.12572" });
  });
  test("data invalid", () => {
    const form = new Form("body");
    let input = document.querySelector(".nongeo__input");
    input.value = "hjkljg";
    const res = form.isValid;
    expect(res).toBe(false);
  });
  test("no data", () => {
    const form = new Form("body");
    const res = form.isValid;
    expect(res).toBe(false);
  });
  test("data valid", () => {
    const form = new Form("body");
    const input = document.querySelector(".nongeo__input");
    input.value = "51.50851, −0.12572";
    const res = form.isValid;
    expect(res).toBe(true);
  });
});
