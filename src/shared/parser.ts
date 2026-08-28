export const positiveYen=(value:string):number|null=>{const amount=Number(value.normalize("NFKC").replace(/[^0-9]/g,""));return Number.isSafeInteger(amount)&&amount>0?amount:null;};
export const compact=(value:string):string=>value.normalize("NFKC").replace(/\s+/g," ").trim();
export const optional=(value:string|undefined):string|undefined=>{const text=value?compact(value):"";return text||undefined;};
