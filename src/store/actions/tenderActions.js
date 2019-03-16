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