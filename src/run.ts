import type { Collector,SiteResult } from "./types.js";
export async function runAll(collectors:Collector[],at=new Date(),send?:(site:string,rows:Awaited<ReturnType<Collector["collect"]>>)=>Promise<void>):Promise<SiteResult[]>{
  return Promise.all(collectors.map(async collector=>{try{const rows=await collector.collect(at);if(send)await send(collector.id,rows);return{site:collector.id,ok:true,count:rows.length};}catch(error){return{site:collector.id,ok:false,count:0,error:error instanceof Error?error.message:"unknown error"};}}));
}
