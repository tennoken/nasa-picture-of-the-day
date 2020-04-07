import axios from 'axios';

export const getPictureApi = async (date = '') => {
  const searchedDate = date ? `&date=${date}` : '';
  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=TiCq8KlUDfEuJccadlVrNdHIZacCULGoGJ7hZtZ4${searchedDate}`
  );

  return response.data;
};
