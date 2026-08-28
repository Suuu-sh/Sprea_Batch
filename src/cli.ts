import {DisabledCollector} from "./disabled-collector.js";
import {ingest} from "./ingest.js";
import {POLICIES} from "./policy.js";
import {runAll} from "./run.js";

const flags={"kaitori-1chome":process.env.ENABLE_KAITORI_1CHOME,"morimori":process.env.ENABLE_MORIMORI,"iosys":process.env.ENABLE_IOSYS};
for(const [id,value] of Object.entries(flags))if(value==="true")throw new Error(`${id} cannot be enabled: compliance policy is disabled`);
const collectors=Object.values(POLICIES).map(policy=>new DisabledCollector(policy));
const results=await runAll(collectors,new Date(),async(site,rows)=>{if(rows.length)await ingest(process.env.SPREA_INGEST_URL??"",process.env.SPREA_INGEST_TOKEN??"",site,rows);});
console.log(JSON.stringify({results}));
// Disabled sites are expected and do not prevent independent sites from running.
// A future enabled collector failure is surfaced in output while other collectors continue.
