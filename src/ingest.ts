import type { BuybackObservation } from "./types.js";
export async function ingest(url:string,token:string,source:string,observations:BuybackObservation[],fetcher:typeof fetch=fetch):Promise<void>{
  if(!url||!token) throw new Error("SPREA_INGEST_URL and SPREA_INGEST_TOKEN are required");
  const response=await fetcher(url,{method:"POST",headers:{authorization:`Bearer ${token}`,"content-type":"application/json"},body:JSON.stringify({runId:`${source}-${Date.now()}`,source,listings:observations})});
  if(!response.ok) throw new Error(`ingest failed (${response.status})`);
}
