//this is design pattern - module
let mainModalLogicHelper = (() => {
    let doc = document;
    let singletonFlag = false;
    let isModalCreated = false;
    let modalEl = null;
    let textAreaEl = null;
    let translationArrOfObjs = [];
    let anchorsArr = document.getElementsByTagName('a');
    let buttonsArr = document.getElementsByTagName('button');
    let anchorsArrLen =  anchorsArr.length;
    let buttonsArrLen = buttonsArr.length;

    if (!singletonFlag) {
        singletonFlag = true;    
    } else {
        return;
    }

    (function addEventListenersAnchorsButtons() {
        while(anchorsArrLen--) {
            anchorsArr[anchorsArrLen].addEventListener('click', facadeStopPropagation);
        }
    
        while(buttonsArrLen--) {
            buttonsArr[buttonsArrLen].addEventListener('click',facadeStopPropagation)
        }
    })();
    
    function removeEventListenersAnchorsButtons() {
        anchorsArrLen =  anchorsArr.length;
        buttonsArrLen = buttonsArr.length;

        while(anchorsArrLen--) {
            anchorsArr[anchorsArrLen].removeEventListener('click', facadeStopPropagation);
        }
    
        while(buttonsArrLen--) {
            buttonsArr[buttonsArrLen].removeEventListener('click',facadeStopPropagation)
        }
    };
    
    doc.addEventListener('click', handleClick);

    function facadeStopPropagation(e) {
        e.preventDefault();
    }

    function handleClick(e) {
        let target = e.target;
        let isBtnClose = e.target.classList.contains('tr-modal--close-btn');
        let isBtnSave = e.target.classList.contains('tr-modal--save-btn');
        let isBtnDownload = e.target.classList.contains('tr-modal--btn-download');
        let isDestroyBtn = e.target.classList.contains('tr-modal--destroy-btn') || e.target.classList.contains('tr-modal--destroy-btn-holder');

        if (isBtnSave) {
            saveTranslation(e);
        }

        if (isBtnClose) {
            closeModal(e);
        }

        if (isDestroyBtn) {
            e.stopPropagation();
            e.preventDefault();
            destroyModal();
        }

        if (target.innerText && !(isBtnClose || isBtnSave || isBtnDownload || isDestroyBtn)) {
            if (!isModalCreated) {
                createTranslationField(target.innerText);
                isModalCreated = true;
            }
            
            if (!(isBtnClose || isBtnSave || isBtnDownload) && modalEl && modalEl.classList.contains('hidden')) {
                showModal(e);
                addValues(textAreaEl, target.innerText);
            }
        }
    }

    function createTranslationField(text) {
        let modal = doc.createElement('div');
        let buttonsHolder = doc.createElement('div');
        let button = doc.createElement('button');
        let closeBtn = doc.createElement('button');
        let textArea = doc.createElement('textarea');
        let header = doc.createElement('h3');
        let destroyBtnHolder = doc.createElement('div');
        let destroyBtn = doc.createElement('span');

        modal.classList.add('tr-modal');
        header.classList.add('tr-modal--heading');
        textArea.classList.add('tr-modal--textarea');
        buttonsHolder.classList.add('tr-modal--innerField');
        button.classList.add('tr-modal--save-btn');
        closeBtn.classList.add('tr-modal--close-btn');
        destroyBtnHolder.classList.add('tr-modal--destroy-btn-holder');
        destroyBtn.classList.add('tr-modal--destroy-btn');

        header.innerText = 'Translation Helper';
        button.innerText = 'SAVE';
        closeBtn.innerText = 'DOWNLOAD';
        destroyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  fill="rgb(29, 209, 226)" width="12" height="12" viewBox="0 0 24 24">\
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
        <path d="M0 0h24v24H0z" fill="none"/></svg>';

        addValues(textArea, text);
        
        destroyBtnHolder.appendChild(destroyBtn);
        buttonsHolder.appendChild(button);
        buttonsHolder.appendChild(closeBtn);
       
        modal.appendChild(destroyBtnHolder);
        modal.appendChild(header);
        modal.appendChild(textArea);
        modal.appendChild(buttonsHolder);
        
        doc.body.appendChild(modal);
        modalEl  = doc.getElementsByClassName('tr-modal')[0];
        textAreaEl = doc.getElementsByClassName('tr-modal--textarea')[0];
        
        modalEl.addEventListener('mousedown', dragHelper.dragElement);
    }

    function addValues(domEl, stringVal) {
        if (!domEl || !stringVal) {
            return;
        }
        domEl.value = "";
        domEl.dataset.text = stringVal;
    }

    function saveTranslation(e) {
        e.stopPropagation();
        let originalText = textAreaEl.getAttribute('data-text');
        let translatedText = textAreaEl.value.trim();

        if (!translatedText.length) {return;}

        hideModal(e);

        try {
            translationArrOfObjs.push({
                originalText: originalText,
                translatedText: translatedText
            });
        
        } catch(ex) {
            console.log(ex);
        }
    }

    function hideModal(e) {
        e.stopPropagation();
        modalEl.classList.add('hidden');
    }

    function showModal(e) {
        e.stopPropagation();
        modalEl.classList.remove('hidden');       
    }

    function closeModal(e) {
        let language = doc.documentElement.lang ? doc.documentElement.lang.split('-')[0] : 'en';
        let urlSplitted =  window.location.pathname.split('/');
        let pageName = window.location.host.replace('.', '_') + '_' + urlSplitted[urlSplitted.length - 2].replace('-', '_');

        saveTranslation(e);
        translationArrOfObjs.push({'lang': language, 'page': pageName});

        download("hello.txt", JSON.stringify(translationArrOfObjs));

        isModalCreated = true;
    }

    function destroyModal() {
        doc.body.removeChild(modalEl);
        doc.removeEventListener('click', handleClick);
        removeEventListenersAnchorsButtons();
    }

    function download(filename, text) {
        let element = document.createElement('a');

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
        element.classList.add('tr-modal--btn-download')
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        modalEl.appendChild(element);
      
        element.click();
        modalEl.removeChild(element);
        translationArrOfObjs = [];
      }

      return {
        closeModal: destroyModal,
        saveTranslation,
        buildModal: createTranslationField,
        showModal
    }
})();