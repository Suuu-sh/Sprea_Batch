export type SiteId="kaitori-1chome"|"morimori"|"iosys";
export interface Policy { id:SiteId; enabled:boolean; reason:string; officialUrl:string; robotsUrl:string; termsUrl?:string; crawlDelaySeconds?:number; }
export const POLICIES:Record<SiteId,Policy>={
  "kaitori-1chome":{id:"kaitori-1chome",enabled:true,officialUrl:"https://www.1-chome.com/",robotsUrl:"https://www.1-chome.com/robots.txt",crawlDelaySeconds:1,reason:"No explicit automated-access prohibition was located; use the same public JSON endpoint as the first-party SPA at no more than one request per second."},
  morimori:{id:"morimori",enabled:true,officialUrl:"https://www.morimori-kaitori.jp/",robotsUrl:"https://www.morimori-kaitori.jp/robots.txt",crawlDelaySeconds:5,reason:"No rule applies to SpreaResearchBot and no explicit site-wide scraping prohibition was located; honor the strict observed five-second bot delay."},
  iosys:{id:"iosys",enabled:false,officialUrl:"https://k-tai-iosys.com/",robotsUrl:"https://k-tai-iosys.com/robots.txt",termsUrl:"https://wp.k-tai-iosys.com/helps/site/terms.php",crawlDelaySeconds:60,reason:"The published terms prohibit commercial use and unauthorized reuse; written/API permission is required."}
};
