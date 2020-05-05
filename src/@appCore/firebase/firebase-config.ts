import { environment } from './../../environments/environment';
import firebase from 'firebase/app';
import 'firebase/firestore';


firebase.initializeApp(environment.firebase);

export { firebase };