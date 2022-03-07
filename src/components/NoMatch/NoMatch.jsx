import { useProfile } from '../../context/ProfileContext';
import { Link } from 'react-router-dom';

export default function NoMatch() {
  const { profile } = useProfile();

  return (
    <div className="flex flex-col w-screen h-3/4 space-y-12 items-center content-center justify-center text-center p-2">
      <h2 className="text-orange bg-white/80 text-2xl p-5 italic rounded-md">
        Not all who wander are lost... but we might be a little lost. <br />{' '}
        <br />
        Thankfully, we have a map.
      </h2>
      {profile.username === '' && (
        <Link to="/create" className="w-3/4">
          <button className=" bg-orange text-white p-2 rounded-md">
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
