
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
    console.log('[getAnimesFiltered]', err?.response);
  }
  return null;
};

export const getTrendingAnimes = async () => {
  try {
    const response = await api.get('/trending/anime',{
      params: {
        page: {
          limit: 10,
        },
      }
    });
    return response;
  } catch (err) {
    console.log('[getTrendingAnimes]', err?.response);
  }
  return null;
};

export const getAnimeById = async (id) => {
  try {
    const response = await api.get('/anime/' + id);
    return response;
  } catch (err) {
    console.log('[getAnimeById]', err?.response);
  }
  return null;
};

