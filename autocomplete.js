const createAutoComplete = ({root, renderOption}) => {
root.innerHTML = `
    <label><b>Search For a Movie </b></label>
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
    const movies = await fetchData(event.target.value);
    if(!movies.length){
        dropdown.classList.remove('is-active');// this will say if we do not get anything from API, do not open searching results bar.
        return;//it will end function early than usual.
    }

    resultWrapper.innerHTML = ""; // That is to make it clear the list for right after the searches.
    dropdown.classList.add('is-active');
    for(let movie of movies){
        const option = document.createElement('a');
        
        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(movie);
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');// After selecting the film, searchbar will get removed.
            input.value  = movie.Title;//Clicked film will be in searchbar's text.
            onMovieSelect(movie);

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