const initState = {
    isSaving: false,
    isLoading: true,
    entities: [],
    itemsPerPage: 20,
    errorMessage: null,
    lastPage: false,
    createSuccess: false
}

const tenderReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TENDER_REQUEST':
      return {
        ...state,
        isSaving: true
      };

    case 'CREATE_TENDER_SUCCESS':
      console.log('create tender success');
      return {
        ...state,
        isSaving: false,
        createSuccess: true,
        errorMessage: null
      };

    case 'CREATE_TENDER_ERROR':
      console.log('create tender error');
      return {
        ...state,
        isSaving: false,
        createSuccess: false,
        errorMessage: action.error
      }

    case 'LIST_TENDERS_REQUEST': 
      return {
        ...state,
        isLoading: true,
        createSuccess: false

      };

    case 'LIST_TENDERS_SUCCESS':
      return {
          ...state,
          entities: action.firstPage ? action.payload.docs : state.entities.concat(action.payload.docs),
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