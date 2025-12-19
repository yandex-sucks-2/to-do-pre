const items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
    const raw = localStorage.getItem("todo-tasks");
    return raw ? JSON.parse(raw) : items;
}

function saveTasks(tasks) {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}

function getTasksFromDOM() {
    return Array.from(
        document.querySelectorAll(".to-do__item-text"),
        (node) => node.textContent
    );
}

function attachItemHandlers(itemElement) {
    const textElement = itemElement.querySelector(".to-do__item-text");
    const deleteButton = itemElement.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = itemElement.querySelector(".to-do__item-button_type_duplicate");
    const editButton = itemElement.querySelector(".to-do__item-button_type_edit");

    deleteButton.addEventListener("click", () => {
        itemElement.remove();
        saveTasks(getTasksFromDOM());
    });

    duplicateButton.addEventListener("click", () => {
        const duplicated = createItem(textElement.textContent);
        listElement.prepend(duplicated);
        saveTasks(getTasksFromDOM());
    });

    editButton.addEventListener("click", () => {
        textElement.contentEditable = "true";
        textElement.focus();
    });

    textElement.addEventListener("blur", () => {
        textElement.contentEditable = "false";
        saveTasks(getTasksFromDOM());
    });
}

function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const itemElement = template.content
        .querySelector(".to-do__item")
        .cloneNode(true);

    const textElement = itemElement.querySelector(".to-do__item-text");
    textElement.textContent = item;

    attachItemHandlers(itemElement);

    return itemElement;
}

const curItems = loadTasks();

curItems.forEach((task) => {
    const itemElement = createItem(task);
    listElement.append(itemElement);
});

formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const taskText = inputElement.value.trim();
    if (!taskText) {
        return;
    }

    const itemElement = createItem(taskText);
    listElement.prepend(itemElement);
    inputElement.value = "";

    saveTasks(getTasksFromDOM());
});
