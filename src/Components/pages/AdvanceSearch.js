import React, { useState, useEffect } from 'react';
import NewsList from '../NewsList';

function AdvanceSearch() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const apiKey = 'a63649f2a73842318d2443617b78ffb1'; 

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Fetching error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      const debounceTimeout = setTimeout(() => {
        fetchData();
      }, 500);

      return () => clearTimeout(debounceTimeout);
    }
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="m-20">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for news..."
          className="w-full p-4 border border-gray-600 rounded-lg"
        />
      </div>
      {isLoading ? (
        <div className="m-20">
            <p>Loading...</p>
        </div>
      ) : (
        <NewsList news={articles}/>
      )}
    </>
  );
}

export default AdvanceSearch;
