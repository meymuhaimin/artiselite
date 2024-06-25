import React from 'react';

const NewsList = (props) => {
    const { news = [] } = props;

    return (
        <div className="flex flex-col gap-4 m-20">
        {news.length > 0 ? (news.map((article, index) => (
            <div key={index} className="bg-gray-300 shadow-md rounded-lg overflow-hidden flex">
            <img className="w-1/3 object-cover" src={article.urlToImage} alt={article.title} />
            <div className="p-4 w-2/3">
                <h3 className="text-lg font-medium mb-2">{article.title}</h3>
                <p className="text-gray-600 line-clamp-3">{article.description}</p>
                <a href={article.url} className="text-blue-500 underline mt-2 inline-block">Read More</a>
            </div>
        </div>
        
        ))) : <p>No news found</p>}
        </div>
    );
};

export default NewsList;

