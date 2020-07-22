import firebase from './firebaseSetup'
const db = firebase.firestore()

const getRef = (ref) => {
    return db.doc(ref);
}
const getPitchesByDistrict = (districtId,callback) => {
    let list=[];
    db.collection("district").doc(districtId).get().then(doc => {
        const maxIndex = doc.data()['pitches'].length
        for(let i=0;i<maxIndex;i++){
            doc.data()['pitches'][i].get().then(doc=>{
                list = list.concat(doc.data());
                if (i===maxIndex-1){
                    callback(list)
                }
            })
        }
      });
}

const getUserNames = (callback) =>{
    let usernames = []
    db.collection("user").get().then(
        (querySnapshot) => {
            querySnapshot.forEach(
                (doc)=>{
                    const username = doc.data().username;
                    usernames = usernames.concat(username)
                }
            )
            callback(usernames);
            }
    )
}

const get = (ref,callback) => {
    db.doc(ref).get().then((doc)=>{
        
        callback(doc)
    })
}

const update = (ref,object) =>{
    db.doc(ref).update(object)
}

const addUser = (id,email,username)=>{
    let user = {
        id:id,
        district:"",
        email:email,
        username:username,
        favourite_pitches:[],
        friend_requests:[],
        friends:[]
    }
    db.collection('user').doc(id).set(user);
}

export {getPitchesByDistrict,getUserNames,addUser,update,getRef,get};