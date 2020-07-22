// utils
const index2Id = (index) => {
    let paddingZero = ""
    let id = String(index)
    const iteration = 5-String(index).length
    for(let i=0;i<iteration;i++){
        paddingZero+="0"
    }
    id = paddingZero+id
    return id
}

const filterSearch = (doc,search,language) => {
    const target = doc[`name_${language}`];
    if (target.toUpperCase().includes(search.toUpperCase())){
        return true;
    }else{
        return false;
    }
}

export {index2Id,filterSearch};