import { firebase } from '@appCore/firebase/firebase-config';

const ref = firebase.firestore();

export const getAllRatings = (shopId: string) => {
  return ref.collection('newRatings').where('shopId', '==', shopId);
};

export const timeSince = (date: any) => {
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 0 },
  ];

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
};
