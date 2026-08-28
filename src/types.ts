export type RawBuybackItem = {
  externalId?: string;
  productName: string;
  jan?: string;
  modelNumber?: string;
  brand?: string;
  category?: string;
  condition: "new" | "unused" | "used" | "unknown";
  price: number;
  buybackStatus: "accepting" | "paused" | "unavailable" | "unknown";
  productUrl?: string;
  fetchedAt: string;
};

export interface BuybackCollector {
  readonly name: string;
  collect(): Promise<RawBuybackItem[]>;
}

export type CollectorRunResult = {name:string; ok:boolean; itemCount:number; error?:string};
