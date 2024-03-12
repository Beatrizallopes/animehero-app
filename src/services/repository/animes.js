
import api from "../api";

export const getAnimes = async (limit, page) => {
  try {
    const response = await api.get('/anime',{
      params: {
        'page[offset]': page,
        'page[limit]': limit
      }
    });
    return response;
  } catch (err) {
    console.log('[getAnimes]', err?.response);
  }
  return null;
};

export const getAnimesFiltered = async (category) => {
  try {
    const response = await api.get('/anime?page[limit]=15&filter[categories]='+category);
    return response;
  } catch (err) {
    console.log('[getAnimes]', err?.response);
  }
  return null;
};
