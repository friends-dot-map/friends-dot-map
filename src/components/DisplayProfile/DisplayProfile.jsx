import { useProfile } from '../../context/ProfileContext';
import { useState } from 'react';
import { updateStatus } from '../../services/profiles';
import { useHistory } from 'react-router-dom';


export default function DisplayProfile() {
  const [statusEdit, setStatusEdit] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const {
    profile: { username, first_name, likes, avatar, status, user_id },
  } = useProfile();

  const coords = {latitude: 69, longitude: 420}
  const history = useHistory();

  const handleStatus = async () => {
    try {
      await updateStatus(newStatus, coords, user_id);
      setStatusEdit(false);
      history.push('/');
    } catch (error) {
      throw new Error('Was not able to update status');
      
    }
  }

  return (
    <div>
      <p>{avatar}</p>
      <p>{username}</p>
      <p>{first_name}</p>
      <p>{likes}</p>
    {statusEdit ? 
    <>
    <input value={newStatus} onChange={(e) => setNewStatus(e.target.value)} type="text" /> 
    <button onClick={handleStatus} >Post Status</button>
    </> :
    <>
      <p>{status}</p>
      <button onClick={() => {setStatusEdit(true)}} >Update Status</button>
    </>
  }
    </div>
  );
}
