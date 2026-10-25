// Best-effort company-name -> domain mapping used only to fetch a small
// favicon for visual recognition (see CompanyLogo). Not authoritative data:
// most entries fall back to a cheap heuristic (strip punctuation, add
// ".com"), which is right for the large majority of single/compound-word
// company names. This override map corrects the known cases where that
// heuristic would point at the wrong domain. Resolution always degrades
// gracefully to a generic icon if the favicon fails to load.
const OVERRIDES: Record<string, string> = {
  "Airbus SE": "airbus.com",
  "Apollo.io": "apollo.io",
  "AQR Capital Management": "aqr.com",
  Aurora: "aurora.tech",
  Avito: "avito.ru",
  "Bentley Systems": "bentley.com",
  "BILL Holdings": "bill.com",
  Block: "block.xyz",
  "Booking.com": "booking.com",
  "Bridgewater Associates": "bridgewater.com",
  Confluent: "confluent.io",
  Coursera: "coursera.org",
  CRED: "cred.club",
  Cruise: "getcruise.com",
  CureFit: "cure.fit",
  Datadog: "datadoghq.com",
  "DE Shaw": "deshaw.com",
  Deliveroo: "deliveroo.co.uk",
  "Deutsche Bank": "db.com",
  DevRev: "devrev.ai",
  Devtron: "devtron.ai",
  "DXC Technology": "dxc.com",
  "Electronic Arts": "ea.com",
  "EPAM Systems": "epam.com",
  "Epic Systems": "epic.com",
  Freecharge: "freecharge.in",
  "GE Digital": "ge.com",
  "General Motors": "gm.com",
  Groww: "groww.in",
  Harness: "harness.io",
  HCL: "hcltech.com",
  Hiver: "hiverhq.com",
  "Hudson River Trading": "hudson-trading.com",
  "Juniper Networks": "juniper.net",
  Juspay: "juspay.in",
  Kakao: "kakaocorp.com",
  "Lendingkart Technologies": "lendingkart.com",
  Licious: "licious.in",
  Liftoff: "liftoff.io",
  LINE: "line.me",
  Lucid: "lucidmotors.com",
  "Media.net": "media.net",
  Millennium: "mlp.com",
  Mountblue: "mountblue.io",
  "National Instruments": "ni.com",
  Niantic: "nianticlabs.com",
  Notion: "notion.so",
  Nuro: "nuro.ai",
  "Otter.ai": "otter.ai",
  oyo: "oyorooms.com",
  Ozon: "ozon.ru",
  "Palantir Technologies": "palantir.com",
  PayPay: "paypay.ne.jp",
  Peloton: "onepeloton.com",
  "persistent systems": "persistent.com",
  "Pony.ai": "pony.ai",
  redbus: "redbus.in",
  "Scale AI": "scale.com",
  Sentry: "sentry.io",
  Slice: "sliceit.com",
  SOTI: "soti.net",
  "Squarepoint Capital": "squarepoint-capital.com",
  "Texas Instruments": "ti.com",
  Tinkoff: "tinkoff.ru",
  Toast: "toasttab.com",
  "Tower Research Capital": "tower-research.com",
  Twitch: "twitch.tv",
  Valve: "valvesoftware.com",
  "Veeva Systems": "veeva.com",
  "Virtu Financial": "virtu.com",
  WeRide: "weride.ai",
  WinZO: "winzogames.com",
  "Wissen Technology": "wissen.com",
  Zepto: "zeptonow.com",
  Zoom: "zoom.us",
  "ZS Associates": "zs.com",
};

// Companies to never attempt a logo lookup for (inappropriate to hotlink).
const SKIP = new Set(["PornHub"]);

function heuristicDomain(name: string): string {
  return `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
}

export function getCompanyDomain(name: string): string | null {
  if (SKIP.has(name)) return null;
  return OVERRIDES[name] ?? heuristicDomain(name);
}
