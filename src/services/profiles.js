import { client, parseData } from './client';

export async function getProfile() {
  const request = await client.from('profiles').select().single();
  return parseData(request);
}

export async function updateProfile({ username, first_name, status, avatar, likes, coords }) {
  const request = await client
    .from('profiles')
    .update({ username, first_name, status, avatar, likes, coords })
    .match({ email });
  return parseData(request);
}

export async function createProfile({ username, first_name, status, avatar, likes, coords }) {
  const request = await client
    .from('profiles')
    .insert({ username, first_name, status, avatar, likes, coords });
  return parseData(request);
}

export async function deleteProfileByEmail(email) {
  const request = await client.from('profiles').delete().match({ email });
  return parseData(request);
}