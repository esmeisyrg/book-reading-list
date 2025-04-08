import { recommendations } from "../favorites"

export const RecommendationsPage = () => 
    recommendations.map((r =>
        
        `
          <div class="flex gap-2 w-full pt-4">
          <div>
            <img class="w-20 h-fit" src="${r.image}"></img>
          </div>

            <div>              
                <h2 class="font-bold text-primary">${r.book}</h2>
                <p class="font-normal">${r.author}</p>
            <p>${r.pages}</p>

          
          </div>

        </div>`


    )).join("");
