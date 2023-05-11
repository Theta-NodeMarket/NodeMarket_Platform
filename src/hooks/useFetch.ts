import { useState, useEffect } from "react";

export const useFetchEffect = <T = any>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, options);
      return (await response.json()) as T;
    };
    fetchData().then(setData).catch(setError);
  }, [url, options]);
  return { data, error };
};
