import * as pictureAPI from '../api/picture';

const GET_PICTURE = 'GET_PICTURE';
const GET_PICTURE_SUCCESS = 'GET_PICTURE_SUCCESS';
const GET_PICTURE_ERROR = 'GET_PICTURE_ERROR';

export const getPicture = (date = '') => async (dispatch) => {
  dispatch({ type: GET_PICTURE }); //요청이 시작
  try {
    const picture = await pictureAPI.getPictureApi(date); // Api를 불러옴
    dispatch({ type: GET_PICTURE_SUCCESS, picture }); // 성공
  } catch (e) {
    dispatch({ type: GET_PICTURE_ERROR, error: e }); // 실패
  }
};

const initialState = {
  picture: {
    loading: false,
    data: null,
    error: null,
  },
};

function picture(state = initialState, action) {
  switch (action.type) {
    case GET_PICTURE:
      return {
        ...state,
        picture: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_PICTURE_SUCCESS:
      return {
        ...state,
        picture: {
          loading: false,
          data: action.picture,
          error: null,
        },
      };
    case GET_PICTURE_ERROR:
      return {
        ...state,
        picture: {
          loading: false,
          data: null,
          error: action.error,
        },
      };
    default:
      return state;
  }
}

export default picture;
