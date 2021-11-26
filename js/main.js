let cardsCharac = document.getElementById("cards--characters");
let pagination = document.getElementById("pagination");

let paginationObject={};
let linkFetch = "";
const obtainCharacter = async ()=>{
    try {
        let data;
        if(linkFetch.length<1){
            data = await fetch("https://rickandmortyapi.com/api/character");
        }else{
            data = await fetch(linkFetch);
        }
        let list = await data.json();
    
        paginationObject["next"] = list.info.next;
        paginationObject["pages"] = list.info.pages;
        paginationObject["prev"] = list.info.prev;
        
        console.log(list);
        return list.results;
    } catch (error) {
        return error;
    }
}


const showCharacter = async ()=>{
    try {
        const listData = await obtainCharacter();
    
    
        //Create template
        let template = document.createElement("template");
        for (const iterator of listData) {
            template.innerHTML += `
            <div class="cardCharacter">
                <div class="cardCharacter__header">
                    <img src="${iterator.image}" alt="">
                </div>
                <div class="cardCharacter__body">
                    <h2 class="cardCharacter__body__title"><a href="#"  class="link">${iterator.name}</a></h2>
                    <p class="cardCharacter__txt">Status: <span>${iterator.status}</span></p>
                    <p class="cardCharacter__txt">Origin: <span>${iterator.origin.name}</span></p>
                    <p class="cardCharacter__txt">Location: <span>${iterator.location.name}</span></p>
                </div>
            </div>`
        }
    
        //Add template to cards container
        cardsCharac.innerHTML = template.innerHTML;
    
        if(paginationObject["next"] === null){
            pagination.innerHTML = `<li><button class="btn--pagination" value="${paginationObject["prev"]}">Previous</button></li>`;
        }else
        if(paginationObject["prev"] === null){
            pagination.innerHTML = `<li><button class="btn--pagination" value="${paginationObject["next"]}">Next</button></li>`;
        }else{
            pagination.innerHTML = `<li><button class="btn--pagination" value="${paginationObject["prev"]}">Previous</button></li><li><button class="btn--pagination" value="${paginationObject["next"]}">Next</button></li>`;
        }
        
    } catch (error) {
        console.log(error);
    }

}

const init = ()=>{
    showCharacter();
    pagination.addEventListener("click",(e)=>{
        if(e.target.tagName == "BUTTON"){
            linkFetch = e.target.value;
            showCharacter();
        }
    });
}

init();