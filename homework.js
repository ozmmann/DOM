/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */
function _onMouseClick(e) {
    openPopupFromLink(e.target);
    
    popupWindow = document.createElement ("div");
    popupWindow.style.backgroundColor = "lightblue";
    popupWindow.style.border = "solid black 1px";
    popupWindow.style.position = "absolute";
    popupWindow.style.width = "150px";
    popupWindow.style.height = "25px";
    popupWindow.style.top = "100px";
    popupWindow.style.left = "100px";
    popupWindow.innerHTML = "Click outside to close.";

    document.body.appendChild (popupWindow);
    window.addEventListener ('click', RemovePopup, true);
    popupIsShown = true;

    // to avoid that the current click event propagates up
    event.stopPropagation ();

}
        function RemovePopup (event) {
            if (popupIsShown) {
                var relation = popupWindow.compareDocumentPosition (event.target);
                var clickInPopup = (event.target == popupWindow) || (relation & Node.DOCUMENT_POSITION_CONTAINED_BY);
                if (!clickInPopup) {
                    document.body.removeChild (popupWindow);
                    window.removeEventListener ('click', RemovePopup, true);
                    popupIsShown = false;
                }
            } 
        }
/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */
function openPopupFromLink(link) {
    var newDiv, title, message, onOk;
    title = link.dataset.title; 
    message = link.dataset.message.replace("'%s'",link.href);
    newDiv = createPopup(title,message,onOk);
    document.body.appendChild(newDiv);
}

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @param {Function} onOk Обработчик клика по кнопке 'Да'
 * @returns {HTMLElement}
 */
function createPopup(title, message, onOk) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute('class', 'popup');
    newDiv.innerHTML = '<div class="b-popup-content">'+
                            '<h3>'+title+'</h3>'+
                            '<p>'+message+'</p>'+
                            '<input type="button" value="Yes"><br><input type="button" value="No">'+
                            '</div>';
    return newDiv;
}
