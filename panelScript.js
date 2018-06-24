(()=> {
    const doc = document;
    let toolHolder = doc.createElement('div');
    let listOfOptions = doc.createElement('ul');
    let openModal = doc.createElement('li');
    let downloadFile = doc.createElement('li');
    let closeModal = doc.createElement('li');
    let closeToolBar = doc.createElement('span');

    toolHolder.classList.add('tr-tool-holder');
    listOfOptions.classList.add('tr-tool-options-holder');
    
    closeToolBar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  fill="rgb(29, 209, 226)" width="12" height="12" viewBox="0 0 24 24">\
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
    <path d="M0 0h24v24H0z" fill="none"/></svg>';
    closeToolBar.classList.add('tr-toolbar-close-toolbar');
    toolHolder.appendChild(closeToolBar);

    openModal.innerHTML ='<svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 209, 226)" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"/></svg>';
    openModal.classList.add('tr-open-modal');
    listOfOptions.appendChild(openModal);
    
    downloadFile.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 209, 226)" width="24" height="24" viewBox="0 0 24 24">\
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>\
    <path fill="none" d="M0 0h24v24H0z"/></svg>';
    downloadFile.classList.add('tr-download-file');
    listOfOptions.appendChild(downloadFile);
    
    closeModal.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  fill="rgb(29, 209, 226)" width="24" height="24" viewBox="0 0 24 24">\
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
    <path d="M0 0h24v24H0z" fill="none"/></svg>';
    closeModal.classList.add('tr-close-modal');
    listOfOptions.appendChild(closeModal);

    toolHolder.appendChild(listOfOptions);
    doc.documentElement.appendChild(toolHolder);

    toolHolder.addEventListener('click', function(e) {
        let target = e.target;
        let isOpenBtn = false;
        let isCloseBtn = false;
        let isDestroyBtn = false;
        let isSaveBtn = false;
        let parent = target;

        do {
            if (parent.classList.contains('tr-close-modal')) {
                isCloseBtn = true;
            }

            parent = parent.parentNode;
        } while (parent && !(isOpenBtn  || isCloseBtn || isDestroyBtn || isSaveBtn))
        //mainModalLogicHelper
    }, false);

})();