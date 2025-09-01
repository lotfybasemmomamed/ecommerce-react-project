import React from "react";

function PromotionBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 flex items-center justify-between">
      <div className="text-white space-y-4">
        {/* أزرار صغيرة */}
        <div className="flex space-x-2">
          <span className="bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
            PROMOTION PRICES
          </span>
          <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            PROMOTION PRICES
          </span>
        </div>

        {/* العنوان */}
        <h2 className="text-2xl font-bold max-w-lg">
          New generation Headphones are at  Blue Circuit with limited stocks!
        </h2>

        <div className="flex space-x-6 text-sm font-medium">
          <span className="flex items-center space-x-1">
            <span>✔</span>
            <span>IPHONE 14 PRO MAX</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>✔</span>
            <span>IPHONE 13 PRO MAX</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>✔</span>
            <span>SAMSUNG ULTRA 22 PRO</span>
          </span>
        </div>
      </div>

      <div className="hidden md:block">
        <img
          src="/assets/Headphones.jpg"
          alt="Headphones"
          className="w-64 h-auto rounded-lg"
        />
      </div>
    </div>
  );
}

export default PromotionBanner;
