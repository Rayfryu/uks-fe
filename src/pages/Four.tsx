import React, { useState } from "react";
import { articles, CATEGORIES } from "../utils/dataArticle";
import type { Category } from "../utils/dataArticle";
import ArticleCard from "../components/ArticleCard";

const Article: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
          Articles
        </h1>

        {/* Category Filter */}
        <div className="overflow-x-auto pb-2 mb-10">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium
                  transition-colors duration-150 whitespace-nowrap
                  ${
                    activeCategory === category
                      ? "border-gray-900 bg-white text-gray-900"
                      : "border-gray-300 bg-white text-gray-600 hover:border-gray-500 hover:text-gray-800"
                  }
                `}
              >
                {/* Radio dot */}
                <span
                  className={`
                    w-3 h-3 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                    ${
                      activeCategory === category
                        ? "border-gray-900"
                        : "border-gray-400"
                    }
                  `}
                >
                  {activeCategory === category && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-900 block" />
                  )}
                </span>
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 text-lg">
            No articles found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
