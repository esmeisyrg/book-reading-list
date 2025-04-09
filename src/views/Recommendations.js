import { createBookCard } from "./BookCard";
import { recommendations } from "../favorites";

export const RecommendationsPage = () => {
  return `       
    <h3 class="text-xl font-semibold pb-3 text-primary">People's favorites 🌟</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      ${renderList()}
    </div>
  `;
};

const renderList = () => {
  const container = document.createElement("div");

  recommendations.forEach((r) => {
    const card = createBookCard({
      image: r.image,
      text: r.book,
      author: r.author,
      pages: r.pages
    }, {
      showActions: false
    });
    container.appendChild(card);
  });

  return container.innerHTML;
};
