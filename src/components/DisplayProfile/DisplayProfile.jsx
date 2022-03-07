import { useState } from 'react';
import { updateStatus } from '../../services/profiles';
import { Link, useParams } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import { useGroup } from '../../context/GroupContext';
import Loader from '../Loader/Loader';
import { formatDate } from '../../utils/utils';

export default function DisplayProfile() {
  const [statusEdit, setStatusEdit] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const { profileLoading, userCoords, profile, setProfile } = useProfile();
  const { groupLoading, group } = useGroup();
  const params = useParams();

  const [currentProfile] = group.filter(
    (user) => user.username === params.username
  );

  const handleStatus = async () => {
    try {
      const [data] = await updateStatus(newStatus, userCoords, profile.user_id);
      setProfile((prevState) => ({
        ...prevState,
        status: data.status,
        coords: data.coords,
        updated_at: formatDate(),
      }));
      setStatusEdit(false);
    } catch (error) {
      throw error;
    }
  };

  if (groupLoading || profileLoading)
    return (
      <div aria-label="loader" className="bg-dark w-screen h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col text-center items-center justify-evenly p-2 h-3/4">
      <p className="text-8xl md:text-9xl">{currentProfile.avatar}</p>
      <div className="space-y-4">
        <h2 className="text-5xl md:text-7xl font-cursive tracking-wider">
          {currentProfile.username}
        </h2>
        <p className="text-lg md:text-2xl">({currentProfile.first_name})</p>
      </div>

      <label
        htmlFor="status"
        className="text-2xl md:text-4xl font-cursive tracking-wider"
      >
        Current Status
      </label>
      {profile.username === currentProfile.username ? (
        <>
          {statusEdit ? (
            <>
              <input
                id="status"
                name="status"
                type="text"
                placeholder={currentProfile.status}
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="rounded-md text-center align-middle p-1 md:text-2xl"
              />
              <button
                className="bg-teal text-white w-52 md:text-2xl p-2 rounded-md"
                onClick={handleStatus}
              >
                Post Status
              </button>
            </>
          ) : (
            <>
              <p id="status" className="text-lg md:text-2xl italic">
                {currentProfile.status}
              </p>
              <p id="updated" className="text-sm md:text-lg">
                posted at {currentProfile.updated_at}
              </p>
              <button
                className="bg-teal text-white w-52 md:text-2xl p-2 rounded-md"
                onClick={() => {
                  setStatusEdit(true);
                }}
              >
                Update Status
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <p id="status" className="text-lg md:text-2xl italic">
            {currentProfile.status}
          </p>
          <p id="updated" className="text-sm md:text-lg">
            posted at {currentProfile.updated_at}
          </p>
        </>
      )}
      <label
        htmlFor="likes"
        className="text-2xl md:text-4xl font-cursive tracking-wider"
      >
        Likes
      </label>
      <p id="likes" className="text-lg md:text-2xl">
        {currentProfile.likes}
      </p>
      {profile.username === currentProfile.username ? (
        <>
          <Link to="/edit">
            <button className="bg-white text-teal  ring-tint p-2 rounded-md">
              Edit Profile
            </button>
          </Link>
          <Link to="/">
            <button className=" bg-teal text-white p-2 rounded-md">
              Back to Map
            </button>
          </Link>
          <button className="bg-orange text-white  ring-tint p-2 rounded-md">
            Delete Profile
          </button>
        </>
      ) : (
        <Link to="/">
          <button className=" bg-teal text-white p-2 rounded-md">
            Back to Map
          </button>
        </Link>
      )}
    </div>
  );
}
