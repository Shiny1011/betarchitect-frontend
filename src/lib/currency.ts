export enum CurrencyCode {
  EUR = 'EUR',
  AUD = 'AUD',
  CAD = 'CAD',
  CZK = 'CZK',
  RON = 'RON',
  USD = 'USD',
  GBP = 'GBP',
  CHF = 'CHF',
  JPY = 'JPY',
  PLN = 'PLN',
  HUF = 'HUF',
}

export const CurrencyNames: Record<CurrencyCode, string> = {
  [CurrencyCode.EUR]: 'Euro',
  [CurrencyCode.AUD]: 'Australian Dollar',
  [CurrencyCode.CAD]: 'Canadian Dollar',
  [CurrencyCode.CZK]: 'Czech Koruna',
  [CurrencyCode.RON]: 'Romanian Leu',
  [CurrencyCode.USD]: 'US Dollar',
  [CurrencyCode.GBP]: 'British Pound',
  [CurrencyCode.CHF]: 'Swiss Franc',
  [CurrencyCode.JPY]: 'Japanese Yen',
  [CurrencyCode.PLN]: 'Polish Zloty',
  [CurrencyCode.HUF]: 'Hungarian Forint',
} as const;

export const CurrencySymbols = {
  [CurrencyCode.EUR]: '€',
  [CurrencyCode.AUD]: 'A$',
  [CurrencyCode.CAD]: 'C$',
  [CurrencyCode.CZK]: 'Kč',
  [CurrencyCode.RON]: 'lei',
  [CurrencyCode.USD]: '$',
  [CurrencyCode.GBP]: '£',
  [CurrencyCode.CHF]: 'CHF',
  [CurrencyCode.JPY]: '¥',
  [CurrencyCode.PLN]: 'zł',
  [CurrencyCode.HUF]: 'Ft',
} as const;

interface Currency {
  code: CurrencyCode;
  name: (typeof CurrencyNames)[CurrencyCode];
  symbol: (typeof CurrencySymbols)[CurrencyCode];
}

export const FIAT_CURRENCIES: Currency[] = [
  { code: CurrencyCode.EUR, name: CurrencyNames[CurrencyCode.EUR], symbol: CurrencySymbols[CurrencyCode.EUR] },
  { code: CurrencyCode.AUD, name: CurrencyNames[CurrencyCode.AUD], symbol: CurrencySymbols[CurrencyCode.AUD] },
  { code: CurrencyCode.CAD, name: CurrencyNames[CurrencyCode.CAD], symbol: CurrencySymbols[CurrencyCode.CAD] },
  { code: CurrencyCode.CZK, name: CurrencyNames[CurrencyCode.CZK], symbol: CurrencySymbols[CurrencyCode.CZK] },
  { code: CurrencyCode.RON, name: CurrencyNames[CurrencyCode.RON], symbol: CurrencySymbols[CurrencyCode.RON] },
  { code: CurrencyCode.USD, name: CurrencyNames[CurrencyCode.USD], symbol: CurrencySymbols[CurrencyCode.USD] },
  { code: CurrencyCode.GBP, name: CurrencyNames[CurrencyCode.GBP], symbol: CurrencySymbols[CurrencyCode.GBP] },
  { code: CurrencyCode.CHF, name: CurrencyNames[CurrencyCode.CHF], symbol: CurrencySymbols[CurrencyCode.CHF] },
  { code: CurrencyCode.JPY, name: CurrencyNames[CurrencyCode.JPY], symbol: CurrencySymbols[CurrencyCode.JPY] },
  { code: CurrencyCode.PLN, name: CurrencyNames[CurrencyCode.PLN], symbol: CurrencySymbols[CurrencyCode.PLN] },
  { code: CurrencyCode.HUF, name: CurrencyNames[CurrencyCode.HUF], symbol: CurrencySymbols[CurrencyCode.HUF] },
];

export const getCurrencyName = (code: CurrencyCode): (typeof CurrencyNames)[CurrencyCode] => {
  return CurrencyNames[code];
};

export const getCurrencySymbol = (code: CurrencyCode): (typeof CurrencySymbols)[CurrencyCode] => {
  return CurrencySymbols[code];
};

export const getCurrency = (code: CurrencyCode): Currency => {
  return {
    code,
    name: getCurrencyName(code),
    symbol: getCurrencySymbol(code),
  };
};

export const isCurrencyCode = (value: string): value is CurrencyCode => {
  return Object.values(CurrencyCode).includes(value as CurrencyCode);
};
