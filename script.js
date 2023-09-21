const api_key="107ff1ce97ce4b7ea63341a82eb3aa02"
const url="https://newsapi.org/v2/everything?q="
// iska matlb jab hmara window load ho n to hamara news fetch ho jaye wo v india se related
window.addEventListener("load",()=> fetchNews("India"))
// news fetch funtion banate hai
async function fetchNews(query)
{
    // ye fetch jo hai promise return karegi jisko hum response me save kr lenge and uske bad jo data milega usko json me covert kr denge
    // fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${api_key}`)
    const res = await fetch(`${url}${query}&apiKey=${api_key}`);
    // ye v promise return karti hai isliye isko v await krte hai
    const data = await res.json()
    bindData(data.articles);
}

function bindData(articles)
{
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML= '';
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCards(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCards(cardClone,article)
{
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta"});

    newsSource.innerHTML=`${article.source.name} | ${date}`
    cardClone.firstElementChild.addEventListener('click', ()=> {
        window.open(article.url,"_blank");
    });
}

let currNav=null;
function onNavItemClick(id,)
{
    newsInput.value='';
    fetchNews(id);
    const navItem=document.getElementById(id);
    currNav?.classList.remove('active');
    currNav=navItem;
    currNav.classList.add('active');
}

const searchBtn=document.getElementById("search-btn");
const newsInput=document.getElementById("news-input");

searchBtn.addEventListener('click',()=>{
    const query=newsInput.value;
    if(!query) return;
    fetchNews(query);
    currNav?.classList.remove('active');
    currNav=null;
})

function reload()
{
    // reload krne pe ye input field ko khali kar dega
    newsInput.value='';
    window.location.reload();
}