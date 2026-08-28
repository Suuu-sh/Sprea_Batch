import {IosysCollector,Kaitori1ChomeCollector,MorimoriCollector} from "./collectors/index.js";import type {BuybackCollector} from "./types.js";import {ResearchApiClient} from "./shared/research-api-client.js";import {runCollectors} from "./runner.js";
const collectors:BuybackCollector[]=[];
if(process.env.ENABLE_IOSYS==="true")throw new Error("iosys cannot be enabled until the documented compliance requirement is resolved");
if(process.env.ENABLE_KAITORI_1CHOME==="true"&&process.env.KAITORI_1CHOME_URL)collectors.push(new Kaitori1ChomeCollector(process.env.KAITORI_1CHOME_URL));
if(process.env.ENABLE_MORIMORI==="true"&&process.env.MORIMORI_URL)collectors.push(new MorimoriCollector(process.env.MORIMORI_URL));
// The implementation is registered and fixture-tested, but intentionally not instantiated yet.
void IosysCollector;
if(!collectors.length){console.log(JSON.stringify({status:"skipped",reason:"no collectors enabled"}));process.exit(0);}
const api=new ResearchApiClient(process.env.SPREA_INGEST_URL??"",process.env.SPREA_INGEST_TOKEN??"");const results=await runCollectors(collectors,(provider,items)=>api.send(provider,items));console.log(JSON.stringify({results}));
