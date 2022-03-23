let tags = [];

const inputTagContainer = document.querySelector("#input-tag");
const tagContainer = document.createElement("DIV");
const inputTag = document.createElement("SPAN");//span se alarga segun el contenido lo que no pasa con un input y es mas dificil



inputTag.ariaRoleDescription = "textbox";
inputTag.contentEditable = "true";
inputTag.classList.add("input");
inputTag.focus();

inputTagContainer.classList.add("input-tag-container");
tagContainer.classList.add("tag-container");

inputTagContainer.appendChild(tagContainer);
tagContainer.appendChild(inputTag);

inputTagContainer.addEventListener("click", e => {
    if (e.target.id == "input-tag" || e.target.classlist.contains("tag-container") ) {
        inputTag.focus();
    }
    
});

inputTag.addEventListener("keydown", e => {
    if(e.key == "Enter" && inputTag.textContent != ""){
        e.preventDefault();
        tags.push(inputTag.textContent);
        let cantidadDeTags = tags.length;
        tags = [...new Set(tags)];
        if(tags.length >= cantidadDeTags){
            inputTag.textContent = "";
            renderTags();
        }
    }
    if(e.key == "Backspace" && inputTag.textContent == "" && tags.length > 0){
        tags.pop();
        renderTags();
    }
});

function renderTags(){
    tagContainer.innerHTML = "";

    const html = tags.map(tag => {
        const tagElement = document.createElement("DIV");
        const tagButton = document.createElement("BUTTON");

        tagElement.classList.add("tag-item");
        tagButton.textContent = "X";
        tagButton.addEventListener("click", e => {
            //eliminar etiqueta
            tags = tags.filter(element => element != tag);
            renderTags();
        });

        tagElement.appendChild(document.createTextNode(tag));
        tagElement.appendChild(tagButton);
        return tagElement;
    });

    html.forEach(element => {
        tagContainer.appendChild(element);
    });

    //no lo vuelve a insertar, sino que actualiza la referencia entendi
    tagContainer.appendChild(inputTag);
    inputTag.focus();
}
