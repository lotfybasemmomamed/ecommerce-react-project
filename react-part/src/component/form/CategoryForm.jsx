import React, { useRef, useState } from "react";

export default function CategoryForm() {
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form className="bg-white rounded-2xl shadow p-6 md:p-8 space-y-6 border border-gray-100">
        <header className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Category</h2>
          <p className="text-sm text-gray-500">Add a title and an image.</p>
        </header>

        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g., Electronics"
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 transition border-gray-300 focus:ring-blue-200"
          />
        </div>

        {/* Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image <span className="text-red-500">*</span>
          </label>

          <div className="border-2 border-dashed rounded-2xl p-4 grid gap-4 sm:grid-cols-[120px_1fr] items-center border-gray-300">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-xs text-gray-400">No image</div>
              )}
            </div>

            <div className="space-y-3">
              <input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="flex gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:opacity-90 active:opacity-80"
                >
                  Choose Image
                </button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="px-4 py-2 rounded-xl border text-sm font-medium hover:bg-gray-50"
                  >
                    Remove
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-500">PNG/JPG up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="reset"
            className="px-4 py-2 rounded-xl border text-sm font-medium hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700"
          >
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
}
