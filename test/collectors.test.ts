import{describe,expect,it,vi}from"vitest";
import{Kaitori1ChomeCollector}from"../src/collectors/kaitori-1chome.js";
import{MorimoriCollector}from"../src/collectors/morimori.js";
import type{CollectionTarget}from"../src/types.js";

const target:CollectionTarget={gtin:"4549995560084",manufacturerPartNumber:"MD4A4J/A",brand:"Apple",model:"iPad",capacity:"128GB",condition:"new",title:"iPad 11-inch",purchasePrice:60000};

describe("enabled buyback collectors",()=>{
 it("calculates 1-chome's unopened variant price for the exact JAN",async()=>{const fetcher=vi.fn(async()=>new Response(JSON.stringify({code:200,data:{content:[{goodsId:1238,title:"2025 iPad 11-inch",jan:null,goodsKbDetails:[{allGoodsKbDetailId:2298,kbDetailName:"未開封",kbDetailPrice:64000}],keitaiColorOptions:[{jan:target.gtin,keitaiKbDetailColorRels:[{keitaiKbDetailId:2298,varPrice:-500}]},{jan:"other",keitaiKbDetailColorRels:[{keitaiKbDetailId:2298,varPrice:9000}]}]}]}}),{status:200}));const rows=await new Kaitori1ChomeCollector([target],fetcher as typeof fetch,0).collect(new Date("2026-08-28T00:00:00Z"));expect(rows).toHaveLength(1);expect(rows[0]).toMatchObject({source:"kaitori-1chome",gtin:target.gtin,priceYen:63500,side:"buyback"});});
 it("extracts Morimori's normal price, not its deposit price",async()=>{const html=`<div class="product-item"><div class="product-details"><a href="/category/x/product/1"><h4 class="search-product-details-name">Apple iPad MD4A4J/A</h4><h4>JAN:${target.gtin}</h4></a></div><div class="price-normal-number">63,600円</div><div class="deposit-price-number">64,540円</div></div>`;const fetcher=vi.fn(async()=>new Response(html,{status:200}));const rows=await new MorimoriCollector([target],fetcher as typeof fetch,0).collect(new Date("2026-08-28T00:00:00Z"));expect(rows).toHaveLength(1);expect(rows[0]).toMatchObject({source:"morimori",gtin:target.gtin,priceYen:63600});expect(rows[0].url).toBe("https://www.morimori-kaitori.jp/category/x/product/1");});
});
