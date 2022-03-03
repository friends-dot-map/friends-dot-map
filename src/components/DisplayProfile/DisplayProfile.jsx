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
    <>
      <ul>
        <li>{currentProfile.avatar}</li>
        <li>{currentProfile.username}</li>
        <li>{currentProfile.first_name}</li>
        <li>{currentProfile.likes}</li>
      </ul>
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
          <p>{currentProfile.status}</p>
          <button
            onClick={() => {
              setStatusEdit(true);
            }}
          >
            Update Status
          </button>
        </>
      )}
      <button>
        <Link to="/edit">Edit Profile</Link>
      </button>
    </>
  );
}
