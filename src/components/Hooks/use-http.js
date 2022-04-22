import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sentRequest = useCallback(async (requestData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method ? requestData.method : "Get",
        headers: requestData.headers ? requestData.headers : {},
        body: requestData.body ? JSON.stringify(requestData.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sentRequest,
  };
};

export default useHttp;
