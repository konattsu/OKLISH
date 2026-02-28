export interface DomNodeData {
  id: string;
  tagName: string;
  attributes: Record<string, string>;
  children: DomNodeData[];
  textContent?: string;
  nodeType: number;
}

export interface StyleRule {
  property: string;
  value: string;
  source: string;
}
