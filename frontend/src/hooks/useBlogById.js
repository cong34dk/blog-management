import { useState, useEffect } from 'react';
import blogApi from '../api/blogApi';

export default function useBlogById(id) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
        setData({});
        setLoading(false);
        setError('No ID provided');
        return;
      }
  
    const fetchData = async () => {
      try {
        const result = await blogApi.getData(`/api/Blog/${id}`);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
}
