import { useEffect, useState } from "react";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const data = localStorage.getItem('userdata')
    const localdata = JSON.parse(data)
    setProfile(localdata)
  }, []);

  return (
    <>
      {profile && Object.keys(profile).length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className="mb-4">
              <span className="font-semibold">Username: </span>
              <span>{profile.username}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">User ID: </span>
              <span>{profile.id}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Email: </span>
              <span>{profile.email}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">No Data Found</div>
      )}
    </>
  );
};

export default UserProfile;
