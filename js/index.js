'use strict'
const getData=async()=>{
     // handle search icon clicked function
     const date=document.getElementById('city');
     const getCity=document.getElementById('getCity');
     const SearchIcon=document.getElementById('search');
     // function to get city from input

getCity.addEventListener('input', (e) => {
    const city = e.target.value;
    SearchIcon.addEventListener('click', async () => {
      
        const {data} = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Eg&method=8`).then(response=> response.json())
        .catch ((error)=>
        console.error(error))
        // console.log(data);
        
    const{Asr,Fajr,Dhuhr,Isha,Maghrib}=data.timings ;
   
    // make a div to but the date english and time dinamcly 
    setInterval(()=>{
        // const moment = require('moment');
        var CurrentTime= moment().format('HH:mm');//new Date().toLocaleString();
        const timer_title=document.getElementById('timer');
        // handle rest time for next pray
        
        const rest_time=(current,next)=>{
            if (!current || !next) {
                throw new Error("Invalid input: both current and next times are required");
              }

            const [hours1, minutes1] = next.split(':').map(Number);// بعد ما فصلنا الوقت هنحوله كله لدقايقونطرحه بعدين نرجعه تاني ساعات
            const [hours2, minutes2] = current.split(':').map(Number);

            if (isNaN(hours1) || isNaN(minutes1) || isNaN(hours2) || isNaN(minutes2)) {
                throw new Error("Invalid input: time format must be HH:MM");
              }

            const totalMinutes1 = hours1 * 60 + minutes1;
            const totalMinutes2 = hours2 * 60 + minutes2;
            
            const diffMinutes = totalMinutes1 - totalMinutes2;
            
            var hours = Math.floor(diffMinutes / 60);
            var minutes = diffMinutes % 60;

            // make dicresess timer
            minutes--;
            if(minutes<=1){
                hours--;
                minutes=60;
            }
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        };
   
        // if condition to handle defalte case of swith to see next pray
        const rest_Pray=()=>{
            if(CurrentTime < Fajr && CurrentTime > Isha && CurrentTime <= '24:00' ){
                return`<h2> متبقي حتى صلاة الفجر</h2>
                <h2>${rest_time(CurrentTime,Fajr)}</<h2>`;
            }else if(CurrentTime < Dhuhr && CurrentTime > Fajr){
                return`<h2> متبقي حتى صلاة الظهر</h2>
                <h2>${rest_time(CurrentTime,Dhuhr)}</<h2>`;
            }else if(CurrentTime < Asr && CurrentTime  > Dhuhr){
                return`<h2> متبقي حتى صلاة العصر</h2>
                <h2>${rest_time(CurrentTime,Asr)}</<h2>`;
            }else if(CurrentTime < Maghrib && CurrentTime > Asr){
                return`<h2> متبقي حتى صلاة المغرب</h2>
                <h2>${rest_time(CurrentTime,Maghrib)}</<h2>`;
            }else if(CurrentTime < Isha && CurrentTime >  Maghrib){
                return`<h2> متبقي حتى صلاة العشاء</h2>
                <h2>${rest_time(CurrentTime,Isha)}</<h2>`;
            }else{
                return`<h2> متبقي حتى صلاة الفجر</h2>`;
            }
        };
        // swich to make timer to current pray
        const tiltle=()=>{
       switch(CurrentTime){
            case Fajr:
                return `<h2>حان الان موعد صلاة الفجر</h2>
                <h2>الأن...</<h2>`
                break;
            case Dhuhr:
                return `<h2>حان الأن موعد صلاة الظهر </h2>
                <h2>الأن...</<h2>`
                break;
            case Asr:
                return `<h2>حان الأن موعد صلاة العصر </h2>
                <h2>الأن...</<h2>`
                break;
            case Maghrib:
                return `<h2> حان الأن موعد صلاة المغرب </h2>
                <h2>الأن...</<h2>`
                break;
            case Isha:
                return `<h2>حان الأن موعد صلاة العشاء </h2>
                <h2>الأن...</<h2>`
                break;
            default:
                return `${rest_Pray()}
                <h2>${rest_time(CurrentTime,Fajr)}</<h2>`
        };};
        timer_title.innerHTML=tiltle();
        // console.log(CurrentTime);
    },1000)

const dataTiming=[
    {
        id:1,
        img:'./images/images.jpg',
        title:'الفجر',
        time:`${Fajr} AM`
    },
    {
        id:1,
        img:'./images/ظهر.jpg',
        title:'الظهر',
        time:`${Dhuhr} PM`
    },
    {
        id:1,
        img:'./images/عصر.jpg',
        title:'العصر',
        time:`${Asr} PM`
    },
    {
        id:1,
        img:'./images/مغرب.jpg',
        title:'المغرب',
        time:`${Maghrib} PM`
    },
    {
        id:1,
        img:'./images/عشاء.jpg',
        title:'العشاء',
        time:`${Isha} Pm`
    },

];
    function setDeat(){
        // another style of date
        const Another=document.getElementById('another');
        const AnotherDate=data.date.readable;
        Another.innerHTML=AnotherDate;
        
        // make date and city and timer dinamic in html
        const datt={
            date:`${data.date.hijri.date}`,
            city:`${getCity}`
        };
       
        date.innerHTML=`<h2 style='direction:ltr; float:right;'>${datt.date}</h2><br>
                    <h2 style='float:right;'>${city}/ Egypt</h2>`
    };
    setDeat();
    function drawItems(){
        const another=document.getElementById('another');
        const cardsDiv=document.querySelector('#cards');
        const cards=document.createElement('div');
        cards.classList=('cardsDiv');
        cards.style.width='100%';
        cards.style.display='flex';
        const sala=dataTiming.map((sala)=>{
            return`<div class="card col-2 mx-2 bg-dark" key=${sala.id} style="height: 15em;">
                <img src=${sala.img} class="card-img-top" alt="..." height="50%">
                <div class="card-body text-light">
                    <p class="card-text">${sala.title}</p>
                    <h2>${sala.time}</h2>
            </div>`}
        );
        for(let x=1;x<=sala.length;x++){
            const elemants=sala.slice(x-1,x);
            cards.innerHTML +=(elemants)
        }
        cardsDiv.appendChild(cards);
        
    }
    drawItems();
});
});
}
document.addEventListener('DOMContentLoaded',()=>{
    getData();
})