import CapacitorPersistedStore from '$lib/storage/capacitorPersistedStore';

export const firstBootStore = new CapacitorPersistedStore({
    firstBoot: true
}, 'boot');
