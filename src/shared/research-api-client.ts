import type {RawBuybackItem} from "../types.js";
import {HttpClient} from "./http-client.js";

export class ResearchApiClient{
  constructor(private readonly baseUrl:string,private readonly token:string,private readonly http=new HttpClient({timeoutMs:20_000,maxRetries:2})){
    if(!baseUrl||!token)throw new Error("SPREA_INGEST_URL and SPREA_INGEST_TOKEN are required");
  }
  async send(provider:string,items:RawBuybackItem[]):Promise<void>{const url=new URL(this.baseUrl);if(!url.pathname.endsWith("/api/ingest/buyback-quotes"))url.pathname="/api/ingest/buyback-quotes";const response=await this.http.request(url,{method:"POST",headers:{authorization:`Bearer ${this.token}`,"content-type":"application/json",accept:"application/json"},body:JSON.stringify({provider,sourceType:"scraper",quotes:items})});if(!response.ok)throw new Error(`Sprea ingest failed (${response.status})`);}
  async sendBatches(provider:string,items:RawBuybackItem[],batchSize=100):Promise<number>{if(!Number.isInteger(batchSize)||batchSize<1||batchSize>100)throw new Error("batchSize must be between 1 and 100");let sent=0;for(let index=0;index<items.length;index+=batchSize){const batch=items.slice(index,index+batchSize);await this.send(provider,batch);sent+=batch.length;}return sent;}
}
