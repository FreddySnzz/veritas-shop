// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeFirestoreData(data: any): any {
  if (Array.isArray(data)) {
    return data.map(serializeFirestoreData);
  };

  if (typeof data === 'object' && data !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serialized: any = {};
    
    for (const key in data) {
      const value = data[key];
      
      if (value && typeof value.toDate === 'function') {
        serialized[key] = value.toDate().toISOString(); 
      } else if (value && typeof value.path === 'string' && value.firestore) {
        serialized[key] = value.path; 
        continue; 
      } else if (typeof value === 'object') {
        serialized[key] = serializeFirestoreData(value);
      } else {
        serialized[key] = value;
      };
    };

    return serialized;
  };

  return data;
};