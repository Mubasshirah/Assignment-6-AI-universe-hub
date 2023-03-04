const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => showData(data.data.tools))
}
const showData = (cards) => {

     cards=cards.slice(0,6);
    const cardContainerSection = document.getElementById('cardsContainer');
    for (const card of cards) {
        console.log(card)
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
                      <p class="d-flex justify-content-between"><span><i class="fa-solid fa-calendar-check px-2 text-secondary"></i>${card.published_in}</span>    <button class="border border-0 rounded-circle"><i class="fa-solid fa-arrow-right text-danger "></i></button></p>

                    </div>
                  </div>
     `;
        cardContainerSection.appendChild(newDiv);
    }
}
loadData();