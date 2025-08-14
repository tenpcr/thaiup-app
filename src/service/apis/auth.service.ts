import { httpClient } from '../../lib/httpClient';

export const authCheckAuth = (): any => {
  return httpClient.get('/mobile/auth/check-auth');
};

export const authLogin = (params: any): any => {
  return httpClient.post('/mobile/auth/login', params);
};

export const authRegister = (params: any): any => {
  return httpClient.post('/auth/register', params);
};

export const updateProfileFirstname = (params: any): any => {
  return httpClient.put('/mobile/auth/me/profile/firstname', params);
};

export const updateProfileLastname = (params: any): any => {
  return httpClient.put('/mobile/auth/me/profile/lastname', params);
};

export const uploadProfileAvatar = async (
  file: { uri: string; type: string; name: string },
  onProgress?: (percent: number) => void,
) => {
  const formData = new FormData();
  formData.append('img', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as any);

  return httpClient.post('/mobile/auth/me/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: any) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(percent);
      }
    },
  });
};

export const updateProfileAvatar = async (formData: any) => {
  return httpClient.put('/mobile/auth/me/profile/avatar', formData);
};
