import axios from 'axios';

export const getPictureApi = async (date) => {
  // 어제의 날짜 'YYYY-MM-DD'
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .substring(0, 10);

  const searchedDate = date ? `&date=${date}` : `&date=${yesterday}`;
  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=TiCq8KlUDfEuJccadlVrNdHIZacCULGoGJ7hZtZ4${searchedDate}`
  );

  return response.data;
};
