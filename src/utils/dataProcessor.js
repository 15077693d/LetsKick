import firebase from './firebaseSetup'
const db = firebase.firestore()

const getRef = (ref) => {
    return db.doc(ref);
}
const getPitchesByDistrict = async (districtId) => {
    let pitches = [];
    let district = await get(`district/${districtId}`)
    for (const pitchRef of district['pitches']){
        await pitchRef.get().then(doc => {
            pitches = pitches.concat(doc.data());
            })
        }
    return pitches
}

const getPitches = async() => {
    let pitches = [] 
    await db.collection('pitch').get().then(
        (querySnapshot) => {
            querySnapshot.forEach(
                (doc) => {
                    pitches = pitches.concat(doc.data())
                }
            )
        }
    )
    return pitches
}

const getFavouritePitchesByUser = (userId, callback) => {
    const ref = `user/${userId}`;
    const getPitchesFromUserDoc = (userDoc) => {
        let pitches = []
        let pitchRefs = userDoc.data()['favourite_pitches']
        for (let i = 0; i < pitchRefs.length; i++) {
            pitchRefs.get().then(
                doc => {
                    pitches = pitches.concat(doc.data())
                    if (i === pitchRefs.length) {
                        callback(pitches)}
                }
            )
        }
    }
    get(ref, getPitchesFromUserDoc)
}

const getUserNames = async () => {
    let usernames = []
    await db.collection("user").get().then(
        (querySnapshot) => {
            querySnapshot.forEach(
                (doc) => {
                    const username = doc.data().username;
                    usernames = usernames.concat(username)
                }
            )
        }
    )
    return usernames
}

const get = async (ref) => {
    let data;
    await db.doc(ref).get().then((doc) => {
        data = doc.data()
    })
    return data
}

const update = (ref, object) => {
    db.doc(ref).update(object)
    return true
}

const addUser = (id, email, username) => {
    let user = {
        id: id,
        district: "",
        email: email,
        username: username,
        favourite_pitches: [],
        friend_requests: [],
        friends: []
    }
    db.collection('user').doc(id).set(user);
}

export { getPitchesByDistrict, getUserNames, addUser, update, getRef, get,getFavouritePitchesByUser,getPitches};