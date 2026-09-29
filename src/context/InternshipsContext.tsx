import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Internship } from '../types';
import { fetchInternships } from '../utils/api';

type Status = 'loading' | 'success' | 'error';

interface InternshipsContextValue {
  internships: Internship[];
  status: Status;
  error: string | null;
  reload: () => void;
}

const InternshipsContext = createContext<InternshipsContextValue | null>(null);

export function InternshipsProvider({ children }: { children: ReactNode }) {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const result = await fetchInternships();
      setInternships(result);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const value = useMemo<InternshipsContextValue>(
    () => ({ internships, status, error, reload: () => void load() }),
    [internships, status, error, load]
  );

  return (
    <InternshipsContext.Provider value={value}>
      {children}
    </InternshipsContext.Provider>
  );
}

export function useInternships(): InternshipsContextValue {
  const ctx = useContext(InternshipsContext);
  if (!ctx) {
    throw new Error('useInternships must be used inside <InternshipsProvider>.');
  }
  return ctx;
}