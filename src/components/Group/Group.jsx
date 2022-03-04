import { Link } from 'react-router-dom';
import { useGroup } from '../../context/GroupContext';

export default function Group() {
  const { group } = useGroup();

  return (
    <ul className="flex flex-col space-y-5 p-5">
      {group.map((friend) => (
        <li
          key={friend.id}
          className="flex items-center rounded-md bg-white/20 p-3 gap-4"
        >
          <span className="text-4xl ">{friend.avatar}</span>
          <div className="flex flex-col">
            <Link
              to={`/profile/${friend.username}`}
              className="font-cursive text-xl tracking-wide"
            >
              {friend.username}
            </Link>
            <span className="text-xs">({friend.first_name})</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
