# nasa-picture-of-the-day

Nasa Api를 사용하여 특정한 날의 사진을 확인할 수 있습니다.

Website link : https://tennoken.github.io/nasa-picture-of-the-day/


## Project Stack

- React
- Redux-thunk
- Styled Components
- Nasa api


## 구조
- src
  - api
    - picture.js
  - components
    - Picture.js
  - containers
    - PictureContainer.js
  - modules
    - index.js
    - picture.js
- App.js
- index.js 

## api/picture.js

```
import axios from 'axios';

export const getPictureApi = async (date = '') => {
  const searchedDate = date ? `&date=${date}` : '';
  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=TiCq8KlUDfEuJccadlVrNdHIZacCULGoGJ7hZtZ4${searchedDate}`
  );

  return response.data;
};
```

## modules/picture.js
```
import * as pictureAPI from '../api/picture';

/* 액션 타입 정의 */
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

/* 리덕스에서 관리 할 상태 정의 */
const initialState = {
  picture: {
    loading: false,
    data: null,
    error: null,
  },
};



/* 리듀서 선언 */
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
```
