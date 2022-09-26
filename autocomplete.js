const createAutoComplete = ({root, renderOption,onOptionSelect, inputValue, fetchData}) => {
root.innerHTML = `
    <label><b>Search</b></label>
    <input class = "input"/>
    <div class = "dropdown">
        <div class = "dropdown-menu">
            <div class ="dropdown-content results"></div>
        </div>   
    </div>
`;
//I do not have to search for all DOCUMENT. I should find what i want from root
const input = root.querySelector('input');
const dropdown = root.querySelector('div .dropdown');
const resultWrapper = root.querySelector('.results');

const onInput = async (event) => {
    const items = await fetchData(event.target.value);
    if(!items.length){
        dropdown.classList.remove('is-active');// this will say if we do not get anything from API, do not open searching results bar.
        return;//it will end function early than usual.
    }

    resultWrapper.innerHTML = ""; // That is to make it clear the list for right after the searches.
    dropdown.classList.add('is-active');
    for(let item of items){
        const option = document.createElement('a');
        
        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');// After selecting the film, searchbar will get removed.
            input.value  = inputValue(item);//Clicked film will be in searchbar's text.
            onOptionSelect(item)
        });

        resultWrapper.appendChild(option);
    }
    
};
input.addEventListener('input', debounce(onInput, 500))
document.addEventListener('click', event => {
    console.log(event.target);// it will allow us the element when we click.
    if(!root.contains(event.target)){//root is the searchbar.
        dropdown.classList.remove('is-active');//it will help us to close it.
    }
}); //It has been added in order to get rid of the filmwrapper while user click different part of page.
}