import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export function useSupabaseQuery<T>(
  table: string,
  options?: {
    select?: string;
    orderBy?: { column: string; ascending?: boolean };
    filter?: { column: string; value: any };
  }
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let query = supabase.from(table).select(options?.select || '*');

        if (options?.filter) {
          query = query.eq(options.filter.column, options.filter.value);
        }

        if (options?.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true
          });
        }

        const { data: result, error: err } = await query;

        if (err) throw err;
        setData(result as T[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [table, options?.select, options?.orderBy?.column, options?.filter?.column, options?.filter?.value]);

  return { data, loading, error };
}

export function useSupabaseInsert<T>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const insert = async (values: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from(table)
        .insert(values)
        .select()
        .single();

      if (err) throw err;
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { insert, loading, error };
}
