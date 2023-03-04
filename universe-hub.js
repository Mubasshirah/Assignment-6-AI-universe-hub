const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools))
}
const showData = (cards) => {

     cards=cards.slice(0,6);
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
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's conte</p>
   <div class="d-flex justify-content-around">
   <div> <h5>Features</h5>
   <ul>${Object.entries(singleCard.features).forEach(entry=>{
    // `<li>${entry[1]}</li>`
    console.log(entry)
    // console.log(entry[1])
    // console.log(entry[1].feature_name)
   })}</ul>
   </div>
   <div><h5>Integrations<h5></div>
   </div>
  </div>
</div>
<div class="card bg-danger-subtle border border-danger-subtle p-3 mx-auto w-100">
  <div class="card-body">
    <h5 class="card-title">${singleCard.description}</h5>
    <div class="d-flex">
                ${singleCard.pricing? singleCard.pricing.map(singlePricing=>`<h6 class="bg-white rounded text-warning  p-3 me-5">${singlePricing.price} <br>
                ${singlePricing.plan}</h6>`).join(''):'free of cost'}
            </div>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's conte</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
    </div>
    
    `;
    
    
}

loadData();