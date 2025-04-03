import { actions, HomeReading } from './HomeReading';
import './style.css'

const loading = document.getElementById('loading');


window.addEventListener('DOMContentLoaded', () =>{
  loading.classList.add("pointer-events-none");
  setTimeout(() => {
    loading.classList.add("opacity-0");
    setTimeout(() => {
      loading.classList.add('none');
    }, 500);
  }, 1000)
});


// improvised router 

const History = () => `<p>Bitches</p>`;
const Recommendations = () => ``;


const routes ={
  '/': HomeReading,
  '/history': History,
  '/recommendations': Recommendations,
  '*': HomeReading,

}

function router (){
  const path = window.location.pathname;
  const container = document.getElementById("main-container");
  const secondContainer = document.getElementById("second-container");

  const goToComponent = routes[path] || (() => `<p>Ruta no encontrada</p>`)

  secondContainer.innerHTML = goToComponent();

  if (path === '/'){
    actions();

  }

}

// Events

document.addEventListener("DOMContentLoaded", () =>{
  document.body.addEventListener("click", (e) => {
    if (e.target.matches('a[data-link]')){
      e.preventDefault();
      navigate(e.target.href.replace(window.location.origin, ''))
    }
  })
  router();
})

window.addEventListener('popstate', router);