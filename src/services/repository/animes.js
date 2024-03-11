
import api from "../api";

export const getAnimes = async () => {
  try {
    const response = await api.get('/anime');
    return response;
  } catch (err) {
    console.log('[getAnimes]', err?.response);
  }
  return null;
};

export const getAnimesFiltered = async (category) => {
  try {
    const response = await api.get('/anime?filter[categories]='+category);
    return response;
  } catch (err) {
    console.log('[getAnimes]', err?.response);
  }
  return null;
};
