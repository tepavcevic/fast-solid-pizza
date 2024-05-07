import { Location } from '../types/location';

// eslint-disable-next-line import/prefer-default-export
export async function getAddress({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<Location> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = (await res.json()) as Location;
  return data;
}
