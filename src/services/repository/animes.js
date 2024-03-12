
import api from "../api";

export const getAnimes = async (limit, page, search) => {
  try {
    const offset = (page-1)*limit
    const response = await api.get('/anime',{
      params: {
        page: {
          offset,
          limit
        },
        filter: {
          text: search,
        }
      }
    });
    return response;
  } catch (err) {
    console.log('[getAnimes]', err?.response);
  }
  return null;
};

export const getAnimesFiltered = async (category, limit, page, search) => {
  try {
    const offset = (page-1)*limit
    const response = await api.get('/anime',
    {
      params: {
        params: {
          page: {
            offset,
            limit
          },
          filter: {
            category: category,
            text: search,
          }
        }
      }
    });
    return response;
  } catch (err) {
    console.log('[getAnimes]', err?.response);
  }
  return null;
};
