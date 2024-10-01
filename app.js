const BASE_URL =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns = document.querySelectorAll(".drpdwn select ");
const btn= document.querySelector(".b button ");
const opp= document.querySelector(".op");
// const btn= document.querySelector("form button ");

// for(code in countryList){
//     console.log(code);
// }
const fc=document.querySelector(".from .drpdwn select");
const tc=document.querySelector(".to .drpdwn select");
for(let select of dropdowns){
    for(ccode in countryList){
        let noption = document.createElement("option");
        noption.innerText = ccode;
        noption.value = ccode;
 
        if(select.name === "drp" && ccode === "USD"){
            noption.selected = "selected";
        }
        else if( select.name === "drp2" && ccode=== "INR"){
            noption.selected = "selected";
        }

        select.append(noption);
    }
    select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
    })
}

const updateFlag= (element) =>{
let ccode= element.value;
let cntrycode= countryList[ccode]; 
let newsrc= 'https://flagsapi.com/'+cntrycode+'/shiny/64.png';
let img = element.parentElement.querySelector("img");
img.src = newsrc;

}
btn.addEventListener("click",async(event)=>{
    event.preventDefault();
    let amount= document.querySelector(".amt input");
let amtvl= amount.value;
    if(amtvl=== "" ||amtvl < 1){
        amtvl=1;
        amount.value=1;
    }
    // console.log(fc.value, tc.value, amtvl);
    const URL = `${BASE_URL}/${fc.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data[fc.value.toLowerCase()][tc.value.toLowerCase()];
   let finalAmount = amtvl * rate;

   console.log(finalAmount);

    opp.innerText = `Converted Amount is ${finalAmount} ${tc.value}`;
  
    

})
