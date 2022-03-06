import { useProfile } from '../../context/ProfileContext';
import { Link } from 'react-router-dom';

export default function NoMatch() {
  const { profile } = useProfile();

  return (
    <div>
      {profile.username === '' && (
        <Link to="/create" className="w-1/2 ">
          <button className=" bg-teal/75 text-white p-2 rounded-md">
            You may need to finish creating a profile to continue.
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
