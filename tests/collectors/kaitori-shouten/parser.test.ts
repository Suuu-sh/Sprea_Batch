import {readFileSync} from "node:fs";import {describe,expect,it} from "vitest";import {kaitoriShoutenLastPage,parseKaitoriShouten} from "../../../src/collectors/kaitori-shouten/parser.js";
const html=readFileSync(new URL("../../fixtures/kaitori-shouten.html",import.meta.url),"utf8"),at="2026-08-29T00:00:00Z",items=parseKaitoriShouten(html,"https://www.kaitorishouten-co.jp/",at);
describe("kaitori shouten parser",()=>{
 it("extracts the current public item structure without guessing missing fields",()=>{expect(items).toHaveLength(3);expect(items[0]).toEqual({externalId:"24992",productName:"iPhone 17 Pro Max 256GB 橙",jan:"4549995649291",modelNumber:"MYW03J/A",condition:"new",price:128000,buybackStatus:"accepting",productUrl:"https://www.kaitorishouten-co.jp/keitai",fetchedAt:at});expect(items[2]).toMatchObject({externalId:"24994",price:128000,condition:"new",buybackStatus:"accepting"});expect(items[2].jan).toBeUndefined();expect(items[2].modelNumber).toBeUndefined();});
 it("recognizes stopped buying and excludes invalid price or missing names",()=>{expect(items[1]).toMatchObject({price:128000,buybackStatus:"paused"});expect(items.some(item=>item.externalId==="bad"||item.externalId==="missing")).toBe(false);});
 it("reads bounded pagination metadata",()=>expect(kaitoriShoutenLastPage(html)).toBe(3));
});
