export const createTender = (tender) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();

      firestore.collection('tenders').add({
        ...tender
      }).then(() => {
        dispatch({ type: 'CREATE_TENDER_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_TENDER_ERROR' }, err);
      });
    }
  };

export const getTenders = (lastElement, limit) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('tenders').orderBy('time')
        .startAfter(lastElement)
        .limit(limit)
        .get()
        .then( querySnapshot => {
            dispatch({type: 'LIST_TENDERS_SUCCESS', payload: querySnapshot, firstPage: !lastElement});
            })
        .catch(error => {
        dispatch({type: 'LIST_TENDERS_ERROR', error});
        });

        dispatch({type: 'LIST_TENDERS_REQUEST'});

    }
  }