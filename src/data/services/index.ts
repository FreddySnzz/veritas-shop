export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const res = await fetch(`/api/${endpoint}`, { cache: "no-store" });
    
    if (!res.ok) throw new Error(`Erro ao buscar ${endpoint}`);
    return res.json();
  },

  post: async <T>(
    endpoint: string, 
    body: any
  ): Promise<T> => {
    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    if (!res.ok) throw new Error(`Failed request to ${endpoint}`);
    return res.json();
  },
};