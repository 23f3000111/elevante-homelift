/**
 * A tiny value store shared between the scroll runtime (which writes) and a
 * renderer (which reads on its own frame). It never touches React state, so
 * scrolling costs no re-renders.
 */
export interface ProgressStore {
  get(): number;
  set(value: number): void;
  subscribe(fn: (value: number) => void): () => void;
}

export function createProgress(initial = 0): ProgressStore {
  let value = initial;
  const listeners = new Set<(v: number) => void>();
  return {
    get: () => value,
    set(v) {
      if (v === value) return;
      value = v;
      listeners.forEach((fn) => fn(v));
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
  };
}
