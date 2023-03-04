const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools))
}
const showData = (cards) => {

     cards=cards.slice(0,12);
    const cardContainerSection = document.getElementById('cardsContainer');
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
    <div class="d-flex gap-4">
    <div class="card bg-danger-subtle border border-danger-subtle p-3 mx-auto w-100">
  <div class="card-body">
    <h5 class="card-title">${singleCard.description}</h5>
    <div class="ms-5 d-flex">
                ${ singleCard.pricing.map(singlePricing=>`<div class="mx-1 p-2 rounded w-25 bg-white"><h6 class=" text-success d-inline-block ">${singlePricing.price} </h6><br><h6 class=" text-danger  d-inline-block ">
                ${singlePricing.plan}</h6></div>`).join('')}
    </div>
   
   <div class="d-flex justify-content-around">
   <div> <h5>Features</h5>
   
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
<div class="card  border  p-3 mx-auto w-100">
  <div class="card-body">
  <img src="${singleCard.image_link[0]
  }" class="img-fluid rounded">
    
    <p class="card-text fw-bold">${singleCard.input_output_examples.map(data=>`${data.input}`)}</p>
    <p class="card-text">${singleCard.input_output_examples.map(data=>`${data.output}`)}</p>
    
  </div>
</div>
    </div>
    
    `;
    
    
}
const togglespinner=(isLoading)=>{
    const toggleField=document.getElementById('toggleSpinner');
    if(isLoading){
        toggleField.classList.remove('d-none');
    
    }
    else{
        toggleField.classList.add('d-none');
    }
}
document.getElementById('showAllBtn').addEventListener('click',function(){
    togglespinner(true);
    loadData()
})

loadData();