import {DisabledCollector} from "./disabled-collector.js";
import {ingest} from "./ingest.js";
import {POLICIES} from "./policy.js";
import {runAll} from "./run.js";
import {fetchTargets} from "./targets.js";
import {Kaitori1ChomeCollector} from "./collectors/kaitori-1chome.js";
import {MorimoriCollector} from "./collectors/morimori.js";

const ingestUrl=process.env.SPREA_INGEST_URL??"",token=process.env.SPREA_INGEST_TOKEN??"";
if(process.env.ENABLE_IOSYS==="true")throw new Error("iosys cannot be enabled: compliance policy is disabled");
const targets=await fetchTargets(ingestUrl,token);
const collectors=[new Kaitori1ChomeCollector(targets),new MorimoriCollector(targets),new DisabledCollector(POLICIES.iosys)];
const results=await runAll(collectors,new Date(),async(site,rows)=>{if(rows.length)await ingest(process.env.SPREA_INGEST_URL??"",process.env.SPREA_INGEST_TOKEN??"",site,rows);});
console.log(JSON.stringify({results}));
// Disabled sites are expected and do not prevent independent sites from running.
// A future enabled collector failure is surfaced in output while other collectors continue.
