const debounce = (funct, delay = 1000) => {
    let timeoutId;
    return (...arguments) => {
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            funct.apply(null, arguments);
        }, delay);
    }
}