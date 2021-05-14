const repfeed_url = "https://icc.ise.bgu.ac.il/RepFeed/repfeed/";
let tweets_array;
let counter = 0;

function more_twwets(start_inx=0){
  for (tweet=start_inx; tweet<start_inx+10; tweet++){
      if(tweet == tweets_array.length-1){
          return 
      }

      if(tweets_array[tweet].includes('[')){
        tweets_array[tweet] = tweets_array[tweet].replace('[', '');
      }

      if(tweets_array[tweet].includes(']')){
        tweets_array[tweet] = tweets_array[tweet].replace(']', '');
      }

      tweets_array[tweet] = tweets_array[tweet].replace('"', '');
      tweets_array[tweet] = tweets_array[tweet].replace('"', '');
      
      // create_feed(tweets_array[tweet]);
      var blockquote = document.createElement("blockquote");
      blockquote.setAttribute("class", "twitter-tweet");
      var a = document.createElement("a");
      a.setAttribute("href", "https://twitter.com/x/status/" + tweets_array[tweet]);
      blockquote.append(a);
      var script = document.createElement("script");
      script.async = true;
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("charset", "utf-8");
      feed = document.getElementById('feed')
      feed.appendChild(blockquote);
      feed.appendChild(script);
  
    }

    start_inx = start_inx+10;
    setTimeout(function(){
      counter = counter +10;
      if(counter < 40){
        more_twwets(start_inx);
      }
    },5000)  
  }

// activated when user reset the slidbar on the repfeed page
// reset the bar and get tweets with score zero
async function update_res() {
    if(document.getElementById('error_message')) {
      document.getElementById('error_message').remove();
    }
    
    counter = 0;
    create_spinner();
    slide = document.getElementById('slide');
    document.getElementById('feed').innerHTML = "";
    this.error_message = "";
    
    slide.value = 0;
    const range = document.getElementById('slide'), rangeV = document.getElementById('rangeV'),
    setValue = ()=>{
      const newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ), newPosition = 10 - (newValue * 0.2);
      rangeV.innerHTML = `<span>${range.value}</span>`;
      rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
    };
    setValue();
  
    // send Get request 
    const response = await fetch(repfeed_url + "reset", { method: 'GET',})
    .then(response => response.text())
    .then((response) => {
    // if the backend returns empty list, set an error message
    if (response.length != 2) {//the lengh is 2 because it is the length of empty arry
      // clean respond
      tweets_array = response.split(",");
      more_twwets();
    } else {
      create_error_message();
    }
    // stop spinner
    document.getElementById('spinner').remove();
  })
    .catch ((error) => {
    console.log(error);
  })
}
  
  //activated when user choose value in the slidbar
  //present to user tweets according to the score the user chose
  async function update_value() {
    if(document.getElementById('error_message')) {
      document.getElementById('error_message').remove();
    }

    counter = 0;
    create_spinner();
    slide = document.getElementById('slide');
    document.getElementById('feed').innerHTML = "";
    this.error_message = "";

      // send Get request 
    const response = await fetch(repfeed_url + slide.value, {method: 'GET',})
      .then(response => response.text())
      .then((response) => {
      // if the backend returns empty list, set an error message
        if (response.length != 2) {//the lengh is 2 because it is the length of empty arry
          //clean respond
          tweets_array = response.split(",");
          more_twwets();
        }  else {
          create_error_message();
        }
        // stop spinner
        document.getElementById('spinner').remove();
      }) 
      .catch ((error) => {
        console.log(error);
      })
  }
  
  // display the spinner
  function create_spinner() {
    container_div = document.createElement('div');
    container_div.setAttribute("id", "spinner");
    container_text = document.createElement('div');
    container_text.setAttribute("class", "text-center");
    container_text.setAttribute("style", "margin-top: 50px");
    spinner = document.createElement('div');
    spinner.setAttribute("class", "spinner-border text-primary");
    spinner.setAttribute("style", "width: 80px; height: 80px");
    spinner.setAttribute("role", "status");
    container_text.append(spinner);
    container_div.append(container_text);
    document.getElementById('page').append(container_div);
  }

  // display error message
  function create_error_message() {
    // console.log("enter error");
    this.error_message = "Sorry! No result for your request";
    container_error = document.createElement('div');
    container_error.setAttribute("id", "error_message");
    text = document.createElement('p');
    text.setAttribute("class", "px-5 py-6 border-b border-lighter");
    text.setAttribute("style", "margin-top: 15px; font-weight:bold; text-align: center;");
    text.setAttribute("id", "error_message_txt");
    text.setAttribute("id", "error_message_txt");
    text.textContent = error_message;
    container_error.append(text);
    document.getElementById('page').append(container_error);
  }

  slide = document.getElementById('slide').addEventListener("click", update_value);
  res_slide_btn = document.getElementById('res_slide').addEventListener("click", update_res)
  const range = document.getElementById('slide'), rangeV = document.getElementById('rangeV'),
  setValue = ()=>{
    const newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
    newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };
  setValue();
  document.addEventListener("DOMContentLoaded", setValue);
  range.addEventListener('input', setValue);