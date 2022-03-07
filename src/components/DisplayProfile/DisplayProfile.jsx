import { useState } from 'react';
import {
  updateStatus,
  resetStatus,
  deleteProfileById,
} from '../../services/profiles';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useProfile } from '../../context/ProfileContext';
import { useGroup } from '../../context/GroupContext';
import Loader from '../Loader/Loader';
import { formatDate } from '../../utils/utils';

export default function DisplayProfile() {
  const { user } = useUser();
  const [statusEdit, setStatusEdit] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const { profileLoading, userCoords, profile, setProfile } = useProfile();
  const { groupLoading, group } = useGroup();
  const params = useParams();
  const history = useHistory();

  const [currentProfile] = group.filter(
    (user) => user.username === params.username
  );

  const handleUpdateStatus = async () => {
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

  const handleResetStatus = async () => {
    if (
      confirm(
        'Are you sure you want to clear your status and last posted location?'
      )
    ) {
      try {
        const [data] = await resetStatus(profile.user_id);
        setProfile((prevState) => ({
          ...prevState,
          status: data.status,
          coords: data.coords,
          updated_at: formatDate(),
        }));
      } catch (error) {
        throw error;
      }
    }
  };

  const handleDeleteProfile = async () => {
    if (confirm('Are you sure you want to delete this profile?')) {
      try {
        await deleteProfileById(user.id);
        history.replace('/login');
      } catch (error) {
        throw error;
      }
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
        // Display the current user's profile
        <>
          {statusEdit ? (
            // If the user is currently editing their status...
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
                onClick={handleUpdateStatus}
              >
                Post Status
              </button>
            </>
          ) : (
            // Else, show the current user's status
            <>
              <p id="status" className="text-lg md:text-2xl italic">
                {currentProfile.status}
              </p>
              {currentProfile.status && (
                // Show the last update only if there is a current status to display
                <>
                  <p id="updated" className="text-sm md:text-lg">
                    posted at {currentProfile.updated_at}
                  </p>
                  <button
                    className="bg-white/0 text-teal w-52 text-sm md:text-base p-2 rounded-md"
                    onClick={handleResetStatus}
                  >
                    Clear status and location
                  </button>
                </>
              )}
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
        // Display the current status for profiles other than the users
        <>
          <p id="status" className="text-lg md:text-2xl italic">
            {currentProfile.status}
          </p>
          {currentProfile.status && (
            // Show the last update only if there is a current status to display
            <p id="updated" className="text-sm md:text-lg">
              posted at {currentProfile.updated_at}
            </p>
          )}
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
          <button
            onClick={handleDeleteProfile}
            className="bg-orange text-white  ring-tint p-2 rounded-md"
          >
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
