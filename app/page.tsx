import GithubProfile from "@/components/page/GithubProfile";
import Navbar from "@/components/page/Navbar";

function Homepage() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />
      <GithubProfile name="rex-arnab" />
    </div>
  );
}

export default Homepage;
