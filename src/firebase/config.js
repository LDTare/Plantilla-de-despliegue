import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes} from "firebase/storage"
import {v4} from "uuid"

const firebaseConfig = {
    apiKey: "AIzaSyC-4ipPoUd2bO4EuL95Am6oVc3GFaWAsUY",
    authDomain: "imagen-7b281.firebaseapp.com",
    projectId: "imagen-7b281",
    storageBucket: "imagen-7b281.appspot.com",
    messagingSenderId: "544696783885",
    appId: "1:544696783885:web:30296f57a4bfd5fa83b144"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export function uploadFile(file){
    const storageRef = ref(storage, v4())
    uploadBytes(storageRef, file).then(snapshot =>{
        console.log(snapshot)
    })
}