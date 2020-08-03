import firebase from './firebaseSetup'
const db = firebase.firestore()

const getRef = (ref) => {
    return db.doc(ref);
}

const getPitches = async () => {
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

const getFavouitePitchesFromUser = async (user) => {
    const pitchRefs = user.favourite_pitches
    let pitches = []
    for (let i=0;i<pitchRefs.length;i++){
        let pitch = await get(`pitch/${pitchRefs[i].id}`)
        pitches.push(pitch)
    }
    return pitches
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

export { getUserNames, addUser, update, getRef, get, getFavouitePitchesFromUser, getPitches };