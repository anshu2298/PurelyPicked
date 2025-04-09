import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import SellerNavBar from "./SellerNavBar";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });

      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    !isSeller && (
      <div className='max-h-screen overflow-hidden'>
        <SellerNavBar />
        <form
          onSubmit={handleSubmit}
          className='min-h-screen flex items-center text-sm'
        >
          <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-300'>
            <p className='text-2xl font-medium m-auto'>
              <span className='text-primary'>ADMIN</span> LOGIN
            </p>
            <div className='w-full'>
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                type='email'
              />
            </div>
            <div className='w-full'>
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                value={password}
                required
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
              />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md'>
              Login
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
