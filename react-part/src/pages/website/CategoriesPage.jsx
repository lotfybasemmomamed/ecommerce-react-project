import React, { useEffect, useState } from "react";
import { getCategories } from "../../apis/categoriesApis";
import WebsiteLoading from "../../component/Website/WebsiteLoading";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <WebsiteLoading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-10 border-b-4 border-blue-600 inline-block pb-2">
        Shop by Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
          >
            <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600">
                {cat.title}
              </h2>
              {cat.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
