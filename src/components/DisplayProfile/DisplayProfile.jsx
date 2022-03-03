import { useProfile } from '../../context/ProfileContext';
import { useState } from 'react';
import { updateStatus } from '../../services/profiles';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useGroup } from '../../context/GroupContext';

export default function DisplayProfile() {
  const [statusEdit, setStatusEdit] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const {
    loading,
    userCoords,
    profile: { username, first_name, likes, avatar, status, user_id, coords },
  } = useProfile();
  const params = useParams();
  const history = useHistory();
  const { group } = useGroup();

  const [currentProfile] = group.filter(
    (user) => user.username === params.username
  );

  const handleStatus = async () => {
    try {
      await updateStatus(newStatus, userCoords, user_id);
      setStatusEdit(false);
      history.push('/');
    } catch (error) {
      throw new Error('Was not able to update status');
    }
  };

  if (loading) return <h1>Loading....</h1>;

  return (
    <div>
      <p>{currentProfile.avatar}</p>
      <p>{currentProfile.username}</p>
      <p>{currentProfile.first_name}</p>
      <p>{currentProfile.likes}</p>
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
    </div>
  );
}
