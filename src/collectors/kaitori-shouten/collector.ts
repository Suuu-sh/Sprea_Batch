import type {BuybackCollector,RawBuybackItem} from "../../types.js";
import {HttpClient} from "../../shared/http-client.js";
import {kaitoriShoutenLastPage,parseKaitoriShouten} from "./parser.js";

const USER_AGENT="Mozilla/5.0 (compatible; SpreaResearchBot/1.0; +https://github.com/Suuu-sh/sprea-collectors)";
export class KaitoriShoutenCollector implements BuybackCollector{
 readonly name="kaitori_shouten";
 constructor(private readonly baseUrl="https://www.kaitorishouten-co.jp/",private readonly maxPages=1,private readonly http=new HttpClient({timeoutMs:20_000,maxRetries:2,userAgent:USER_AGENT})){}
 async collect():Promise<RawBuybackItem[]>{
  const fetchedAt=new Date().toISOString(),firstUrl=new URL("/keitai",this.baseUrl),first=await this.http.request(firstUrl,{headers:{accept:"text/html,application/xhtml+xml"}});
  if(!first.ok)throw new Error(`kaitori shouten fetch failed (${first.status})`);
  const html=await first.text(),items=parseKaitoriShouten(html,this.baseUrl,fetchedAt),lastPage=Math.min(this.maxPages,kaitoriShoutenLastPage(html),10),cookie=first.headers.get("set-cookie")?.split(/,(?=[^;,]+=)/).map(value=>value.split(";",1)[0]).join("; ");
  for(let page=2;page<=lastPage;page++){
   const url=new URL("/products/list_keitai_new/9",this.baseUrl);url.searchParams.set("pageno",String(page));
   const response=await this.http.request(url,{headers:{accept:"text/html",referer:firstUrl.href,"x-requested-with":"XMLHttpRequest",...(cookie?{cookie}:{})}});
   if(!response.ok)throw new Error(`kaitori shouten page ${page} failed (${response.status})`);
   const rows=parseKaitoriShouten(await response.text(),this.baseUrl,fetchedAt);if(!rows.length)break;items.push(...rows);
  }
  if(!items.length)throw new Error("kaitori shouten returned zero valid items; HTML structure may have changed");
  return [...new Map(items.map(item=>[item.externalId??`${item.jan}:${item.productName}`,item])).values()];
 }
}
