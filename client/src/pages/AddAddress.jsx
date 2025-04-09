/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
  );
};

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    stree: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form
            className='space-y-3 mt-6 text-sm'
            onSubmit={handleSubmit}
          >
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                handleChange={handleChange}
                type='text'
                name='firstName'
                placeholder='First Name'
                address={address}
              />
              <InputField
                handleChange={handleChange}
                type='text'
                name='lastName'
                placeholder='Last Name'
                address={address}
              />
            </div>
            <InputField
              handleChange={handleChange}
              type='text'
              name='email'
              placeholder='Email Address'
              address={address}
            />
            <InputField
              handleChange={handleChange}
              type='text'
              name='street'
              placeholder='Street'
              address={address}
            />
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                handleChange={handleChange}
                type='text'
                name='city'
                placeholder='City'
                address={address}
              />
              <InputField
                handleChange={handleChange}
                type='text'
                name='state'
                placeholder='State'
                address={address}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                handleChange={handleChange}
                type='Number'
                name='zipcode'
                placeholder='Zipcode'
                address={address}
              />
              <InputField
                handleChange={handleChange}
                type='text'
                name='country'
                placeholder='Country'
                address={address}
              />
            </div>
            <InputField
              handleChange={handleChange}
              type='text'
              name='phone'
              placeholder='Phone Number'
              address={address}
            />
            <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase rounded'>
              Save Address
            </button>
          </form>
        </div>
        <img
          className='md:mr-16 mb-16 md:mt-0 '
          src={assets.add_address_iamge}
          alt='add address'
        />
      </div>
    </div>
  );
};

export default AddAddress;
