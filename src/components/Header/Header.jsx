import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import NavButton from '../NavButton/NavButton';

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between flex-wrap p-6">
      <div className="flex justify-between items-center flex-no-shrink text-white mr-6">
        <h1 className="font-semibold text-xl tracking-tight">friends.map()</h1>
      </div>
      <div className="w-full flex-grow justify-between flex lg:items-center lg:w-auto">
        <div className="text-sm flex-grow"></div>
        <div>
          {user?.email ? (
            <>
              <NavButton />
            </>
          ) : (
            <Link to="/login">
              <button className=" text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 mt-0">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
