'use strict'
const dataTiming=[
    {
        id:1,
        img:'./images/images.jpg',
        title:'الفجر',
        time:'04:41 AM'
    },
    {
        id:1,
        img:'./images/ظهر.jpg',
        title:'الظهر',
        time:'12:41 AM'
    },
    {
        id:1,
        img:'./images/عصر.jpg',
        title:'العصر',
        time:'04:30 AM'
    },
    {
        id:1,
        img:'./images/مغرب.jpg',
        title:'المغرب',
        time:'07:51 AM'
    },
    {
        id:1,
        img:'./images/عشاء.jpg',
        title:'العشاء',
        time:'08:20 AM'
    },

]
function drawItems(){
    const cardsDiv=document.querySelector('#cards');
    const cards=document.createElement('div');
    const sala=dataTiming.map((sala)=>{
        return`<div class="card" style="width: 18rem;" key=${sala.id}>
            <img src=${sala.img} class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${sala.title}</p>
                <h2>${sala.time}</h2>
        </div>`}
    );
    cards.innerHTML=sala.forEach(child=>{
        cards.appendChild(child)
    });
    cardsDiv.appendChild(cards);
}
drawItems();