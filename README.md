# Nasa-picture-of-the-day

## Project Stack
  - React (create-react-app)
  - Redux-Thunk
  - styled-components
  - Nasa Api
  
## 구조
  - src
    - api
      - picture.js
    - components
      - Picture.js
    - container
      - PictureContainer.js
    - modules
      - index.js
      - picture.js
    - index.js
    - App.js
  
## src/api/picture.js
```
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
```

## src/modules/picture.js
```
import * as pictureAPI from '../api/picture';

const GET_PICTURE = 'GET_PICTURE';
const GET_PICTURE_SUCCESS = 'GET_PICTURE_SUCCESS';
const GET_PICTURE_ERROR = 'GET_PICTURE_ERROR';

export const getPicture = (date) => async (dispatch) => {
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
```

## src/modules/index.js
```
import { combineReducers } from 'redux';
import picture from './picture';

// combineReducers를 사용하여 루트 리듀서 생성
const rootReducer = combineReducers({
  picture,
});

export default rootReducer;
```

## src/index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

// 스토어 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>  // Provider로 store를 넣어서 App 을 감싸게 되면 우리가 렌더링하는 그 어떤 컴포넌트던지 리덕스 스토어에 접근 할 수 있습니다.
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## src/components/Picture.js
```
import React, { useState } from 'react';
import styled from 'styled-components';
import { getPicture } from '../modules/picture';
import { useDispatch } from 'react-redux';

const PictureBlock = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
  padding: 20px;

  & p {
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const ImageBlock = styled.div`
  max-width: 500px;
  margin: 30px auto;
`;

const Image = styled.div`
  height: 0;
  /* padding %는 부모 너비의 비율   */
  /* 500 : x = 16 : 9   */
  padding-top: 56.25%;
  position: relative;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const HdImage = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.4);
  overflow: auto;

  @media screen and (max-width: 425px) {
    display: none;
  }

  & img {
    max-width: 900px;
    max-height: 700px;
    padding: 20px;
    margin: 120px auto;

    @media screen and (max-width: 768px) {
      max-width: 600px;
      max-height: 400px;
    }
  }
`;

const Loading = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const InputBlock = styled.div`
  padding: 20px;
  text-align: center;

  & input {
    width: 230px;
    margin: 0 auto;
    height: 50px;
    border-radius: 15px;
    border-style: none;
    border: 1px solid #adb5bd;
    text-align: center;
  }

  input[type='date']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }
`;

const ErrorBlock = styled.div`
  max-width: 500px;
  margin: 30px auto;
  text-align: center;
  padding: 50px 0;

  & button {
    background-color: #008cba;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    margin: 20px 0;
    font-size: 30px;
    cursor: pointer;
    border-radius: 15px;
  }

  @media screen and (max-width: 320px) {
    & button {
      font-size: 20px;
      padding: 10px 22px;
    }
  }
`;

const Picture = ({ data, loading, error, onChange }) => {
  const [open, setOpen] = useState(false); // 사진을 클릭했을 시 HD화질 사진이 출력
  const date = new Date();
  const todayDate = date.toISOString().replace(/T.*/, '').split('-').join('-'); // 검색창에 오늘 날짜가 
  const dispatch = useDispatch();

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '100px auto',
          padding: '60px 20px',
        }}
      >
        <Loading />
      </div>
    );
  if (error)
    return (
      <ErrorBlock>
        <h2>오늘의 사진이 아직 등록되지 않았어요 !</h2>
        <button onClick={() => dispatch(getPicture())}>
          어제 사진 보러 가기
        </button>
      </ErrorBlock>
    );
  if (!data) return null;

  return (
    <PictureBlock>
      <InputBlock>
        <input
          type="date"
          onChange={onChange}
          value={data.date}
          max={todayDate}
          min="1995-06-16"
          required
        />
      </InputBlock>
      <ImageBlock>
        <Image>
          {data.media_type === 'image' ? (
            <img
              src={data.url}
              alt={data.url}
              onClick={() => {
                setOpen(true);
              }}
            />
          ) : (
            <iframe title="youtube" src={data.url}></iframe>
          )}
        </Image>
      </ImageBlock>
      <h2>
        {data.title} ({data.date})
      </h2>
      <p>{data.explanation}</p>
      {open && (
        <HdImage
          onClick={() => {
            setOpen(false);
          }}
        >
          <img src={data.hdurl} alt="hd_img" />
        </HdImage>
      )}
    </PictureBlock>
  );
};

export default React.memo(Picture);
```

## src/container/PictureContainer.js
```
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Picture from '../components/Picture';
import styled from 'styled-components';
import { useEffect } from 'react';
import { getPicture } from '../modules/picture';

const Container = styled.div`
  max-width: 768px;
  height: auto;
  background: white;
  margin: 0 auto;
  border-radius: 15px;
`;

const PictureContainer = () => {
  const { data, loading, error } = useSelector(
    (state) => state.picture.picture
  );
  const dispatch = useDispatch();
  const todayDate = new Date().toISOString().substring(0, 10);

  // 컴포넌트가 마운트 됐을 때(처음 나타날 때) 사진을 불러옴
  useEffect(() => {
    dispatch(getPicture(todayDate));
  }, [dispatch, todayDate]);

  const onChange = (e) => {
    dispatch(getPicture(e.target.value));
  };

  return (
    <Container>
      <Picture
        data={data}
        loading={loading}
        error={error}
        onChange={onChange}
      />
    </Container>
  );
};

export default React.memo(PictureContainer);
```
