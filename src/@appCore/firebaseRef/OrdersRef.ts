import { firebase } from '@appCore/firebase/firebase-config';

export const cancelledBooking = (docId: string) => {
	return firebase.firestore().collection('newShopTransaction').doc(docId).update({ status: 'CANCELLED' });
};

export const getMyOrders = (shopUID: string) => {
	return firebase.firestore().collection('newShopTransaction').where('shopUID', '==', shopUID);
};

export const acceptBooking = (docId: string) => {
	return firebase.firestore().collection('newShopTransaction').doc(docId).update({ status: 'ACCEPTED' });
};

export const getMyOrder = (transactionUID: string) => {
	return firebase.firestore().collection('newShopTransaction').where('transactionUID', '==', transactionUID);
};
