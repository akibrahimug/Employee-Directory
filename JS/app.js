// Dom elements
const container = document.querySelector('.employee-cards')
const overlay = document.getElementById("overlay")
// URL
const randomuser = 'https://randomuser.me/api/'


// Overlay functinonality
function on() {
    overlay.style.display = "block";
  }
  
  function off() {
    overlay.style.display = "none";
  }
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
        <img src="${picture.large}" class="card">
        <div class="titles">
        <h2 class="card">${name.first} ${name.last}</h2>
        <p class="card">${email}</p>
        <p class="card">${location.city}</p>
        </div>
    `;
    container.appendChild(card);
}
// looping through the url to return 12 requests
const employees = (result) => {
    for(let i = 1; i <= 12; i++){
         fetchData(result, data => {
            const response = data.results[0];
            generateHTML(response)
        })
    }    
}
employees(randomuser)

// Click events
container.addEventListener('click', e => {
    const buttons = document.querySelectorAll('.card');
    buttons.forEach(button => {
        if(e.target === button){
            on()
        }
    })
})
overlay.addEventListener('click', e => {
    off()
})
    
    

    

   


