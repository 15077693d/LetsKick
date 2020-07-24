import firebase from './firebaseSetup';
import {getUserNames,addUser, get} from './dataProcessor'
const checkThirdPartySignIn = (yesCallback,noCallback) => {
    firebase.auth().onAuthStateChanged(
        (user) => {
            if (user){
                yesCallback(user);
            }else{
                noCallback();
            }
        }
    )
}

const signOut = (callback) => {
    firebase.auth().signOut().then(()=>{callback()})
}

const loginWithEmailAndPassword = (email,password,displayWarning) => {
    firebase.auth()
    .signInWithEmailAndPassword(email,password)
    .then(()=>{
        window.location.reload();
    })
    .catch((error)=> {displayWarning(error.code)})

}

const signUpWithEmailAndPassword = (username, email, password,displayWarning,switchPage,setId) => {
    const auth = () => firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((doc)=>{addUser(doc.user.uid,email,username);switchPage(1);setId(doc.user.uid);})
            .catch((error)=> {displayWarning(error.code)})

    const checkUsername = (usernames) => {
        usernames = usernames.map((item) => item.toUpperCase())
        if (usernames.includes(username.toUpperCase())){
            displayWarning("auth/username-already-in-use")
        }else{
            auth()
        }
    }
    getUserNames(checkUsername);
}

const authWithThirdParty = (type,callback1,callback2) => {
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

    firebase.auth().signInWithPopup(provider).then(
        (result)=>{
                    const id = result.user.uid
                    const email = result.user.email
                    const username = result.user.displayName
                    const afterGetCallback = (doc) => {
                        if (!doc.data()){
                            addUser(id,email,username);
                            callback1(null)
                            callback2(id)
                        }else{
                            window.location.reload()
                        }
                    };
                    get(`user/${id}`,afterGetCallback)
        }
    )
}

const resetPassword = (email,displayWarning,message) => {
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
        displayWarning(message);
    }).catch((error)=>{
        displayWarning(error.code);
    })
}
export {resetPassword,signUpWithEmailAndPassword,authWithThirdParty,checkThirdPartySignIn,signOut,loginWithEmailAndPassword};