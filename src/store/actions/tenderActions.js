export const createTender = (tender) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();

      firestore.collection('tenders').add({
        ...tender,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_TENDER_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_TENDER_ERROR' }, err);
      });
    }
  };

export const getTenders = () => {
    return (dispatch, getState, {getFirestore}) => {
        const state = getState();
        const firestore = getFirestore();
        firestore.collection('tenders')
        .startAt(state.activePage * state.itemsPerPage)
        .limit(state.itemsPerPage)
        .get()
        .then( querySnapshot => {
            dispatch({type: 'LIST_TENDERS_SUCESS', payload: querySnapshot});
            })
        .catch(error => {
        dispatch({type: 'LIST_TENDERS_ERROR', error});
        });
    }
  }