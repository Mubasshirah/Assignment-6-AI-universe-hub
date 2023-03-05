const togglespinner=(isLoading)=>{
    const toggleField=document.getElementById('toggleSpinner');
    if(isLoading){
        toggleField.classList.remove('d-none');
    
    }
    else{
        toggleField.classList.add('d-none');
    }
}

const loadData = (datalimit) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools,datalimit))
}
const showData = (cards,datalimit) => {
console.log(cards);
    togglespinner(true);
    const cardContainerSection = document.getElementById('cardsContainer');
    cardContainerSection.innerText='';
    const showAllBtnDivSec=document.getElementById('showAllBtnDiv');
    if(datalimit && cards.length>6){
    cards=cards.slice(0,6);
showAllBtnDivSec.classList.add('d-block');
    }
    else{
      showAllBtnDivSec.classList.add('d-none');
    }
   
    for (const card of cards) {
        
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
     <div class="card p-3 h-100">
                    <img src="${card.image}" class="card-img-top  rounded " alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Features</h5>
                      <ol>
                ${card.features.map(feature=>
                    `<li class="fs-6">${feature}</li>`).join('')}
              </ol>
              <hr>
                      <h4>${card.name}</h4>
                      <p class="d-flex justify-content-between"><span><i class="fa-solid fa-calendar-check px-2 text-secondary"></i>${card.published_in}</span>    <button onclick="loadSingleCardData('${card.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="border border-0 rounded-circle"><i class="fa-solid fa-arrow-right text-danger "></i></button></p>
                      

                    </div>
                  </div>
     `;
        cardContainerSection.appendChild(newDiv);
        togglespinner(false);
    
    }
}
const loadSingleCardData=(id)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>showSingleCardData(data.data))
}
const showSingleCardData=(singleCard)=>{
    console.log(singleCard)
    const modalContainerSection=document.getElementById('modalContainer');
    
    modalContainerSection.innerHTML=`
    <div class="d-flex flex-sm-column flex-md-row flex-lg-row gap-4">
    <div class="card bg-danger-subtle border border-danger-subtle p-3 mx-auto w-100">
  <div class="card-body">
    <h5 class="card-title">${singleCard.description}</h5>
    <div class="ms-5 d-flex">
    ${ singleCard.pricing? singleCard.pricing.map(singlePricing=>`<div class="mx-1 p-2 rounded w-50 bg-white"><h6 class=" text-success d-inline-block ">${singlePricing.price} </h6><br><h6 class=" text-danger  d-inline-block ">${singlePricing.plan}</h6></div>`).join(''):'No cost data found'}
    </div>
   
   <div class="d-flex justify-content-around mt-5">
   <div> <h5>Features</h5>
   <ul>
   ${Object.entries(singleCard.features).map(singleFeature=>`<li>${singleFeature[1].feature_name}</li>`).join('')}


   </ul>
   </div>
   <div><h5>Integrations</h5>
   <ul>
   ${singleCard.integrations? singleCard.integrations.map(singleIntegration=>
    
    `<li>${singleIntegration}</li>`).join('') : `<p>no data found</p>`}   
   </ul>
   </div>
   </div>
  </div>
</div>
<div class="card  border  p-3 mx-auto w-100 position-relative">
  <div class="card-body">
  <img src="${singleCard.image_link[0]
  }" class="img-fluid rounded">
    
    <p class="card-text fw-bold">${singleCard.input_output_examples? singleCard.input_output_examples[0].input :'Can you give an example?'}</p>
    <p class="card-text">${singleCard.input_output_examples? singleCard.input_output_examples[0].output : 'Take a break!! No data found'}</p>
    
  </div>
</div>
${singleCard.accuracy.score?`<button  class="btn btn-danger text-light px-5 py-1 rounded position-absolute top-0 end-0">${singleCard.accuracy.score*100} % accuracy</button>`: `<button  class="btn btn-danger d-none  text-light px-5 py-1 rounded position-absolute top-0 end-0">${singleCard.accuracy.score*100} % accuracy</button>`} 


    </div>
    
    `;
    
    
}
const showAllBtnFunction=(datalimit)=>{

  togglespinner(true);

  loadData(datalimit);
}
document.getElementById('showAllbtn').addEventListener('click',function(){
  showAllBtnFunction();
})
const byDate=(a,b)=>{
  return new Date(a.published_in).valueOf()- new Date(b.published_in).valueOf();
}
document.getElementById('sortByDateBtn').addEventListener('click',function(){
  togglespinner(true);
  const loadData = (datalimit) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools,datalimit))
}
const showData = (cards,datalimit) => {
console.log(cards);
    togglespinner(true);
    cards.sort(byDate);
    const cardContainerSection = document.getElementById('cardsContainer');
    cardContainerSection.innerText='';
    const showAllBtnDivSec=document.getElementById('showAllBtnDiv');
    if(datalimit && cards.length>6){
    cards=cards.slice(0,6);
showAllBtnDivSec.classList.add('d-block');
    }
    else{
      showAllBtnDivSec.classList.add('d-none');
    }
   
    for (const card of cards) {
        
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
     <div class="card p-3 h-100">
                    <img src="${card.image}" class="card-img-top  rounded " alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Features</h5>
                      <ol>
                ${card.features.map(feature=>
                    `<li class="fs-6">${feature}</li>`).join('')}
              </ol>
              <hr>
                      <h4>${card.name}</h4>
                      <p class="d-flex justify-content-between"><span><i class="fa-solid fa-calendar-check px-2 text-secondary"></i>${card.published_in}</span>    <button onclick="loadSingleCardData('${card.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="border border-0 rounded-circle"><i class="fa-solid fa-arrow-right text-danger "></i></button></p>
                      

                    </div>
                  </div>
     `;
        cardContainerSection.appendChild(newDiv);
        togglespinner(false);
    
    }
}
const loadSingleCardData=(id)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>showSingleCardData(data.data))
}
const showSingleCardData=(singleCard)=>{
    console.log(singleCard)
    const modalContainerSection=document.getElementById('modalContainer');
    
    modalContainerSection.innerHTML=`
    <div class="d-flex flex-sm-column flex-md-row flex-lg-row gap-4">
    <div class="card bg-danger-subtle border border-danger-subtle p-3 mx-auto w-100">
  <div class="card-body">
    <h5 class="card-title">${singleCard.description}</h5>
    <div class="ms-5 d-flex">
    ${ singleCard.pricing? singleCard.pricing.map(singlePricing=>`<div class="mx-1 p-2 rounded w-50 bg-white"><h6 class=" text-success d-inline-block ">${singlePricing.price} </h6><br><h6 class=" text-danger  d-inline-block ">${singlePricing.plan}</h6></div>`).join(''):'No cost data found'}
    </div>
   
   <div class="d-flex justify-content-around mt-5">
   <div> <h5>Features</h5>
   <ul>
   ${Object.entries(singleCard.features).map(singleFeature=>`<li>${singleFeature[1].feature_name}</li>`).join('')}


   </ul>
   </div>
   <div><h5>Integrations</h5>
   <ul>
   ${singleCard.integrations? singleCard.integrations.map(singleIntegration=>
    
    `<li>${singleIntegration}</li>`).join('') : `<p>no data found</p>`}   
   </ul>
   </div>
   </div>
  </div>
</div>
<div class="card  border  p-3 mx-auto w-100 position-relative">
  <div class="card-body">
  <img src="${singleCard.image_link[0]
  }" class="img-fluid rounded">
    
    <p class="card-text fw-bold">${singleCard.input_output_examples? singleCard.input_output_examples[0].input :'Can you give an example?'}</p>
    <p class="card-text">${singleCard.input_output_examples? singleCard.input_output_examples[0].output : 'Take a break!! No data found'}</p>
    
  </div>
</div>
${singleCard.accuracy.score?`<button  class="btn btn-danger text-light px-5 py-1 rounded position-absolute top-0 end-0">${singleCard.accuracy.score*100} % accuracy</button>`: `<button  class="btn btn-danger d-none  text-light px-5 py-1 rounded position-absolute top-0 end-0">${singleCard.accuracy.score*100} % accuracy</button>`} 


    </div>
    
    `;
    
    
}
const showAllBtnFunction=(datalimit)=>{

  togglespinner(true);

  loadData(datalimit);
}
document.getElementById('showAllbtn').addEventListener('click',function(){
  showAllBtnFunction();
})
  
loadData(6);
})

loadData(6);
