import { Link } from 'react-router-dom';
import { useGroup } from '../../context/GroupContext';

export default function Group() {
  const { group } = useGroup();

  return (
    <div className="flex flex-col w-3/4 mx-auto space-y-3 items-center">
      <h1 className="text-3xl md:text-5xl font-cursive text-center mt-10">
        Your groups
      </h1>
      <hr className="w-40 md:w-60 h-1 bg-dark/30 border-0 rounded-md" />
      <h2 className="text-2xl text-center">friends.map(🐞)</h2>

      <ul className="flex flex-col w-full space-y-5 p-2">
        {group.map((friend) => (
          <li
            key={friend.id}
            className="flex items-center rounded-md bg-white/30 ring-tint p-3 gap-4"
          >
            <span className="text-4xl md:text-6xl">{friend.avatar}</span>
            <div className="flex flex-col md:flex-row md: items-baseline md:space-x-2">
              <Link
                to={`/profile/${friend.username}`}
                className="font-cursive text-xl md:text-3xl tracking-wide"
              >
                {friend.username}
              </Link>
              <span className="text-xs md:text-lg">({friend.first_name})</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
