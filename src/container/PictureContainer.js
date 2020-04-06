import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Picture from '../components/Picture';
import { searchDate } from '../modules/search';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 768px;
  height: auto;
  background: white;
  margin: 100px auto;
  border-radius: 15px;
`;

const PictureContainer = () => {
  const date = useSelector((state) => state.search.date);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { value } = e.target;
    dispatch(searchDate(value));
  };

  return (
    <Container>
      <Picture date={date} onChange={onChange} />
    </Container>
  );
};

export default React.memo(PictureContainer);
