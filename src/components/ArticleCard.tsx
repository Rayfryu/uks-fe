import React from "react";
import type { Article } from "../utils/dataArticle";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="flex flex-col cursor-pointer group">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1.5 rounded-md shadow-sm">
            {article.category}
          </span>
          <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1.5 rounded-md shadow-sm">
            {article.readTime} min read
          </span>
        </div>
      </div>

      {/* Text Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:underline">
        {article.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {article.description}
      </p>
    </div>
  );
};

export default ArticleCard;
