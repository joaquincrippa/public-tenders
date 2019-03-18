export const createTender = (tender) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
      tender.time = new Date(Date.parse(tender.time));
      tender.time.setHours(tender.time.getHours() + 3);
      const firestore = getFirestore();
      if(tender.physicalFile) {
        const name = `folders/${Math.random().toString(36)}.${tender.physicalFile.name.split('.').pop()}`;
        var ref = getFirebase().storage().ref(name);
        ref.put(tender.physicalFile).then(function(snapshot) {
          ref.getDownloadURL().then(
            (url) => {
              tender.folderUrl = url;
              tender.folderRef = name;
              delete tender.physicalFile;
              saveInFirestore(tender);
            }
          ).catch( err => {
            dispatch({ type: 'CREATE_TENDER_ERROR', error: err });
          });
        }).catch( err => {
          dispatch({ type: 'CREATE_TENDER_ERROR', error: err });
        });;
      } else {
        delete tender.physicalFile;
        saveInFirestore(tender);
      }

      dispatch({ type: 'CREATE_TENDER_REQUEST' });

      function saveInFirestore(tender) {
        firestore.collection('tenders').add({
          ...tender
        }).then(() => {
          dispatch({ type: 'CREATE_TENDER_SUCCESS' });
        }).catch(err => {
          dispatch({ type: 'CREATE_TENDER_ERROR', error: err });
        });  
      }    
    }
  };

export const getTenders = (lastElement, limit, criteria) => {
    return (dispatch, getState, {getFirestore}) => {
        const { type, number, timeAfter, timeBefore, classification } = criteria;
        const firestore = getFirestore();
        var query = firestore.collection('tenders');
        if (type) query = query.where('type', '==', type);
        if (classification) query = query.where('classification', '==', classification);
        if (number) query = query.where('number', '==', number);
        if (timeAfter) query = query.where('time', '>=', timeAfter);
        if (timeBefore) query = query.where('time', '<=', timeBefore);
        query = query.orderBy('time');
        if(lastElement) query =  query.startAfter(lastElement);      
        query.limit(limit).get().then( querySnapshot => {
            dispatch({type: 'LIST_TENDERS_SUCCESS', payload: querySnapshot, firstPage: !lastElement,
              criteria: criteria });
            })
        .catch(error => {
          console.log(error);
        dispatch({type: 'LIST_TENDERS_ERROR', error});
        });

        dispatch({type: 'LIST_TENDERS_REQUEST'});

    }
  }

  export const getTender = (id) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('tenders').doc(id).get()
        .then( doc => dispatch( {type: 'GET_TENDER_SUCCESS', doc: doc.data()} ) )
        .catch( error => dispatch( {type: 'GET_TENDER_ERROR', error} ) );
      dispatch( {type: 'GET_TENDER_REQUEST'} );
    }
  }