import React from 'react';
import { Link } from 'react-router-dom';
import { useGroup } from '../../context/GroupContext';

export default function Group() {
  const { group } = useGroup();

  return (
    <ul>
      {group.map((friend) => (
        <li key={friend.id}>
          <Link to={`/profile/${friend.username}`}>
            {friend.avatar} {friend.username}
          </Link>
        </li>
      ))}
    </ul>
  );
}
