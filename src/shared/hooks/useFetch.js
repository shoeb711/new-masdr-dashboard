import { useEffect, useState } from "react";

export const useFetch = (baseURl, url, refetchList) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (isMounted) => {
    try {
      const response = await baseURl.get(url, {});
      if (isMounted) {
        setData(response.data);
        setError(null);
      }
    } catch (error) {
      if (isMounted) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchData(isMounted);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, refetchList]);

  const refetchData = () => {
    fetchData(true);
  };

  //set refetchData(true) in your component when you want to refetch data

  return { isLoading, data, error, refetchData };
};
