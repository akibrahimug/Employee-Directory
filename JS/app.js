// Dom elements
const container = document.querySelector('.employee-cards');
const overlay = document.getElementById("overlay");
// URL
const randomuser = 'https://randomuser.me/api/';


// Overlay functinonality
function on() {
    overlay.style.display = "block";
  }
  
  function off() {
    overlay.style.display = "none";
  }


// Async/Await fetch function
async function fetchData(url){
    try{
        const res = await fetch(url)
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        const response = data.results[0];
        return response;
    }catch(e){
        console.log(e)
    }
}
const returnedData = (html) => {
    fetchData(randomuser)
    .then(data => html(data, document.createElement('DIV'), container))
}


// Generating an HTML card for data returned
const generateHTML = (data, card, wrap) => {
    const {name, email, location, picture, cell, dob} = data;
    card.classList.add('card');
    card.innerHTML = `
        <img src="${picture.large}">
        <div class="titles">
            <h2>${name.first} ${name.last}</h2>
            <p>${email}</p>
            <p>${location.city}</p>
        </div>
        <div class="more-info hidden">
            <p>${cell}</p>
            <p>${location.street.number} ${location.street.name} ${location.city} ${location.state} ${location.postcode}</p>
            <p>${dob.date}</p>
        </div>
    `;
    wrap.appendChild(card);
}

// looping through the url to return 12 requests
const employees = () => {
    for(let i = 1; i <= 12; i++){
         returnedData(generateHTML)
    }    
}
employees()

// const overlayInfo = (btn) => {
//     const image = btn.querySelector('img');
//     const titles = btn.querySelector('.titles');
//     const moreInfo = btn.querySelector('.more-info');
//     const wrapper = document.createElement('DIV');
//     wrapper.classList.add('wrapper')
//     moreInfo.classList.add('show')
//     wrapper.appendChild(image)
//     wrapper.appendChild(titles)
//     wrapper.appendChild(moreInfo)
//     overlay.appendChild(wrapper)
    
// }

// Click events
container.addEventListener('click', e => {
    const buttons = container.querySelectorAll('.card');
    buttons.forEach(button => {
        if(e.target === button){
            on();
        //    overlayInfo(button)
        }
    })
})
// turn off overlay
overlay.addEventListener('click', e => {
    off()
})
    
    

    

   


