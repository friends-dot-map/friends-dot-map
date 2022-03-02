import { client, parseData } from './client';

export async function getProfile() {
  const request = await client.from('profiles').select().single();
  return parseData(request);
}

export async function createProfile({
  user_id,
  username,
  first_name,
  status,
  avatar,
  likes,
}) {
  const request = await client
    .from('profiles')
    .insert({ user_id, username, first_name, status, avatar, likes });
  return parseData(request);
}

export async function updateProfile({
  user_id,
  username,
  first_name,
  status,
  avatar,
  likes,
}) {
  const request = await client
    .from('profiles')
    .update({ user_id, username, first_name, status, avatar, likes })
    .match({ user_id }); // We'll need to find another way to access user email
  return parseData(request);
}

export async function deleteProfileByEmail(email) {
  const request = await client.from('profiles').delete().match({ email });
  return parseData(request);
}
