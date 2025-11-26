"use client";

import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T>(url: string, skip = false): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !skip,
    error: null,
  });

  useEffect(() => {
    if (skip) return;

    let mounted = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Veri alınamadı");
        const json = (await res.json()) as T;
        if (mounted) {
          setState({ data: json, loading: false, error: null });
        }
      } catch (err) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : "Bilinmeyen hata",
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [url, skip]);

  return state;
};

