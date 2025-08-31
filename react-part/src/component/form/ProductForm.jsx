import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getCategories } from "../../apis/categoriesApis";
import Loading from "../Dashboard/Loading";
import { addProduct, getProductById } from "../../apis/ProductsApis";
import { addProductImage } from "../../apis/ProductsApis";
import { editProduct } from "../../apis/ProductsApis";
import { useRef } from "react";
import { deleteProductImage } from "../../apis/ProductsApis";
import { useParams } from "react-router-dom";

export default function ProductForm({ message }) {
  const [categoryTitle, setCategoryTitle] = useState("Select a category");
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const disabled = categoryTitle === "Select a category";
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState("");
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const { id } = useParams();
  const imageIds = useRef([]);
  const progressDiv = useRef([]);
  const [deletedImagesId, setDeletedImagesId] = useState([]);
  const CategoryOptions = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.title}
    </option>
  ));
  console.log("product demo Id is: ", productId);
  console.log("uploadProgress is: ", uploadProgress);
  console.log("imageIds is: ", imageIds);

  //get product by id
  useEffect(() => {
    if (message === "Edit Product") {
      setLoading(true);
      getProductById(id).then((res) => {
        setCategoryTitle(res.data[0].category);
        setProductData({
          title: res.data[0].title,
          description: res.data[0].description,
          price: res.data[0].price,
          discount: res.data[0].discount,
          About: res.data[0].About,
        });
        setImages(res.data[0].images);
        console.log("getProductById RES is: ", res);
        setLoading(false);
      });
    }
  }, []);

  //get categories
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((res) => {
        console.log(res);
        setCategories(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  //add demo product
  useEffect(() => {
    if (message === "Add Product" && categoryTitle !== "Select a category") {
      const demoProductData = {
        title: "qqqqqqq",
        description: "RFHfh",
        price: "40",
        category: "8",
        discount: "876",
        About: "dsjhgjg",
      };
      addProduct(demoProductData).then((res) => {
        console.log("res for add demo product is: ", res);
        setProductId(res.data.id);
      });
    }
  }, [disabled]);

  //progress image function
  const progressImagePercent = (progressEvent, index) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );

    setUploadProgress((prev) => {
      const newProgress = [...prev];
      newProgress[index] = percentCompleted;
      return newProgress;
    });
    if (percentCompleted % 20 == 0 && progressDiv.current[index]) {
      // setUploadProgress(percentCompleted);
      // progressDiv.current[index].style.width = percentCompleted + "%";
    }
  };

  //upload image on server
  function handleSubmitImage() {
    // if (!productId) return;

    if (images.length > 0) {
      const productID = message === "Add Product" ? productId : id;

      const imagesAsFiles = images;
      for (let i = 0; imagesAsFiles.length > i; i++) {
        const imagesFormData = new FormData();

        imagesFormData.append("image", imagesAsFiles[i]);
        imagesFormData.append("product_id", productID);
        try {
          addProductImage(imagesFormData, (event) =>
            progressImagePercent(event, i)
          ).then((res) => {
            console.log("addProductImage res is: ", res);
            imageIds.current.push(res.data.id);
          });
        } catch (err) {
          console.log(err);
          alert(err);
        }
      }
    }
  }

  useEffect(() => {
    handleSubmitImage();
  }, [images]);

  //delete product image function
  function DeleteProductImage(index, img) {
    // if (!ID) {
    //   setImages((prev) => prev.filter((image, i) => i !== index));
    //   return;
    // }
    try {
      setLoading(true);
      if (img instanceof File) {
        const ID = imageIds.current[index];
        deleteProductImage(ID).then(() => {
          setImages((prev) => prev.filter((image, i) => i !== index));
          imageIds.current = imageIds.current.filter((id, i) => i !== index);
        });
      } else {
        setDeletedImagesId((prev) => [...prev, img.id]);
        setImages((prev) => prev.filter((image, i) => i !== index));
      }
    } finally {
      setLoading(false);
    }
  }

  //handle submit function
  function handleSubmitForm(e) {
    e.preventDefault();
    const productID = message === "Add Product" ? productId : id;
    try {
      setLoading(true);
      if(message==="Edit Product"&&deletedImagesId.length > 0){
        for(let i=0;deletedImagesId.length>i;i++){
   deleteProductImage(deletedImagesId[i]).then(() => {
          setImages((prev) => prev.filter((image) => image.id !== deletedImagesId[i]));
          imageIds.current = imageIds.current.filter((id) => id !== deletedImagesId[i]);
        });
        }
      
      }
      editProduct(productID, { category: categoryTitle, ...productData }).then(
        (res) => {
          console.log("editProduct res is: ", res);
          window.location.pathname = "/dashboard/products";
        }
      );

      // const hasNewImages = images.some((img) => img instanceof File);
      // if (hasNewImages) {
      //   handleSubmitImage();
      // }
    } catch (err) {
      alert(err.response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loading color="green" />}
      <div className="flex justify-center items-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{message}</h2>

          <form className="space-y-6" onSubmit={handleSubmitForm}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                className="w-full border rounded-xl px-4 py-2 bg-white focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-400"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
              >
                <option value="Select a category" disabled>
                  Select a category
                </option>
                {CategoryOptions}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                disabled={disabled}
                type="text"
                placeholder="Enter product title"
                value={productData.title}
                onChange={(e) =>
                  setProductData({ ...productData, title: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                rows="3"
                disabled={disabled}
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
                placeholder="Enter product description"
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Price
                </label>
                <input
                  type="number"
                  disabled={disabled}
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                  placeholder="Enter price"
                  className="w-full border rounded-xl px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Discount
                </label>
                <input
                  type="number"
                  disabled={disabled}
                  value={productData.discount}
                  onChange={(e) =>
                    setProductData({ ...productData, discount: e.target.value })
                  }
                  placeholder="Enter discount %"
                  className="w-full border rounded-xl px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                About
              </label>
              <textarea
                rows="4"
                value={productData.About}
                onChange={(e) =>
                  setProductData({ ...productData, About: e.target.value })
                }
                placeholder="Enter about product"
                disabled={disabled}
                className="w-full border rounded-xl px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Product Images
              </label>
              <input
                type="file"
                multiple
                disabled={disabled}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 
              file:text-sm file:font-semibold 
              file:bg-blue-50 file:text-blue-700 
              hover:file:bg-blue-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
                onChange={(e) => {
                  const files = e.target.files;
                  const imageList = [];
                  for (let i = 0; i < files.length; i++) {
                    imageList.push(files[i]);
                  }
                  setImages((prev) => [...prev, ...imageList]);
                  // handleSubmitImage();
                }}
              />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative border rounded-xl overflow-hidden shadow-sm p-2"
                  >
                    <img
                      src={
                        img instanceof File
                          ? URL.createObjectURL(img)
                          : img.image
                      }
                      alt="uploaded"
                      className="w-full h-28 object-cover rounded-lg"
                    />
                    {/* progressDiv */}
                    <>
                      {img instanceof File && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            ref={(e) => (progressDiv.current[index] = e)}
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[index] || 0}%` }}
                          ></div>
                        </div>
                      )}
                    </>

                    {uploadProgress[index] === 100 && img instanceof File && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Done
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        DeleteProductImage(index, img);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
