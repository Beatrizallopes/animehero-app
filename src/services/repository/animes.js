
import api from "../api";

export const getAnimes = async (limit, page) => {
  try {
    const offset = (page-1)*limit
    const response = await api.get('/anime',{
      params: {
        'page[offset]': offset,
        'page[limit]': limit
      }
    });
    return response;
  } catch (err) {
    console.log('[getAnimes]', err?.response);
  }
  return null;
};

export const getAnimesFiltered = async (category, limit, page) => {
  try {
    const offset = (page-1)*limit
    const response = await api.get('/anime',
    {
      params: {
        'filter[categories]': category,
        'page[offset]': offset,
        'page[limit]': limit
      }
    });
    return response;
  } catch (err) {
    console.log('[getAnimes]', err?.response);
  }
  return null;
};
