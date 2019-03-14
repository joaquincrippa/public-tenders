const initState = {
    isLoading: true,
    entities: [],
    itemsPerPage: 5,
    errorMessage: null,
    lastPage: false
}

const tenderReducer = (state = initState, action) => {
  switch (action.type) {

    case 'CREATE_TENDER_SUCCESS':
      console.log('create tender success');
      return state;

    case 'CREATE_TENDER_ERROR':
      console.log('create tender error');
      return state;

    case 'LIST_TENDERS_REQUEST': 
      return {
        ...state,
        isLoading: true
      };

    case 'LIST_TENDERS_SUCCESS':
      return {
          ...state,
          entities: state.activePage === 0 ? action.payload.docs : state.entities.concat(action.payload.docs),
          isLoading: false,
          errorMessage: null,
          lastPage: action.payload.docs.length < state.itemsPerPage
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