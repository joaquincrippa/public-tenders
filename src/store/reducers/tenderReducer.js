const initState = {
    isSaving: false,
    isLoading: true,
    entities: [],
    entity: null,
    itemsPerPage: 20,
    errorMessage: null,
    lastPage: false,
    createSuccess: false,
    searchCriteria: {
      type: null,
      number: null,
      timeAfter: null,
      timeBefore: null,
      classification: null
    }
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
          lastPage: action.payload.docs.length < state.itemsPerPage,
          searchCriteria: action.criteria
      }

    case 'LIST_TENDERS_ERROR':
      return {
          ...state,
          errorMessage: action.error
      }
    
    case 'GET_TENDER_REQUEST':
      return {
        ...state,
        entity: null,
        errorMessage: null,
        isLoading: true
      }

    case 'GET_TENDER_SUCCESS':
      return {
        ...state,
        entity: action.doc,
        errorMessage: null,
        isLoading: false
      }
    
    case 'GET_TENDER_ERROR':
      return {
        ...state,
        entity: null,
        errorMessage: action.error,
        isLoading: false
      }


    default:
      return state;
  }
};

export default tenderReducer;