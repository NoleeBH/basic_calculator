
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Successful SW registration', reg))
      .catch(err => console.warn('Error registering sw', err))
  }
colorBody = fondoColor => document.body.style.backgroundColor = fondoColor;

colorDiv = fondoColor => {
    document.getElementById("calculator").style.backgroundColor = fondoColor
    
    document.getElementById("title").style.color = fondoColor
    
    document.getElementById("equation-html").style.borderColor=fondoColor
    
    document.getElementById("result-html").style.borderColor=fondoColor
}



