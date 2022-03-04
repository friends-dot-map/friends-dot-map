import { useState } from 'react';
import { updateStatus } from '../../services/profiles';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import { useGroup } from '../../context/GroupContext';

export default function DisplayProfile() {
  const [statusEdit, setStatusEdit] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const { loading, userCoords, profile, setProfile } = useProfile();
  const { group } = useGroup();
  const params = useParams();
  const history = useHistory();

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
      }));
      setStatusEdit(false);
    } catch (error) {
      throw new Error('Was not able to update status');
    }
    history.push('/');
  };

  if (loading) return <div aria-label="loader">Loading....</div>;

  return (
    <div className="flex flex-col text-center items-center justify-evenly p-1 h-5/6">
      <p className="text-6xl">{currentProfile.avatar}</p>
      <h2 className="text-4xl font-cursive tracking-wider">
        {currentProfile.username}
      </h2>
      <p>({currentProfile.first_name})</p>
      <label htmlFor="status" className="text-2xl font-cursive tracking-wider">
        Currently...
      </label>
      <p id="status">{currentProfile.status}</p>
      {profile.username === currentProfile.username && (
        <>
          {statusEdit ? (
            <>
              <input
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                type="text"
              />
              <button onClick={handleStatus}>Post Status</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setStatusEdit(true);
                }}
              >
                Update Status
              </button>
            </>
          )}
        </>
      )}
      <label htmlFor="likes" className="text-2xl font-cursive tracking-wider">
        I like...
      </label>
      <p id="likes">{currentProfile.likes}</p>
      {profile.username === currentProfile.username && (
        <button>
          <Link to="/edit">Edit Profile</Link>
        </button>
      )}
    </div>
  );
}
