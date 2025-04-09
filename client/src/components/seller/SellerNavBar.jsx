import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const SellerNavBar = () => {
  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all'>
      <NavLink to='/'>
        <img
          className='h-11'
          src={assets.BrandLogo}
          alt='dummyLogoColored'
        />
      </NavLink>
    </nav>
  );
};

export default SellerNavBar;
