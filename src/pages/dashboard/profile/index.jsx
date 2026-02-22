import Banner from "./components/Banner";
import Project from "./components/Project";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-full mt-3 flex h-fit flex-col gap-5">
        <div className="col-span-12">
          <Banner />
        </div>
      </div>

      <div className="grid h-full grid-cols-1">
        <div className="col-span-1">
          <Project />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;