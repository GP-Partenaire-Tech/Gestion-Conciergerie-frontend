// src/services/storage.ts

export interface OfflineTask {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  synced: boolean;
}

const DB_NAME = 'elite-concierge-db';
const DB_VERSION = 1;
const STORE_NAME = 'tasks';

const getDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('by-sync', 'synced', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const storage = {
  async saveTask(task: { id: string; title: string; status: 'pending' | 'completed'; synced: boolean }): Promise<void> {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.put({ ...task, updatedAt: Date.now() });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
};