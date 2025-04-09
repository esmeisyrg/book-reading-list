import { readBooksArr } from "./HistoryView";
import { createBookCard } from "./BookCard";
import image from "../assets/icons/book.png";

// ------------------ Componente principal ------------------

export const HomeReading = () => {
  const tasksArray = JSON.parse(localStorage.getItem("data")) || [];

  return `
    <h3 class="text-xl font-semibold pb-1 text-primary">Your reading list 📚</h3>
    <p class="text-sm font-medium pb-2 text-primary">Add, delete and mark books as read whenever you want.</p>

  ${tasksArray.length <= 0 ? `
    <div class="flex h-fit justify-self-center pt-10 align-middle">
    
    <p class="text-3xl font-semibold pb-10 text-[#8f8a86]">Ooops! No books found. Add a new one pressing the "Add book" button.</p>
    
    <img class="w-60 h-fit absolute bottom-1 left-0" src="${image}">
    
    </div>
    ` : ''}
    <div class="flex justify-center w-full pb-2">
      <button id="open-modal" class="bg-primary px-6 py-2 text-white rounded-lg hover:bg-amber-950 absolute right-10 bottom-6 cursor-pointer">
        Add book
      </button>
    </div>
    <div id="books-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"></div>
  `;
};

// ------------------ Helpers ------------------

const getEl = (id) => document.getElementById(id);

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const localAdd = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

// ------------------ Render ------------------

const renderAllBooks = (tasksArray, container, onDelete, onCheck) => {
  container.innerHTML = "";
  tasksArray.forEach(task => {
    container.appendChild(
      createBookCard(task, {
        showActions: true,
        onDelete: () => onDelete(task),
        onCheck: () => onCheck(task),
      })
    );
  });
};

// ------------------ Validación ------------------

const validateInputs = (title, author, imageUrl) => {
  const errors = {
    name: getEl("error-name"),
    author: getEl("error-author"),
    url: getEl("error-url"),
  };

  let isValid = true;

  if (!title) {
    errors.name.classList.remove("hidden");
    isValid = false;
  } else {
    errors.name.classList.add("hidden");
  }

  if (!author) {
    errors.author.classList.remove("hidden");
    isValid = false;
  } else {
    errors.author.classList.add("hidden");
  }

  if (imageUrl && !isValidUrl(imageUrl)) {
    errors.url.classList.remove("hidden");
    isValid = false;
  } else {
    errors.url.classList.add("hidden");
  }

  return isValid;
};

const updateFormValidity = () => {
  const title = getEl("modal-input").value.trim();
  const author = getEl("modal-input-author").value.trim();
  const imageUrl = getEl("image-url").value.trim();
  
  const isValid = title && author && (!imageUrl || isValidUrl(imageUrl));
  const addButton = getEl("modal-add");
  
  if (isValid) {
    addButton.removeAttribute("disabled");
    addButton.classList.remove("bg-gray-400", "cursor-pointer");
    addButton.classList.add("bg-primary", "hover:bg-amber-900", "cursor-pointer");
  } else {
    addButton.setAttribute("disabled", "");
    addButton.classList.remove("bg-primary", "hover:bg-amber-900", "cursor-pointer");
    addButton.classList.add("bg-gray-400");
  }

  validateInputs(title, author, imageUrl);
};

// ------------------ Acciones ------------------

export function actions() {
  let tasksArray = JSON.parse(localStorage.getItem("data")) || [];

  const booksGrid = getEl("books-grid");
  const modal = getEl("modal");
  const openModalBtn = getEl("open-modal");
  const closeModalBtn = getEl("close-modal");
  const modalAddBtn = getEl("modal-add");

  const inputTitle = getEl("modal-input");
  const inputAuthor = getEl("modal-input-author");
  const inputImage = getEl("image-url");

  modalAddBtn.setAttribute("disabled", "");
  modalAddBtn.classList.add("bg-gray-400");
  modalAddBtn.classList.remove("bg-primary", "hover:bg-amber-900");

  const resetInputs = () => {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputImage.value = "";
    modalAddBtn.setAttribute("disabled", "");
    modalAddBtn.classList.add("bg-gray-400");
    modalAddBtn.classList.remove("bg-primary", "hover:bg-amber-900");
  };

  const handleDelete = (task) => {
    tasksArray = tasksArray.filter(t => t.id !== task.id);
    localAdd(tasksArray);
    renderAllBooks(tasksArray, booksGrid, handleDelete, handleCheck);
  };

  const handleCheck = (task) => {
    readBooksArr.unshift(task);
    localStorage.setItem("readBooks", JSON.stringify(readBooksArr));
    handleDelete(task);
  };

  const handleAddBook = () => {
    const title = inputTitle.value.trim();
    const author = inputAuthor.value.trim();
    const imageUrl = inputImage.value.trim();

    if (!validateInputs(title, author, imageUrl)) return;

    const newBook = {
      id: tasksArray.length ? tasksArray[0].id + 1 : 1,
      text: title,
      author,
      image: imageUrl || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
    };

    tasksArray.unshift(newBook);
    localAdd(tasksArray);
    renderAllBooks(tasksArray, booksGrid, handleDelete, handleCheck);
    resetInputs();
    modal.close();
  };

  renderAllBooks(tasksArray, booksGrid, handleDelete, handleCheck);

  openModalBtn.addEventListener("click", () => {
    modal.showModal();
    resetInputs();
    inputTitle.focus();
  });

  closeModalBtn.addEventListener("click", () => modal.close());
  modalAddBtn.addEventListener("click", handleAddBook);

  inputTitle.addEventListener("input", updateFormValidity);
  inputAuthor.addEventListener("input", updateFormValidity);
  inputImage.addEventListener("input", updateFormValidity);

  inputTitle.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !modalAddBtn.hasAttribute("disabled")) handleAddBook();
  });
}