const initState = {
    isLoading: true,
    entities: [],
    activePage: 0,
    itemsPerPage: 5,
    errorMessage: null

}

const tenderReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TENDER_SUCCESS':
      console.log('create tender success');
      return state;
    case 'CREATE_TENDER_ERROR':
      console.log('create tender error');
    case 'LIST_TENDERS_REQUEST': 
      return state;
    case 'LIST_TENDERS_SUCCESS':
      return {
          ...state,
          entities: state.entities.concat(action.payload),
          errorMessage: null
      }
    case 'LIST_TENDERS_ERROR':
      return {
          ...state,
          errorMessage: action.error
      }
    default:
      return state;
  }
};

export default tenderReducer;