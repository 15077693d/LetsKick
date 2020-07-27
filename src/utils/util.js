// utils
const index2Id = (index) => {
    let paddingZero = ""
    let id = String(index)
    const iteration = 5 - String(index).length
    for (let i = 0; i < iteration; i++) {
        paddingZero += "0"
    }
    id = paddingZero + id
    return id
}

const filterSearch = (doc, search, language) => {
    const target = doc[`name_${language}`];
    if (target.toUpperCase().includes(search.toUpperCase())) {
        return true;
    } else {
        return false;
    }
}

// 0,1,2 -> + 1 -> 1,2,3 -> %total -> 1,2,0 -> +1->2,3,1 ->% total -> 2,0,1
const head2Tail = (list,total) => {
    let newList = list.map((value,i)=>(list[(i+1)%total]))
    return newList
}

// 0,1,2 -> - 1 -> -1,0,1 -> if -1?2:value -> 2,0,1 -> -1 ->1,-1,0 -> -1?2:value -> 1,2,0
const tail2Head = (list,total) => {
    let newList = list.map((value,i)=>(list[i-1===-1?total-1:i-1]))
    return newList
}

export { index2Id, filterSearch, head2Tail,tail2Head};