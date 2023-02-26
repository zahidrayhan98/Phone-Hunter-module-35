

 const loadPhones = async(searchText,dataLimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // searchText.innerText="";
    const res =  await fetch(url);
    const data = await res.json ();
     displayData(data.data,dataLimit);
 }
 const displayData = (phone,dataLimit) =>{
//   displayPhones ////
const showAll = document.getElementById('show-all');
   if (dataLimit && phone.length > 10){

       phone = phone.slice(0,10) 
       showAll.classList.remove('d-none');
   }
   else{
    showAll.classList.add('d-none');
   }

   ///// display no phone /////
   const noPhone = document.getElementById('no-phone-found');
   if(phone.length === 0){
  noPhone.classList.remove('d-none');
   }
   else{
    noPhone.classList.add('d-none');
   }
     const phoneContainer = document.getElementById('phone-container');
     phoneContainer.innerText ='';
    phone.forEach(phones => {
        const {image,phone_name,slug} = phones
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        
        <div class="card p-4">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
         
       
        </button>
          </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleLoader(false)
 }

 document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
})

/////input field enter event handler////

  document.getElementById('search-field').addEventListener('keypress',function (press){
    if(press.key === 'Enter'){
        processSearch(10);
    }
  })

const processSearch = (dataLimit)=>{
    toggleLoader(true)
const searchField = document.getElementById('search-field');
const searchText = searchField.value;
loadPhones(searchText,dataLimit); 


}

 const toggleLoader = isLoading =>{
const loaderSection = document.getElementById('loader');
    if (isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none')
    }


 }
 document.getElementById('show-all').addEventListener('click', function(){
    processSearch();
 })
 const loadPhoneDetails=  async(id)=>{
    const url= `https://openapi.programming-hero.com/api/phone/${id}`;
    const res =  await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
 }

    const displayPhoneDetails =(phone)=>{
        const modalTitle = document.getElementById('phoneModalLabel');
        modalTitle.innerText=phone.name;
     const phoneDetails =document.getElementById('phone-details');
     phoneDetails.innerHTML=`
     <p> Release date : ${phone.releaseDate ? phone.releaseDate : "no release date found"} </p>
    <p> Storage:${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage information'}

<p> Others : ${phone.others ? phone.others.Bluetooth : 'no bluetooth information'} 
   <p> Sensor : ${phone.mainFeatures.sensors[0]} </p>
     `

    }


  loadPhones('iphone');