// Dom elements
const container = document.querySelector('.employee-cards')
// URL
const randomuser = 'https://randomuser.me/api/'

// Async/Await fetch function
async function fetchData(url, callback){
    try{
        const res = await fetch(url)
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        callback(data)
    }catch(e){
        console.log(e)
    }
}

// Generating an HTML card for data returned
const generateHTML = data => {
    const card = document.createElement('DIV');
    const {name, email, location, picture} = data;
    card.classList.add('card');
    card.innerHTML = `
        <img src="${picture.large}">
        <div class="titles">
        <h2>${name.first} ${name.last}</h2>
        <p>${email}</p>
        <p>${location.city}</p>
        </div>
    `;
    container.appendChild(card);
}

const employees = (result) => {
    for(let i = 1; i <= 12; i++){
         fetchData(result, data => {
            const response = data.results[0];
            generateHTML(response)
        })
    }    
}

employees(randomuser)


    
    

    

   


