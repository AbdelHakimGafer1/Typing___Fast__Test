let QuotabilApi ='https://api.quotable.io/random?minLength=100&maxLength=140';
const QuoteSection =document.getElementById('quote');
const UserInput=document.getElementById('quote-input');
let StartButton=document.getElementById('start-test');
let StopButton=document.getElementById('stop-test');
let resUmeButton=document.getElementById('resume-test');
let wPm=document.getElementById('wpm');
let aCCuracy=document.getElementById('accuracy');

let quote="";
let time =60;
let interval;
// let timer="";
let mistaks=0;
const startTest =()=>{
    TimeReduce();
    mistaks=0;
    UserInput.disabled=false;
    StartButton.style.display='none';
    StopButton.style.display='block';
    QuotableApiFun();
}


resUmeButton.disabled=true;


function updateTime(){
    if (time===0) {
        UserInput.disabled=true;

    }else{
        if (time<=10) {
            document.getElementById('timer').innerText='0'+--time + "s" ;
        }
        else{
            document.getElementById('timer').innerText=--time + "s" ;
        }

    }
}
const TimeReduce=()=>{
     time=60;
   interval=setInterval(() => {
        updateTime();
     }, 1000);
 
}
const resumeTest=()=>{
    resUmeButton.disabled=false;
    interval=setInterval(() => {
        updateTime();
     },1000);
    UserInput.disabled=false;
    StartButton.innerText=`Stop Again`;
    StartButton.style.display='none';
    StopButton.style.display='block';
}

let QuotableApiFun=async()=>{
    let response=await(await fetch(QuotabilApi)).json();
    // console.log(response.content);
    quote=response.content;

let arr =quote.split("").map((value)=>{
    return `<span class='quot-chars'>${value}</span>`
})
QuoteSection.innerHTML=arr.join("");
};

UserInput.addEventListener("input",()=>{
let quoteChars=document.querySelectorAll('.quot-chars');
   quoteChars=Array.from(quoteChars);
  let usreinputCHars=UserInput.value.split("");
  
  quoteChars.forEach((char,index)=>{
         if (char.innerText==usreinputCHars[index]) {
            char.classList.add('success');
         }else if(usreinputCHars[index]==null){
            if (char.classList.contains('success')) {
                char.classList.remove('success');
            }else{
                char.classList.remove('fail');
            }
         }
         else{
            if (!char.classList.contains('fail')) {
                mistaks+=1;
                char.classList.add('fail');
            }
            document.getElementById('mistakes').innerText=mistaks;

            if (usreinputCHars.length==quoteChars.length) {
                UserInput.disabled=true;
            }
            else if(usreinputCHars.length!=quoteChars.length){
                UserInput.disabled=false;
            }
         }

         let check=quoteChars.every((el)=>{
            return el.classList.contains('success')
        })
         if (check) {
            displayReslut();
         }
  })

})


const displayReslut=()=>{
    document.querySelector('.result').style.display='block';
    resUmeButton.disabled=false;
        clearInterval(interval)
        UserInput.disabled=true;
        StartButton.innerText=`Challange Again`;

        StartButton.style.display='block';
        StopButton.style.display='none';
        StopButton.style.display='block';
        resUmeButton.addEventListener('click',()=>{
            resUmeButton.disabled=true;
        });

    let tiMeTaken=1;
    let tempFun=()=>{
        if (time!=0) {
            tiMeTaken=(60-time)/100;
        }
        wPm.innerText=(UserInput.value.length/5/tiMeTaken).toFixed(2)+"WPM";
       aCCuracy.innerText=Math.round((UserInput.value.length-mistaks) / (UserInput.value.length)*100)+'%';
    }
    tempFun();
}
StartButton.addEventListener('click',()=>{
    StopButton.disabled=false;
    resUmeButton.disabled=true;
    if (StartButton.innerText==`Challange Again`) {
        mistaks=0;
        document.getElementById('mistakes').innerText=mistaks;
        UserInput.value='';
        aCCuracy.innerText="";
        wPm.innerHTML=""
    }
})

window.onload=()=>{
    StartButton.style.display='block';
    resUmeButton.disabled=true;
    StopButton.disabled=true;
    UserInput.disabled=true;
    QuotableApiFun();
};
















