import * as Keychain from 'react-native-keychain';

export const setToken = async (service: 'access-token' | 'refresh-token', token: string) => {
  await Keychain.setGenericPassword(service, token, {
    service,
  });
};


export const getToken = async (service: 'access-token' | 'refresh-token') => {
  const creds = await Keychain.getGenericPassword({ service });
  return creds ? creds.password : null;
};


export const deleteToken = async (service: 'access-token' | 'refresh-token') => {
  await Keychain.resetGenericPassword({ service });
};