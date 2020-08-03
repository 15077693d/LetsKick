import firebase from './firebaseSetup';
import { getUserNames, addUser, get } from './dataProcessor'

const getUserInfoByFirebase = () => {
    let promise = new Promise(
        (resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    resolve(user.uid)
                } else {
                    reject("There is no user")
                }})})
    return promise
            }

const signOut = () => {
    firebase.auth().signOut()
}

const loginWithEmailAndPassword = (email, password) => {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password)

}

const signUpWithEmailAndPassword = async (username, email, password) => {
    const usernames = await getUserNames();
    let errorMessage;
    let id;
    // check username is vaild first
    if (!usernames.includes(username)){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((doc) => { addUser(doc.user.uid, email, username);
                                    id = doc.user.uid;})
                    .catch(error => {errorMessage = error.code})}
    else{
        errorMessage = "auth/username-already-in-use"
    }

    const promise = new Promise(
        (resolve, reject)=>{
            if (id){
                resolve(id)
            }else{
                reject(errorMessage)
            }
        }
    )
    
    return promise
}


const authWithThirdParty = async (type) => {
    let provider;
    switch (type) {
        case "facebook":
            provider = new firebase.auth.FacebookAuthProvider();
            break;

        case "google":
            provider = new firebase.auth.GoogleAuthProvider();
            break;

        default:
            break;
    }

    return  firebase.auth().signInWithPopup(provider).then(
        (result) => result.user
    )
}


const resetPassword = (email) => {
    return firebase.auth().sendPasswordResetEmail(email)
}
export { resetPassword, signUpWithEmailAndPassword, authWithThirdParty, getUserInfoByFirebase, signOut, loginWithEmailAndPassword };