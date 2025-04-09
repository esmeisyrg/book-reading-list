import { createBookCard } from "./BookCard";
import image from "../assets/icons/reading-side.svg";
import { navigate } from "../main";

export let readBooksArr = JSON.parse(localStorage.getItem("readBooks")) || [];

export const historyView = () => `
  <h3 class="text-xl font-semibold pb-1 text-primary">Books you've read 📖✅</h3>
      <p class="text-sm font-medium pb-4 text-primary">These are the books you've marked as read.</p>

      ${readBooksArr.length <= 0 ? `
    <div class="flex h-fit justify-self-center pt-10 align-middle">
    
<p class="text-3xl font-semibold pb-10 text-[#8f8a86]">
  Ooops! No history found. Add books by marking them as read in the 
<a href="/" data-link class="text-blue-600 cursor-pointer underline">"reading"</a>
  section.
</p>
    
    <img class="w-65 h-fit absolute bottom-1 left-0" src="${image}">
    
    </div>
    ` : ''} 

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
    ${renderHistoryBooks()}
  </div>
`;

const renderHistoryBooks = () => {
  const container = document.createElement("div");

  readBooksArr.forEach(book => {
    const card = createBookCard({
      image: book.image,
      text: book.text,
      author: book.author,
    }, {
      showActions: false
    });

    container.appendChild(card);
  });

  return container.innerHTML;


};
