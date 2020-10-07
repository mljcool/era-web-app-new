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

export const getMechanic = (id: string) => {
	return ref.collection('newShopMechanics').where('id', '==', id);
};

export const updateAssistance = (docId: string, data) => {
	return ref
		.collection('newAssistance')
		.doc(docId)
		.update({ ...data });
};

export const getClientCar = (userId) => {
	return ref.collection('newMyCars').where('userId', '==', userId);
};

export const updateTimeAssistance = (docId: string) => {
	return ref.collection('newAssistance').doc(docId).update({ timeValue: '0' });
};
