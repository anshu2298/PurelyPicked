import { useState } from "react";
import { assets, categories } from "../../assets/assets.js";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [category, setCategogy] = useState("");
  const [description, setDescription] = useState("");
  const { axios } = useAppContext();
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        setName("");
        setCategogy("");
        setDescription("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.success(error.message);
    }
  };

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col '>
      <form
        onSubmit={onSubmitHandler}
        className='md:p-10 p-4 space-y-5 max-w-2xl'
      >
        <div>
          <p className=' font-medium text-xl'>Product Image</p>
          <div className='flex flex-wrap items-center gap-3 mt-2'>
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept='image/*'
                    type='file'
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className='max-w-33 max-h-33 cursor-pointer'
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt='uploadArea'
                    // width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>
        <div className='flex w-full flex-col gap-1 '>
          <label
            className='text-xl font-medium'
            htmlFor='product-name'
          >
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id='product-name'
            type='text'
            placeholder='Type here'
            className='outline-none focus:border-primary w-full md:py-2.5 py-2 px-3 rounded border border-gray-500/40'
            required
          />
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <label
            className='text-xl font-medium'
            htmlFor='product-description'
          >
            Product Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id='product-description'
            rows={4}
            className='outline-none md:py-2.5 py-2 px-3 focus:border-primary rounded border border-gray-500/40 resize-none'
            placeholder='Type here'
          ></textarea>
        </div>
        <div className='w-full flex flex-col gap-1'>
          <label
            className='text-xl font-medium'
            htmlFor='category'
          >
            Category
          </label>
          <select
            onChange={(e) => setCategogy(e.target.value)}
            value={category}
            id='category'
            className='outline-none md:py-2.5 py-2 px-3 rounded border focus:border-primary border-gray-500/40'
          >
            <option
              className='active:bg-primary'
              value=''
            >
              Select Category
            </option>
            {categories.map((category, index) => (
              <option
                key={index}
                value={category.path}
              >
                {category.path}
              </option>
            ))}
          </select>
        </div>
        <div className='flex items-center gap-5 flex-wrap'>
          <div className='flex-1 flex flex-col gap-1 w-32'>
            <label
              className='text-xl font-medium'
              htmlFor='product-price'
            >
              Product Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id='product-price'
              type='number'
              placeholder='0'
              className='outline-none focus:border-primary md:py-2.5 py-2 px-3 rounded border border-gray-500/40'
              required
            />
          </div>
          <div className='flex-1 flex flex-col gap-1 w-32'>
            <label
              className='text-xl font-medium'
              htmlFor='offer-price'
            >
              Offer Price
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id='offer-price'
              type='number'
              placeholder='0'
              className='outline-none focus:border-primary md:py-2.5 py-2 px-3 rounded border border-gray-500/40'
              required
            />
          </div>
        </div>
        <button className='px-8 py-2.5 mt-5 hover:bg-primary-dull bg-primary w-full text-white font-medium rounded cursor-pointer'>
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
