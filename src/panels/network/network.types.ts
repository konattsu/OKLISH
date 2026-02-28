export interface NetworkRequest {
  id: string;
  method: string;
  url: string;
  status: number;
  statusText: string;
  requestHeaders: Record<string, string>;
  responseHeaders: Record<string, string>;
  requestBody: unknown;
  responseBody: unknown;
  responseType: string;
  startTime: number;
  endTime: number;
  duration: number;
  size: number;
  type: 'fetch' | 'xhr';
  error?: string;
}
