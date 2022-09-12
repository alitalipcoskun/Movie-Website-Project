

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
       params: {
        apikey: 'ed5d53dd',
        s: `${searchTerm}`
       } 
    });
    
    if(response.data.Error){
        return [];
    }

    return response.data.Search;
};


const root = document.querySelector('div .autocomplete');
root.innerHTML = `
    <label><b>Search For a Movie </b></label>
    <input class = "input"/>
    <div class = "dropdown">
        <div class = "dropdown-menu">
            <div class ="dropdown-content results"></div>
        </div>   
    </div>
`;
const input = document.querySelector('input');
const dropdown = document.querySelector('div .dropdown');
const resultWrapper = document.querySelector('.results');

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    resultWrapper.innerHTML = ""; // That is to make it clear the list for right after the searches.
    dropdown.classList.add('is-active');
    for(let movie of movies){
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '': movie.Poster;//Checking for empty image, rather than getting error message.
        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src = "${imgSrc}">
            ${movie.Title}
        `;
        resultWrapper.appendChild(option);
    }
    
};
input.addEventListener('input', debounce(onInput, 500))
