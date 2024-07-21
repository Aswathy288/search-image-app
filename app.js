/*
    Pexels API Authorization: 
    imuBCqb774YbFmZxhdrCWyRS9XuTreUVJvhlYVzkDLd9H50MX2j6lVa4
*/
const auth = "imuBCqb774YbFmZxhdrCWyRS9XuTreUVJvhlYVzkDLd9H50MX2j6lVa4";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let fetchlink;
let currentSearch;
let page = 1;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});
more.addEventListener("click",loadMore);

function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    });
    const data = await dataFetch.json();
   return (data);
}
function generatePicture(data){
    data.photos.forEach((photo)=>{
        const galleryImg = document.createElement("div")

        galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
    
    <p>${photo.photographer}</p>
 <a target="_blank" href="${photo.src.original}">Download</a>

    </div>

    <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImg);
    });

}

async function curatedphoto() {
    fetchlink="https://api.pexels.com/v1/curated?per_page=16&page=1"
    const data = await fetchApi(fetchlink);
    generatePicture(data);
    

    
}
async function searchPhotos(query) {
    clear();
    fetchlink = `https://api.pexels.com/v1/search?query=${query}&per_page=16&page=1`;
    const data = await fetchApi(fetchlink);
    generatePicture(data);
}
 function clear(){
    gallery.innerHTML = "";
    searchInput.value = "";
 }
 async function loadMore(){
    page++;
    if(currentSearch){
        fetchlink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=${page}`;
    }
    else{
        fetchlink = `https://api.pexels.com/v1/curated?per_page=16&page=${page}`
    }
    const data = await
    fetchApi(fetchlink)
    generatePicture(data)
 }
curatedphoto();
