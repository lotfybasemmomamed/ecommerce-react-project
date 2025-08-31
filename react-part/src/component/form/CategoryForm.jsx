import React, { useEffect, useRef, useState } from "react";
import { addCategory } from "../../apis/categoriesApis";
import { editCategory, getCategoryById } from "../../apis/categoriesApis";
import { useParams } from "react-router-dom";
import Loading from "../Dashboard/Loading";

export default function CategoryForm({ btnMessage }) {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ title: "", image: "" });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (btnMessage === "Edit Category" ) {
      getCategoryById(id).then((res) =>
        setFormData({ title: res.data.title, image: res.data.image })
      );
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("image", formData.image);
    try {
      setLoading(true);
      if (btnMessage === "Add Category") {
        const res = await addCategory(data);
        console.log("add category response is", res);
        window.location.pathname = "dashboard/categories";
      } else if (btnMessage === "Edit Category") {
        await editCategory(id, data).then((res) => {
          console.log(res);
          window.location.pathname = "dashboard/categories";
        });
      }
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loading color="green" />}
      <div className="w-full max-w-xl mx-auto">
        <form
          className="bg-white rounded-2xl shadow p-6 md:p-8 space-y-6 border border-gray-100"
          onSubmit={handleSubmit}
        >
          <header className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">Category</h2>
            <p className="text-sm text-gray-500">Add a title and an image.</p>
          </header>

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Electronics"
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 transition border-gray-300 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image <span className="text-red-500">*</span>
            </label>

            <div className="border-2 border-dashed rounded-2xl p-4 grid gap-4 sm:grid-cols-[120px_1fr] items-center border-gray-300">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={
                      formData.image instanceof File
                        ? URL.createObjectURL(formData.image)
                        : formData.image
                    }
                    alt="category image"
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
                  {formData.image && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, image: "" });
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
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

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="reset"
              className="px-4 py-2 rounded-xl border text-sm font-medium hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700"
              onClick={() =>
                console.log("form data from categoryform", formData)
              }
            >
              {btnMessage}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
