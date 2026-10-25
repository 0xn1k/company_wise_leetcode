import { useSyncExternalStore } from "react";

// Zustand's `persist` middleware rehydrates from localStorage after the first
// client render, so any component reading persisted state must not render
// that state during SSR/the first paint, or React will warn about a
// hydration mismatch. Gate on this hook and show a neutral/default view
// until mounted. useSyncExternalStore (rather than a useState+useEffect
// toggle) returns the SSR snapshot on the server/first paint and the client
// snapshot after hydration without ever calling setState from an effect.
const subscribe = () => () => {};

export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
