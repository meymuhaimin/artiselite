import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const NewsSearch = () => {
  const [fetchedArticles, setFetchedArticles] = useState([]);

  const fetchArticles = async () => {
    const apiKey = 'a63649f2a73842318d2443617b78ffb1';
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    const data = await response.json();
    return data.articles;
  };

  useEffect(() => {
    const getArticles = async () => {
      const articles = await fetchArticles();
      setFetchedArticles(articles);
    };
    getArticles();
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(fetchedArticles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFetchedArticles(items);
  };

  return (
    <div className="news-search container mx-auto p-20">
      {fetchedArticles.length > 0 ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="articles" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fetchedArticles.map((article, index) => (
                  <Draggable
                    key={article.url}
                    draggableId={article.url}
                    index={index}
                  >
                    {(provided) => (
                      <article
                        className="p-4 bg-white rounded-lg shadow-md"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h2 className="text-lg font-medium mb-2">
                          {article.title}
                        </h2>
                        <p className="text-gray-700 mb-4">
                          {article.description}
                        </p>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Read More
                        </a>
                      </article>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="flex justify-center items-center m-20">
          <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default NewsSearch;
