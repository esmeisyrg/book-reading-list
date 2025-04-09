import { createBookCard } from "./BookCard";

export let readBooksArr = JSON.parse(localStorage.getItem("readBooks")) || [];

export const historyView = () => `
  <h3 class="text-xl font-semibold pb-1 text-primary">Books you've read 📖✅</h3>
      <p class="text-sm font-medium pb-4 text-primary">These are the books you've marked as read.</p>


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
