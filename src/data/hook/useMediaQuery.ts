import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setMatches("matches" in e ? e.matches : (e as MediaQueryList).matches);
    handler(mql);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mql.addEventListener("change", handler as any);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => mql.removeEventListener("change", handler as any);
  }, [query]);
  
  return matches;
}