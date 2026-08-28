export interface BuybackObservation {
  source: string; externalId: string; side: "buyback"; title: string; url: string;
  priceYen: number; stock: number; capturedAt: string; condition: "new";
  gtin?: string; manufacturerPartNumber?: string; model: string; capacity?: string;
}
export interface Collector { readonly id:string; collect(at:Date):Promise<BuybackObservation[]>; }
export interface SiteResult { site:string; ok:boolean; count:number; error?:string; }
