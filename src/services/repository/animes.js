
import api from "../api";

export const getAnimes = async (limit, page, search) => {
  try {
    const offset = (page-1)*limit
    let params = {
      page: {
        offset,
        limit
      },
    }
    if(search !== ''){
      params = {
        ...params,
        filter: {
          text: search,
        }
      }
    }
    const response = await api.get('/anime',{
      params,
    });
    return response;
  } catch (err) {
    console.log('[getAnimes]', err?.response);
  }
  return null;
};

export const getAnimesFiltered = async (season, limit, page, search) => {
  try {
    const offset = (page-1)*limit;
    let params = {
      page: {
        offset,
        limit
      },
      filter: {
        season: season
      }
    };
    if(search !== ''){
      params = {
        ...params,
        filter: {
          season: season,
          text: search,
        }
      }
    }

    const response = await api.get('/anime',{params});
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

