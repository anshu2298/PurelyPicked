import { categories } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Catagories = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
        {categories.map((item, index) => {
          return (
            <div
              key={index}
              className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center'
              style={{ backgroundColor: item.bgColor }}
              onClick={() => {
                navigate(`/products/${item.path.toLowerCase()}`);
                scrollTo(0, 0);
              }}
            >
              <img
                src={item.image}
                className='group hover:scale-108 transition max-w-28'
              />
              <p className='text-sm font-medium'>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catagories;
