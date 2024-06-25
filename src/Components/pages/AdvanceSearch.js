import React, { useState, useEffect } from 'react';
import NewsList from '../NewsList';

const NewsPerPage = 10;

function AdvanceSearch() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [language, setLanguage] = useState('en');
  const [sortBy, setSortBy] = useState('publishedAt');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const apiKey = 'a63649f2a73842318d2443617b78ffb1'; 

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = new URL('https://newsapi.org/v2/everything');
        url.searchParams.append('q', searchTerm);
        url.searchParams.append('apiKey', apiKey);
        if (fromDate) url.searchParams.append('from', fromDate);
        if (toDate) url.searchParams.append('to', toDate);
        if (language) url.searchParams.append('language', language);
        if (sortBy) url.searchParams.append('sortBy', sortBy);
        if (source) url.searchParams.append('sources', source);
        if (category) url.searchParams.append('category', category);
        url.searchParams.append('pageSize', NewsPerPage);
        url.searchParams.append('page', currentPage);

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (currentPage === 1) {
          setArticles(data.articles);
        } else {
          setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        }
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error('Fetching error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm || fromDate || toDate || language || sortBy || source || category) {
      const debounceTimeout = setTimeout(() => {
        fetchData();
      }, 500);

      return () => clearTimeout(debounceTimeout);
    }
  }, [searchTerm, fromDate, toDate, language, sortBy, source, category, currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const isEndOfResults = articles.length >= totalResults;
  console.log(articles.length)

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
        <div className="mt-4">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="mr-4 p-2 border border-gray-600 rounded-lg"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="mr-4 p-2 border border-gray-600 rounded-lg"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mr-4 p-2 border border-gray-600 rounded-lg"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mr-4 p-2 border border-gray-600 rounded-lg"
          >
            <option value="publishedAt">Published At</option>
            <option value="relevancy">Relevancy</option>
            <option value="popularity">Popularity</option>
          </select>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="mr-4 p-2 border border-gray-600 rounded-lg"
          >
            <option value="">All Sources</option>
            <option value="bbc-news">BBC News</option>
            <option value="cnn">CNN</option>
            <option value="fox-news">Fox News</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mr-4 p-2 border border-gray-600 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="m-20">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <NewsList news={articles} />
          {!isEndOfResults && (
            <button className="flex mx-auto my-4 p-2 border border-gray-600 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-700 focus:outline-none" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </>
  );
}

export default AdvanceSearch;
