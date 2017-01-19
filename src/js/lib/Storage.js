import localforage from 'localforage';
import Location from './Location';
export let storage = localforage.createInstance({
    driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
    ],
    name: 'GFSDK',
    storeName: Location.getOrigin()
});