import React from 'react';

const NewsList = (props) => {
    const { news = [] } = props;

    return (
        <div className="flex flex-col gap-4 m-20">
        {news.length > 0 ? (news.map((article, index) => (
            <div key={index} className="shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={article.imageUrl} alt={article.title} />
            <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{article.title}</h3>
                <p className="text-gray-600 line-clamp-3">{article.description}</p>
                <a href={article.url} className="text-blue-500 underline mt-2">Read More</a>
            </div>
            </div>
        ))) : <p>No news found</p>}
        </div>
    );
};

export default NewsList;

