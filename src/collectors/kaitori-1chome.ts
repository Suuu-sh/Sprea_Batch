import type {Collector,CollectionTarget,BuybackObservation} from "../types.js";
import {observation,wait} from "./shared.js";

type Detail={allGoodsKbDetailId?:unknown;kbDetailName?:unknown;kbDetailPrice?:unknown};
type Rel={keitaiKbDetailId?:unknown;varPrice?:unknown};
type Color={jan?:unknown;keitaiKbDetailColorRels?:unknown};
type Item={goodsId?:unknown;title?:unknown;jan?:unknown;goodsKbDetails?:unknown;keitaiColorOptions?:unknown};

export class Kaitori1ChomeCollector implements Collector{
 readonly id="kaitori-1chome";
 constructor(private readonly targets:CollectionTarget[],private readonly fetcher:typeof fetch=fetch,private readonly delayMs=1000){}
 async collect(at:Date):Promise<BuybackObservation[]>{const rows:BuybackObservation[]=[];for(const[targetIndex,target]of this.targets.entries()){if(targetIndex)await wait(this.delayMs);try{const url=new URL("https://www.1-chome.com/api/index/findByKeyword");url.search=new URLSearchParams({page:"1",size:"5",keyword:target.gtin}).toString();const response=await this.fetcher(url,{headers:{accept:"application/json","user-agent":"SpreaResearchBot/1.0 (+personal research)"}});if(!response.ok)continue;const payload=await response.json() as {code?:unknown;data?:{content?:unknown}};const items=Array.isArray(payload.data?.content)?payload.data.content as Item[]:[];let best=0,title="",productUrl="https://www.1-chome.com/searchResult";for(const item of items){const details=Array.isArray(item.goodsKbDetails)?item.goodsKbDetails as Detail[]:[];const unopened=details.filter(d=>typeof d.kbDetailName==="string"&&/(?:未開封|新品未使用)/.test(d.kbDetailName));if(String(item.jan)===target.gtin){best=Math.max(best,...unopened.map(d=>Number(d.kbDetailPrice)||0));title=String(item.title??target.title);productUrl=`https://www.1-chome.com/goods?id=${item.goodsId??""}`;}const colors=Array.isArray(item.keitaiColorOptions)?item.keitaiColorOptions as Color[]:[];for(const color of colors){if(String(color.jan)!==target.gtin)continue;const rels=Array.isArray(color.keitaiKbDetailColorRels)?color.keitaiKbDetailColorRels as Rel[]:[];for(const detail of unopened){const rel=rels.find(r=>Number(r.keitaiKbDetailId)===Number(detail.allGoodsKbDetailId));if(rel)best=Math.max(best,(Number(detail.kbDetailPrice)||0)+(Number(rel.varPrice)||0));}title=String(item.title??target.title);productUrl=`https://www.1-chome.com/goods?id=${item.goodsId??""}`;}}if(best>0)rows.push(observation(this.id,target,title,productUrl,best,at));}catch{continue;}}return rows;}
}
