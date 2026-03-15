import { useEffect, useState, type DependencyList } from 'react';

export function useCmsResource<T>(loader: () => Promise<T>, initialValue: T, deps: DependencyList = []) {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await loader();

        if (isMounted) {
          setData(result);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError instanceof Error ? fetchError.message : 'Gagal memuat data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, isLoading, error, setData };
}
