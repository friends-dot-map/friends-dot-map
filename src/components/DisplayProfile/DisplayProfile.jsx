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
    <div className="flex flex-col text-center items-center justify-evenly p-1 h-2/3">
      <p className="text-9xl">{currentProfile.avatar}</p>
      <div className="space-y-1">
        <h2 className="text-5xl font-cursive tracking-wider">
          {currentProfile.username}
        </h2>
        <p>({currentProfile.first_name})</p>
      </div>

      {profile.username === currentProfile.username ? (
        <>
          <label
            htmlFor="status"
            className="text-2xl font-cursive tracking-wider"
          >
            Current Status
          </label>
          {statusEdit ? (
            <>
              <input
                className="rounded-md text-center align-middle p-1"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                placeholder={currentProfile.status}
                type="text"
              />
              <button
                className="bg-teal text-white w-1/2 p-2 rounded-md"
                onClick={handleStatus}
              >
                Post Status
              </button>
            </>
          ) : (
            <>
              <p id="status">{currentProfile.status}</p>
              <button
                className="bg-teal text-white w-1/2 p-2 rounded-md"
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
          <label
            htmlFor="status"
            className="text-2xl font-cursive tracking-wider"
          >
            Current Status
          </label>
          <p id="status">{currentProfile.status}</p>
        </>
      )}
      <label htmlFor="likes" className="text-2xl font-cursive tracking-wider">
        Likes
      </label>
      <p id="likes">{currentProfile.likes}</p>
      {profile.username === currentProfile.username && (
        <Link to="/edit" className="w-1/2 ">
          <button className="bg-white/0 text-teal border-2 ring-tint p-2 rounded-md">
            Edit Profile
          </button>
        </Link>
      )}
      <Link to="/" className="w-1/2 ">
        <button className=" bg-teal/75 text-white p-2 rounded-md">
          Back to Map
        </button>
      </Link>
    </div>
  );
}
