var dragHelper = (() => {
    const doc = document;
    let modalEl = null;

    function dragElement(e) {
        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;
        
        modalEl = e.target;

        dragMouseDown(e);
    
        function dragMouseDown(e) {
            e = e || window.event;
            pos3 = e.clientX;
            pos4 = e.clientY;
            doc.onmouseup = closeDragElement;
            doc.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
            e = e || window.event;
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            modalEl.style.top = (modalEl.offsetTop - pos2) + "px";
            modalEl.style.left = (modalEl.offsetLeft - pos1) + "px";
            modalEl.style.cursor = '-webkit-grabbing';
        }
    
        function closeDragElement() {
            modalEl.style.cursor = '-webkit-grabb';
            doc.onmouseup = null;
            doc.onmousemove = null;
        }
    }

    return {dragElement: dragElement}
})();