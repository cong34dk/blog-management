import { useState, useEffect } from 'react';
import blogApi from "../api/blogApi";

//Custom Hook fetch data từ Blog API
export default function useFetchDataFromSearch(searchString = "") {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await blogApi.getData('/api/Blog', searchString);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchString]);

  return { data, setData, loading, error };
}
