import type {RawBuybackItem} from "../types.js";
import {HttpClient} from "./http-client.js";

export class ResearchApiClient{
  constructor(private readonly baseUrl:string,private readonly token:string,private readonly http=new HttpClient({timeoutMs:20_000,maxRetries:2})){
    if(!baseUrl||!token)throw new Error("SPREA_INGEST_URL and SPREA_INGEST_TOKEN are required");
  }
  async send(provider:string,items:RawBuybackItem[]):Promise<void>{const url=new URL(this.baseUrl);if(!url.pathname.endsWith("/api/ingest/buyback-quotes"))url.pathname="/api/ingest/buyback-quotes";const response=await this.http.request(url,{method:"POST",headers:{authorization:`Bearer ${this.token}`,"content-type":"application/json",accept:"application/json"},body:JSON.stringify({provider,sourceType:"scraper",quotes:items})});if(!response.ok)throw new Error(`Sprea ingest failed (${response.status})`);}
}
