// Dom elements
const container = document.querySelector('.employee-cards');
const overlay = document.getElementById("overlay");
const popUpContent = document.querySelector('.pop-up-content')
const popUpClose = document.querySelector('.close-pop-up')
// URL
let employees = [];
const randomuser = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;


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
        const response = await data.results;
        const returnedData = generateHTML(response)
        return returnedData
    }catch(e){
        console.log(e)
    }
}
fetchData(randomuser)

// Generating an HTML card for data returned
const generateHTML = (employeeData) => {
console.log(employeeData)
    employees = employeeData;

    // store the employee HTML as we create it
    let employeeCard = '';

    // loop through each employee and create HTMl markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeCard +=`
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}">
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="city">${city}</p>
                </div>
            </div>
        `
    })
    container.innerHTML = employeeCard;
}

const generatePopUp = (index) => {
    let {name, dob, phone, email, 
        location: {city, street, state, 
        postcode}, picture} = employees[index];

        let date = new Date(dob.date);

        const innerpopup =`
        <div class="image-wrap">
            <img class="avatar" src="${picture.large}" />
        </div>
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `

        on()
        popUpContent.innerHTML = innerpopup;
}



// Click events
container.addEventListener('click', e => {
//   make sure the click is not on the container itself
    if(e.target !== container){
        // select the card element based on its proximity to the actual element 
        // clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        generatePopUp(index)
    }
})
// turn off overlay
overlay.addEventListener('click', e => {
   if(e.target === popUpClose){
       off()
   }
})
    
    

    

   


