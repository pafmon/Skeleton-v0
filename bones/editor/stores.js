import { writable } from 'svelte/store';

export const zones = writable({});   // { name: { faceCount, colorIdx } }
export const activeZone = writable(null);
export const editMode = writable(false);
export const muscles = writable([]);  // [{ name, origin, insertion, action, innervation }]
