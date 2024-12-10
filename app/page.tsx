import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import Tags from "@/components/Tags";

const Home = () => {

  return (
    <>

      <h1>Home</h1>
      <p className="para-color">Me</p>
      <PrimaryButton/>
      <SecondaryButton/>
      <button type="submit" className="transparentBtn">
        Cancel
      </button>
      <br/>
      <input type="text" placeholder="Enter your email" className="input"/>
      <Tags/>

      

    </>
  );
};

export default Home;
