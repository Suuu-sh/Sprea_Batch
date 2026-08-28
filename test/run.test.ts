import{describe,expect,it,vi}from"vitest";
import{runAll}from"../src/run.js";
import{DisabledCollector}from"../src/disabled-collector.js";
import{POLICIES}from"../src/policy.js";
describe("collector isolation",()=>{it("continues after one site fails",async()=>{const good={id:"approved-fixture",collect:vi.fn(async()=>[])};const result=await runAll([new DisabledCollector(POLICIES.iosys),good]);expect(result).toEqual([expect.objectContaining({site:"iosys",ok:false}),{site:"approved-fixture",ok:true,count:0}]);expect(good.collect).toHaveBeenCalled();});it("enables only sites without an explicit prohibition",()=>{expect(POLICIES["kaitori-1chome"].enabled).toBe(true);expect(POLICIES.morimori.enabled).toBe(true);expect(POLICIES.iosys.enabled).toBe(false);});});
