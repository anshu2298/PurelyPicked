import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import Catagories from "../components/Catagories";
import MainBanner from "../components/MainBanner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Catagories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
