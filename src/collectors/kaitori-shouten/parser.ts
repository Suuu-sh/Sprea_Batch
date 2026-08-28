import {load} from "cheerio";
import type {RawBuybackItem} from "../../types.js";
import {compact,optional,positiveYen} from "../../shared/parser.js";

export function parseKaitoriShouten(html:string,baseUrl:string,fetchedAt:string):RawBuybackItem[]{
 const $=load(html),items:RawBuybackItem[]=[];
 $(".item-product-list").each((_index,element)=>{
  const row=$(element),productName=compact(row.find(".item-title").first().text()),price=positiveYen(row.find(".item-price").first().text());
  if(!productName||!price)return;
  const codeText=compact(row.find(".product-code-row").text()),jan=optional(codeText.match(/JAN\s*[:：]?\s*(\d{8,14})/i)?.[1]);
  const text=compact(row.text()),externalId=optional(row.find("[data-class-id]").first().attr("data-class-id")??row.find("input[name=product_id]").first().attr("value"));
  const modelNumber=optional(row.attr("data-model")??text.match(/(?:型番|モデル)\s*[:：]\s*([A-Z0-9][A-Z0-9\s\/_-]{2,30})/i)?.[1]);
  const stopped=/受付停止|買取不可|休止/.test(text)||row.find(".add-cart:disabled,.add-cart.disabled").length>0;
  items.push({externalId,productName,jan,modelNumber,condition:"new",price,buybackStatus:stopped?"paused":"accepting",productUrl:new URL("/keitai",baseUrl).toString(),fetchedAt});
 });
 return [...new Map(items.map(item=>[item.externalId??`${item.jan}:${item.productName}`,item])).values()];
}

export function kaitoriShoutenLastPage(html:string):number{const matches=[...html.matchAll(/goto_page\(['"]?(\d+)['"]?\)/g)].map(match=>Number(match[1]));return Math.max(1,...matches.filter(Number.isSafeInteger));}
