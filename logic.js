//this is design pattern - module
var mainModalLogicHelper = (() => {
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
        let isBtnClose = target.classList.contains('tr-modal--close-btn');
        let isBtnSave = target.classList.contains('tr-modal--save-btn');
        let isBtnDownload = target.classList.contains('tr-modal--btn-download');
        let isDestroyBtn = false;
        let isPanelOpenModal = false;
        let isDownloadText = false;
        let isCloseModalPanel = false;
        let parent = target;
        let index = -1;
        let stop = false;
        const arrOfClasses = [
            'tr-tool-options-holder',
            'tr-open-modal',
            'tr-download-file',
            'tr-close-modal',
            'tr-toolbar-close-toolbar',
            'tr-modal--destroy-btn-holder'
        ];

        do {
            if (arrOfClasses.indexOf(parent.classList[0]) > -1) {
                stop = true;
                index = arrOfClasses.indexOf(parent.classList[0]);
            }

            parent = parent.parentNode;
        }
        while (!stop && parent.parentNode)

        switch (index) {
            case 1:
                isPanelOpenModal = true;
                break;
            case 2:
                isDownloadText = true;
                break;
            case 3:
                isCloseModalPanel = true;
                break;
            case 3:
                isDestroyPanel = true;
                break;            
            case 5:
                isDestroyBtn = true;
            case 0:
            case 4:
            default: break;
        }

        if (isBtnSave) {
            saveTranslation(e);
        }

        if (isBtnClose) {
            closeModal(e);
        }

        if (isDestroyBtn) {
            isDestroyBtn = false;
            e.stopPropagation();
            e.preventDefault();
            destroyModal();
        }

        if (target.innerText && !(isBtnClose || isBtnSave || isBtnDownload || isDestroyBtn)) {
            let modal = doc.querySelector('.tr-modal');

            if (!modal) {
                createTranslationField(target.innerText);
                isModalCreated = true;
            }
            
            if (!(isBtnClose || isBtnSave || isBtnDownload) && modalEl && modalEl.classList.contains('hidden')) {
                showModal(e);
                addValues(textAreaEl, "");
            }

            if (target.innerText && !(isBtnClose || isBtnSave || isBtnDownload) && modalEl) {
                textAreaEl.setAttribute('data-text', target.innerText);   
            }

            if (isPanelOpenModal || isCloseModalPanel || isDownloadText) {
                isPanelOpenModal = false;
                isCloseModalPanel = false;
                isDownloadText = false;
                return false;
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
        let dropdownOptions = doc.createElement('select');
        let optionsList = [
            'EN',
            'DE',
            'ES',
            'RU'
        ];
        let lent = optionsList.length;
        
        modal.classList.add('tr-modal');
        header.classList.add('tr-modal--heading');
        textArea.classList.add('tr-modal--textarea');
        buttonsHolder.classList.add('tr-modal--innerField');
        button.classList.add('tr-modal--save-btn');
        closeBtn.classList.add('tr-modal--close-btn');
        destroyBtnHolder.classList.add('tr-modal--destroy-btn-holder');
        destroyBtn.classList.add('tr-modal--destroy-btn');
        dropdownOptions.classList.add('tr-modal--lang-options');
        
        while(lent--) {
            let el = doc.createElement('option');
            
            el.value = optionsList[lent];
            el.text = optionsList[lent];
            dropdownOptions.appendChild(el);
        }

        header.innerText = 'Translation Helper';
        button.innerText = 'SAVE';
        closeBtn.innerText = 'DOWNLOAD';
        destroyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  fill="rgb(29, 209, 226)" width="12" height="12" viewBox="0 0 24 24">\
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
        <path d="M0 0h24v24H0z" fill="none"/></svg>';

        addValues(textArea, text);
        
        destroyBtnHolder.appendChild(destroyBtn);
        buttonsHolder.appendChild(dropdownOptions);

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

        if (!textAreaEl.value.trim()) {
            alert('No translated text entered, try once more.');

            return;
        }

        if (!textAreaEl.getAttribute('data-text')) {
            alert('Yo have not selected text to translate.');

            return;
        }

        hideModal(e);
        let flag = false;
        try {
            for ({'originalText': originalText, 'translatedText': translatedText} in translationArrOfObjs) {
                if (translationArrOfObjs.hasOwnProperty({'originalText': originalText, 'translatedText': translatedText}) 
                && translationArrOfObjs[{'originalText': originalText, 'translatedText': translatedText}] === {'originalText': originalText, 'translatedText': translatedText}) {
    
                    flag = true;
                }
            }

            if (!flag) {
                translationArrOfObjs.push({
                    originalText: originalText,
                    translatedText: translatedText
                });
            }
    } catch(ex) {
            console.log(ex);
        }
        
        flag = false;
    }

    function hideModal(e) {
        e.stopPropagation();
        if (modalEl) {
            modalEl.classList.add('hidden');
        }
    }

    function showModal(e) {
        e.stopPropagation();
        modalEl.classList.remove('hidden');       
    }

    function closeModal(e) {
        if (!modalEl || !textAreaEl.value.trim()) {
            alert('Sorry, no selection to download.');

            return;
        }

        let language = doc.querySelector('.tr-modal--lang-options').value;
        let urlSplitted =  window.location.pathname.split('/');
        let pageName = window.location.host.replace('.', '_') + '_' + urlSplitted[urlSplitted.length - 1].replace('-', '_').replace('.','_');

        saveTranslation(e);
        translationArrOfObjs.push({'lang': language, 'page': pageName});

        download(urlSplitted[urlSplitted.length - 1].replace('-', '_').replace('.','_') + ".txt", JSON.stringify(translationArrOfObjs));

        isModalCreated = true;
    }

    function destroyModal() {
        if (!modalEl) {
            alert('Sorry, no existing modal to close.');

            return;
        }

        let parent = modalEl.parentNode;

        parent.removeChild(modalEl);
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
        downloadFile: closeModal,
        buildModal: createTranslationField,
        destroyModal: hideModal,
        showModal: showModal
    }
})();