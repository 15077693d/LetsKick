// utils
const filterSearch = (doc, search, language) => {
    const target = doc[`name_${language}`];
    if (target.toUpperCase().includes(search.toUpperCase())) {
        return true;
    } else {
        return false;
    }
}


export {filterSearch};