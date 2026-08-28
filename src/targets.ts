import type {CollectionTarget} from "./types.js";

export async function fetchTargets(ingestUrl:string,token:string,fetcher:typeof fetch=fetch):Promise<CollectionTarget[]>{
 if(!ingestUrl||!token)throw new Error("SPREA_INGEST_URL and SPREA_INGEST_TOKEN are required");
 const url=new URL(ingestUrl);url.pathname="/api/ingest/targets";url.search="?limit=100";
 const response=await fetcher(url,{headers:{authorization:`Bearer ${token}`,accept:"application/json"}});
 if(!response.ok)throw new Error(`target fetch failed (${response.status})`);
 const payload=await response.json() as {targets?:unknown};
 if(!Array.isArray(payload.targets))throw new Error("invalid target response");
 return payload.targets.filter((x):x is CollectionTarget=>Boolean(x)&&typeof x==="object"&&/^\d{8,14}$/.test(String((x as CollectionTarget).gtin))&&typeof(x as CollectionTarget).model==="string"&&Number.isInteger((x as CollectionTarget).purchasePrice));
}
