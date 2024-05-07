import { atom, task } from "nanostores";
import { getAddress } from "../services/apiGeocoding";

export type UserState = {
  username: string;
  status: 'idle' | 'loading' | 'error';
  position: { latitude: number | undefined; longitude: number | undefined };
  address: string;
  error: string;
};

export const user = atom<UserState>({
  username: '',
  status: 'idle',
  position: { latitude: undefined, longitude: undefined },
  address: '',
  error: '',
})

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export type FetchAddressType = {
  position: { latitude: number; longitude: number };
  address: string;
};

// export const fetchAddress = task(async () => {
//   user.set({ ...user.get(), status: 'loading' });
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();

//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   user.set({ ...user.get(), position, address, status: 'idle' });
//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// });

export const updateName = (name: string) => {
  user.set({ ...user.get(), username: name });

}