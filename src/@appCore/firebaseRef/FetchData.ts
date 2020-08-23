import { firebase } from '@appCore/firebase/firebase-config';

const ref = firebase.firestore();

export const getAssistanceDetails = (uid: string) => {
  return ref.collection('newAssistance').where('assistanceUId', '==', uid);
};

export const getClientDetails = (id: string) => {
  return ref.collection('newCustomers').where('id', '==', id);
};

export const getShopDetails = (id: string) => {
  return ref.collection('newShopList').where('uid', '==', id);
};
