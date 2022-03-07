import { Menu, Transition } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useUser } from '../../context/UserContext';
import { useProfile } from '../../context/ProfileContext';
import { signOutUser } from '../../services/users';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavButton({ activeOnMap = false }) {
  const { setUser } = useUser();
  const {
    setProfile,
    profile: { username },
  } = useProfile();

  let position, bgColor, size;

  if (activeOnMap) {
    position = 'absolute right-0 top-1/4';
    bgColor = 'bg-white ring-tint';
    size = 'h-6 w-6 ';
  } else {
    position = 'relative';
    bgColor = 'bg-white/0';
    size = 'h-10 w-10 md:h-16 md:w-16';
  }

  return (
    <Menu as="div" className={`${position} inline-block text-left`}>
      <div>
        <Menu.Button
          className={`${bgColor} inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-base font-medium text-dark hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
        >
          <MenuIcon className={`${size}`} aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-tint focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/"
                  className={classNames(
                    active ? 'bg-dark/10 text-dark' : 'text-dark/70',
                    'block px-4 py-2 text-lg'
                  )}
                >
                  Home
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/profile/${username}`}
                  className={classNames(
                    active ? 'bg-dark/10 text-dark' : 'text-dark/70',
                    'block px-4 py-2 text-lg'
                  )}
                >
                  Your Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/group"
                  className={classNames(
                    active ? 'bg-dark/10 text-dark' : 'text-dark/70',
                    'block px-4 py-2 text-lg'
                  )}
                >
                  Your Groups
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={async () => {
                    await signOutUser();
                    setUser({});
                    setProfile({});
                  }}
                  type="submit"
                  className={classNames(
                    active ? 'bg-dark/10 text-dark' : 'text-dark/70',
                    'block w-full text-left px-4 py-2 text-lg'
                  )}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
