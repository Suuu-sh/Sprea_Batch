import type { Collector } from "./types.js";
import type { Policy } from "./policy.js";
export class DisabledCollector implements Collector {
  readonly id:string;
  constructor(private readonly policy:Policy){this.id=policy.id;}
  async collect():Promise<never>{throw new Error(`collector disabled by compliance policy: ${this.policy.reason}`);}
}
