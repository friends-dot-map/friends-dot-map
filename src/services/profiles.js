import { client, parseData } from './client';

export async function getProfile(email) {
  const request = await client
    .from('profiles')
    .select('*')
    .match({ email })
    .single();
  return parseData(request);
}

export async function createProfile({
  user_id,
  email,
  username,
  first_name,
  status,
  avatar,
  likes,
}) {
  const request = await client
    .from('profiles')
    .insert({ user_id, email, username, first_name, status, avatar, likes });
  return parseData(request);
}

export async function updateProfile({
  user_id,
  email,
  username,
  first_name,
  status,
  avatar,
  likes,
}) {
  const request = await client
    .from('profiles')
    .update({ user_id, email, username, first_name, status, avatar, likes })
    .match({ email });
  return parseData(request);
}

export async function updateStatus(status, coords, user_id) {
  const request = await client
    .from('profiles')
    .update({
      status,
      coords: { latitude: coords.latitude, longitude: coords.longitude },
    })
    .match({ user_id });
  console.log(request);
  return parseData(request);
}

export async function deleteProfileByEmail(email) {
  const request = await client.from('profiles').delete().match({ email });
  return parseData(request);
}

export async function getAllProfiles() {
  const request = await client.from('profiles').select('*');
  return parseData(request);
}
