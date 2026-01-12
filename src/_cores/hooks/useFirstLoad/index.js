// -- libraries
import { useState, useEffect, useCallback } from 'react';

const useFirstLoad = (modelFn) => {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const handleFetch = async () => {
      setReady(false);
      setLoading(true);
      try {
        const { data: dataResponse, error: errorResponse } = await modelFn();
        if (errorResponse) {
          setError(true);
        } else {
          setData(dataResponse);
          setError(false);
        }
      } finally {
        setReady(true);
        setLoading(false);
      }
    };

    handleFetch();
  }, [modelFn, trigger]);

  return {
    ready,
    loading,
    data,
    error,
    refetch
  };
};

export default useFirstLoad;
