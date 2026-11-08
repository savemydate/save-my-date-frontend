export interface LocationInfo {
  name: string;
  address: string;
  time: string;
  googleMapsUrl: string;
  wazeUrl?: string;
  notes?: string;
}

export interface BankAccountInfo {
  bank: string;
  accountHolder: string;
  clabe: string;
  accountNumber?: string;
}

export interface GiftRegistryStore {
  name: string;
  url: string;
  eventNumber?: string;
}

export interface GiftRegistryConfig {
  message: string;
  stores?: GiftRegistryStore[];
  bankAccount?: BankAccountInfo;
}

export interface EventConfig {
  couple: {
    bride: string;
    groom: string;
    title: string;
  };
  date: {
    iso: string; // "2026-11-20T17:00:00"
    display: string; // "20 de Noviembre, 2026"
    time: string; // "5:00 PM"
  };
  locations: {
    ceremony: LocationInfo;
    reception: LocationInfo;
  };
  dressCode: {
    title: string;
    description: string;
    paletteNotes?: string[];
  };
  giftRegistry: GiftRegistryConfig;
  audio?: {
    src: string;
    title: string;
  };
}
