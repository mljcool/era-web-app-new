import { firebase } from '@appCore/firebase/firebase-config';

export const cancelledBooking = (docId: string) => {
	return firebase.firestore().collection('newBookingTransaction').doc(docId).update({ status: 'CANCELLED' });
};

export const getMyBookings = (shopUID: string) => {
	return firebase.firestore().collection('newBookingTransaction').where('shopUID', '==', shopUID);
};

export const acceptBooking = (docId: string) => {
	return firebase.firestore().collection('newBookingTransaction').doc(docId).update({ status: 'ACCEPTED' });
};

export const getMyBookingDetails = (bookingUID: string) => {
	return firebase.firestore().collection('newBookingTransaction').where('bookingUID', '==', bookingUID);
};
