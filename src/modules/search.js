const SEARCHDATE = 'search/ONCHANGE';

export const searchDate = receivedDate => ({ type: SEARCHDATE, receivedDate });

const date = new Date();

const todayDate = date
  .toISOString()
  .replace(/T.*/, '')
  .split('-')
  .join('-');

console.log('todayDate : ', todayDate);

export const initialState = {
  date: todayDate
};

function search(state = initialState, action) {
  switch (action.type) {
    case SEARCHDATE:
      return {
        ...state,
        date: action.receivedDate
      };
    default:
      return state;
  }
}

export default search;
