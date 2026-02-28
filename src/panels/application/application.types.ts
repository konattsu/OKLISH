export interface StorageEntry {
  key: string;
  value: string;
}

export type StorageType = 'localStorage' | 'sessionStorage' | 'cookies';
