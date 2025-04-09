import { actions, HomeReading } from './views/HomeReading';
import './style.css'
import { RecommendationsPage } from './views/Recommendations';
import { historyView } from './views/HistoryView';


const routes ={
  '/': HomeReading,
  '/history': historyView,
  '/recommendations':RecommendationsPage,
  '*': HomeReading,

}

function navigate(path){
  history.pushState({}, "", path);
  router();
}


function router (){
  const path = window.location.pathname;
  const container = document.getElementById("main-container");
  const secondContainer = document.getElementById("second-container");

  const readingButton = document.getElementById("home-book");
  const historyButton = document.getElementById("history-book");
  const favoriteButton = document.getElementById("favorites-book");

  const goToComponent = routes[path] || (() => `<p>Ruta no encontrada</p>`)

  secondContainer.innerHTML = goToComponent();


  const buttons = [readingButton, historyButton, favoriteButton];
  buttons.forEach((button) => button.classList.remove("active"));


  if (path === '/'){
    readingButton.classList.add("active");
    actions();
  } else if (path === "/history"){
    historyButton.classList.add("active");

  } else if (path === "/recommendations"){
    favoriteButton.classList.add("active");
  }


}


document.addEventListener("DOMContentLoaded", () =>{
  document.body.addEventListener("click", (e) => {
    if (e.target.matches('a[data-link]')){
      e.preventDefault();
      const path = (e.target.href.replace(window.location.origin, ''))
      navigate(path);
    }
  })
  router();
})

window.addEventListener('popstate', router);

