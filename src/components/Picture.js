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
  const [open, setOpen] = useState(false);
  const date = new Date();
  const todayDate = date.toISOString().replace(/T.*/, '').split('-').join('-');
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
