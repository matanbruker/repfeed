//create and insert repfeed and population buttons
rep_but = document.createElement('button');
pop_but = document.createElement('button');
function insertButton(name) {
  if(document.getElementById('button_population') != null && document.getElementById('button_repfeed') != null){
    return;
}

  button = document.createElement('button');
  var image = document.createElement("img");
  var span = document.createElement('span');
  span.setAttribute("class", "focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3");

  if(name == "Population"){ 
    span.setAttribute("style", "float:left; height: 50px; margin-left: -10px; margin-top: -7px");
    button.setAttribute("id", "button_population");
    button.setAttribute("style", "font-weight:bold ; font-size : 20px; float: right; height: 50px; width 140px; margin-left: -11px; margin-top: -10px");
    image.src = chrome.runtime.getURL("icons/globe.svg");
    image.setAttribute("height", "24px");
    image.setAttribute("width", "24px");
    image.setAttribute("style", "margin-right: 32px; float: right;");
    image.setAttribute("id", "pop");
    button.onmouseover = function(){image.src=chrome.runtime.getURL("icons/globe_blue.svg");}
    button.onmouseout = function(){image.src=chrome.runtime.getURL("icons/globe.svg");}
    button.appendChild(image);
    button.append(name);
    rep_but = button;
  }
  
  if(name == "Repfeed"){
    span.setAttribute("style", "float:left; height: 50px; margin-left: -10px;");
    button.setAttribute("id", "button_repfeed");
    button.setAttribute("style", "font-weight:bold ; font-size : 20px; float: right; height: 50px; width 140px; margin-left: -11px");
    image.src = chrome.runtime.getURL("icons/libra.svg");
    image.setAttribute("height", "24px");
    image.setAttribute("width", "24px");
    image.setAttribute("style", "margin-right: 32px; float: right;");
    image.setAttribute("id", "rep");
    button.onmouseover = function(){image.src=chrome.runtime.getURL("icons/libra_blue.svg");}
    button.onmouseout = function(){image.src=chrome.runtime.getURL("icons/libra.svg");}
    button.appendChild(image);
    button.append(name);
    pop_but = button;
  }

  // change page event
  button.onclick = function() {
    page = document.querySelector('.css-1dbjc4n.r-14lw9ot.r-1gm7m50.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-13qz1uu.r-184en5c');
    page.innerHTML = "";

    // load population page 
   if(name == "Population"){
      iframe = document.createElement("iframe");
      iframe.src = "chrome-extension://"+ chrome.runtime.id+"/population.html";
      iframe.style.width = "100%";
      iframe.style.height = "900px";
      page.appendChild(iframe);
    }

   // load repfeed page
   if(name == "Repfeed"){
      iframe = document.createElement("iframe");
      iframe.src = "chrome-extension://"+ chrome.runtime.id+"/repfeed.html";
      iframe.style.width = "100%";
      iframe.style.height = "900px";
      page.appendChild(iframe);
    }
  }

  // insert the button to sidebar
  var x = document.querySelectorAll('[role="navigation"]:last-of-type')[0]  
  span.appendChild(image); 
  span.appendChild(button);
  x.append(span);
}

// makes the buttons responsive
function responsiveNave(x) {
  if (x.matches) { // If media query matches
    document.getElementById('button_population').style = "font-weight:bold ; font-size : 0px; position: relative; margin-left: -11px; margin-top: -7px";
    document.getElementById('button_repfeed').style = "font-weight:bold ; font-size : 0px; position: relative; margin-left: -11px";
  } else {
    document.getElementById('button_population').style = "font-weight:bold ; font-size : 20px; float: right; position: relative; margin-left: -11px; margin-top: -7px";
    document.getElementById('button_repfeed').style = "font-weight:bold ; font-size : 20px; float: right; position: relative; margin-left: -11px";
  }
}
setTimeout(function(){
  var y = window.matchMedia("(max-width: 1150px)");
  responsiveNave(y) // Call listener function at run time
  y.addListener(responsiveNave) // Attach listener function on state changes
  
},4000);

// create and insert buttons to twitter sidebar
insertButton("Repfeed");
insertButton("Population");