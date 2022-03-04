import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import NavButton from '../NavButton/NavButton';

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex items-center gap-7 justify-center p-6 flex-wrap">
      <h1 className="text-dark font-semibold font-cursive text-3xl">
        <span className="text-teal">friends</span>.
        <span className="text-orange">map</span>(📍)
      </h1>
      {user.email && <NavButton />}
      {/* <div>
        <NavButton /> -- for styling tests of Auth pages
      </div> */}
    </header>
  );
}
