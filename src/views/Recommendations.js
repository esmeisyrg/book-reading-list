import { createBookCard } from "./BookCard";
import { recommendations } from "../favorites";

export const RecommendationsPage = () => {
  return `       
    <h3 class="text-xl font-semibold pb-1 text-primary">People's favorites 🌟</h3>
<p class="text-sm font-medium pb-4 text-primary">A quick look at what people are loving lately.</p>
    
    <div class="gap-2 overflow-y-auto h-[60vh]">
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      ${renderList()}
    </div>
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
