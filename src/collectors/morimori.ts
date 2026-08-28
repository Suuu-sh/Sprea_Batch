import {load} from "cheerio";
import type {Collector,CollectionTarget,BuybackObservation} from "../types.js";
import {observation,wait,yen} from "./shared.js";

export class MorimoriCollector implements Collector{
 readonly id="morimori";
 constructor(private readonly targets:CollectionTarget[],private readonly fetcher:typeof fetch=fetch,private readonly delayMs=5000){}
 async collect(at:Date):Promise<BuybackObservation[]>{const rows:BuybackObservation[]=[];for(const[targetIndex,target]of this.targets.entries()){if(targetIndex)await wait(this.delayMs);try{const url=new URL("https://www.morimori-kaitori.jp/search");url.searchParams.set("sk",target.gtin);const response=await this.fetcher(url,{headers:{accept:"text/html","user-agent":"SpreaResearchBot/1.0 (+personal research)"}});if(!response.ok)continue;const $=load(await response.text()),matches:{price:number;title:string;url:string}[]=[];$(".product-item").each((_index,element)=>{const item=$(element),jan=item.find("h4").toArray().map(x=>$(x).text()).find(x=>x.includes("JAN:"))?.replace(/\D/g,"");if(jan!==target.gtin)return;const price=yen(item.find(".price-normal-number").first().text());if(!price)return;const link=item.find(".product-details a").first(),href=link.attr("href")??url.toString(),title=link.find(".search-product-details-name").text().replace(/\s+/g," ").trim()||target.title;matches.push({price,title,url:new URL(href,url).toString()});});const best=matches.sort((a,b)=>b.price-a.price)[0];if(best)rows.push(observation(this.id,target,best.title,best.url,best.price,at));}catch{continue;}}return rows;}
}
