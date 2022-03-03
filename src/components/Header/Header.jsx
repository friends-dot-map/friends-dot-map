import { Link } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import NavButton from '../NavButton/NavButton';
export default function Header() {
  const { user, setUser } = useUser();
  return (
    <header className="flex items-center justify-between flex-wrap p-6">
      <div className="flex justify-between items-center flex-no-shrink text-white mr-6">
        <svg
          className="h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          friends.map()
        </span>
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
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
