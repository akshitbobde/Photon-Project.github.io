const auth = "API_KEY";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;


//Event LIstners
searchInput.addEventListener("input",updateInput);
form.addEventListener('submit',(e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})

more.addEventListener('click',loadMore);

function updateInput(e){
    // console.log(e.target.value);
    searchValue = e.target.value;
    //isse apan jyaa kuch nahi kar rahe bas ki input  jo likh rahe hai vo cosole log karke search input naam ke function me use karr rahe hai target matlb likha hai prortype e likh ke aata n value to vo hai bas aur kuch naai
}

async function fetchApi(url){
    //ye n basically ek data jo hao n apne ko images la ke de raha hai api use karke to data ye object return kar raha hai jisme baht sari photos aapan ne use kari hai uska hi use kar rahe hai apan isme apan abhi for each laga kek dekhenge and sabhi ke sabhi phtos access karenge
    
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            //aone ko pits jsin application ke form mr chaiye isiliye
            Authorization: auth
            //ye sabse imp hai authorisation wala part
        }
    });
    const data = await dataFetch.json();
    //console.log(data);
    return data; 
}

function generatePictures(data){
    data.photos.forEach(photo => {
        //console.log(photo);
        const galleryImg = document.createElement('div');
        //apa ek div bana rahe jisme apan photo lake rakhk sakhte hai
        galleryImg.classList.add('gallery-img');
        //ek classlist gallery img me apan ne usko add kiya hai
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        //yaha pe vahi object se apan photographer ka naam la rahe hai aur luluch nahi object hai and usko fetch karke html class list add karke apne ko dalna hai bas //ye photo ko console log karke large classic bahut sare aur img apne ko mil sakht hai
        gallery.appendChild(galleryImg);
    });
    
}


async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data = await fetchApi(fetchLink);
    generatePictures(data);
    
    
}

async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
    const data = await fetchApi(fetchLink)
    generatePictures(data);
}


function clear(){
    gallery.innerHTML = " ";
    //ye function iske liye hai ki jo search kare to sprecific pictures aaye aur defalut wale clear hogae bas aur kuch nahi
    searchInput.value =  " ";
    //isse jo apan input me likh rahe hai vo clear hogaega aur kuch nahi 
}
//ye load more button hai bas aur uch nahi usme agar more click kiya to link se fetch kar lega and usme vi fetch link aaega

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

//apan pictures asel me dowmload nai karne de raha kyuki browser bhar ke link se download karne nahi dene wala hai isiliye vo jo hai mana kar dega security reasons ke liye

curatedPhotos();

