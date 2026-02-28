import type { NetworkRequest } from './network.types';

let requests = $state<NetworkRequest[]>([]);
let selectedId = $state<string | null>(null);
let searchQuery = $state('');
let typeFilter = $state<string>('all');

const filteredRequests = $derived(
  requests.filter((req) => {
    if (typeFilter !== 'all' && req.type !== typeFilter) return false;
    if (searchQuery) {
      return req.url.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  })
);

export const networkState = {
  get requests(): NetworkRequest[] {
    return filteredRequests;
  },
  get allRequests(): NetworkRequest[] {
    return requests;
  },
  get selectedId(): string | null {
    return selectedId;
  },
  get selectedRequest(): NetworkRequest | undefined {
    return requests.find(r => r.id === selectedId);
  },
  get searchQuery(): string {
    return searchQuery;
  },
  get typeFilter(): string {
    return typeFilter;
  },
  addRequest(req: NetworkRequest): void {
    requests = [...requests, req];
  },
  select(id: string | null): void {
    selectedId = id;
  },
  setSearch(q: string): void {
    searchQuery = q;
  },
  setTypeFilter(t: string): void {
    typeFilter = t;
  },
  clear(): void {
    requests = [];
    selectedId = null;
  },
};
