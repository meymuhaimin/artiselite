import React from 'react';

function NewsSearch(props) {
  const { articles = [] } = props;

  const fetchArticles = async () => {
    const apiKey = 'a63649f2a73842318d2443617b78ffb1';

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    const data = await response.json();

    return data.articles;
  };

  const [fetchedArticles, setFetchedArticles] = React.useState([]);

  React.useEffect(() => {
    const getArticles = async () => {
      const articles = await fetchArticles();
      setFetchedArticles(articles);
    };

    getArticles();
  }, []);

  return (
    <div className="news-search grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">

      {fetchedArticles.length > 0 ? (
        fetchedArticles.map((article) => (
          <article
            key={article.url}
            className="p-4 bg-white rounded-lg shadow-md"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <h2 className="text-lg font-medium mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-4">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-blue-500 hover:text-blue-700"
            >
              Read More
            </a>
          </article>
        ))
      ) : (
        <p>Loading articles...</p>
      )}
    </div>
  );
}

export default NewsSearch;
