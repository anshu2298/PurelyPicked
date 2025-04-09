import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const PRODUCTS_PER_PAGE = 5;

const ProductList = () => {
  const { products, axios, fetchProducts } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.success(error.message);
    }
  };

  return (
    <div className='no-scrollbar flex-1 h-[95vh] w-full overflow-y-scroll flex flex-col'>
      <div className='w-full md:p-10 p-4'>
        <h2 className='pb-4 text-lg font-medium'>All Products</h2>

        <div className='flex flex-col items-center  w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
          <table className='md:table-auto table-fixed w-full overflow-hidden'>
            <thead className='text-gray-900 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>Product</th>
                <th className='px-4 py-3 font-semibold truncate'>Category</th>
                <th className='px-4 py-3 font-semibold truncate hidden md:block'>
                  Selling Price
                </th>
                <th className='px-4 py-3 font-semibold truncate'>In Stock</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {paginatedProducts.map((product) => (
                <tr
                  key={product._id}
                  className='border-t border-gray-500/20'
                >
                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                    <div className='border border-gray-300 rounded p-2'>
                      <img
                        src={product.image[0]}
                        alt='Product'
                        className='w-16'
                      />
                    </div>
                    <span className='truncate max-sm:hidden w-full'>
                      {product.name}
                    </span>
                  </td>
                  <td className='px-4 py-3'>{product.category}</td>
                  <td className='px-4 py-3 max-sm:hidden'>
                    ₹ {product.offerPrice}
                  </td>
                  <td className='px-4 py-3'>
                    <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                      <input
                        onClick={() =>
                          toggleStock(product._id, !product.inStock)
                        }
                        checked={product.inStock}
                        type='checkbox'
                        className='sr-only peer'
                      />
                      <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors duration-200'></div>
                      <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className='flex pt-16 items-center gap-2 py-4'>
            <button
              type='button'
              aria-label='Previous'
              onClick={() => handlePageClick(currentPage - 1)}
              className='mr-4 disabled:opacity-30'
              disabled={currentPage === 1}
            >
              <svg
                width='9'
                height='16'
                viewBox='0 0 12 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11 1L2 9.24242L11 17'
                  stroke='#111820'
                  strokeOpacity='0.7'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </button>

            <div className='flex gap-2 text-gray-500 text-sm md:text-base'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type='button'
                    onClick={() => handlePageClick(page)}
                    className={`flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square border border-gray-300/60 rounded-sm transition-all ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "hover:bg-gray-300/10"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              type='button'
              aria-label='Next'
              onClick={() => handlePageClick(currentPage + 1)}
              className='ml-4 disabled:opacity-30'
              disabled={currentPage === totalPages}
            >
              <svg
                width='9'
                height='16'
                viewBox='0 0 12 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 1L10 9.24242L1 17'
                  stroke='#111820'
                  strokeOpacity='0.7'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
