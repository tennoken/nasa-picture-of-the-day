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

  useEffect(() => {
    dispatch(getPicture());
  }, [dispatch]);

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
