export type SiteId="kaitori-1chome"|"morimori"|"iosys";
export interface Policy { id:SiteId; enabled:boolean; reason:string; officialUrl:string; robotsUrl:string; termsUrl?:string; crawlDelaySeconds?:number; }
export const POLICIES:Record<SiteId,Policy>={
  "kaitori-1chome":{id:"kaitori-1chome",enabled:false,officialUrl:"https://www.1-chome.com/",robotsUrl:"https://www.1-chome.com/robots.txt",reason:"robots.txt returns the SPA HTML rather than valid robots directives, and no site terms granting automated reuse were located."},
  morimori:{id:"morimori",enabled:false,officialUrl:"https://www.morimori-kaitori.jp/",robotsUrl:"https://www.morimori-kaitori.jp/robots.txt",reason:"robots rules do not grant reuse permission and no site terms/API granting automated price collection were located."},
  iosys:{id:"iosys",enabled:false,officialUrl:"https://k-tai-iosys.com/",robotsUrl:"https://k-tai-iosys.com/robots.txt",termsUrl:"https://wp.k-tai-iosys.com/helps/site/terms.php",crawlDelaySeconds:60,reason:"The published terms prohibit commercial use and unauthorized reuse; written/API permission is required."}
};
