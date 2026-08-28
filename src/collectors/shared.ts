import type {BuybackObservation,CollectionTarget} from "../types.js";

export const wait=(ms:number)=>new Promise(resolve=>setTimeout(resolve,ms));
export const yen=(value:string)=>{const n=Number(value.replace(/[^0-9]/g,""));return Number.isSafeInteger(n)&&n>0?n:null;};
export function observation(source:string,target:CollectionTarget,title:string,url:string,priceYen:number,at:Date):BuybackObservation{return{source,externalId:`${target.gtin}:new`,side:"buyback",title,url,priceYen,stock:1,capturedAt:at.toISOString(),condition:"new",gtin:target.gtin,manufacturerPartNumber:target.manufacturerPartNumber,model:target.model,capacity:target.capacity};}
