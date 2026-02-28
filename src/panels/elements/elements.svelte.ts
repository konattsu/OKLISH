import type { DomNodeData } from './elements.types';

let selectedElement = $state<HTMLElement | null>(null);
let inspectMode = $state(false);

export const elementsState = {
  get selectedElement(): HTMLElement | null {
    return selectedElement;
  },
  get inspectMode(): boolean {
    return inspectMode;
  },
  select(el: HTMLElement | null): void {
    selectedElement = el;
  },
  toggleInspect(): void {
    inspectMode = !inspectMode;
  },
  setInspect(v: boolean): void {
    inspectMode = v;
  },
};
