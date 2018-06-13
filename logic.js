//this is design pattern - module
(() => {
    let doc = document;
    let singletonFlag = false;
    let isModalCreated = false;
    let modalEl = null;
    let textAreaEl = null;
    let translationArrOfObjs = [];

    if (!singletonFlag) {
        singletonFlag = true;    
    } else {
        return;
    }

    doc.addEventListener('click', handleClick);

    function handleClick(e) {
        let target = e.target;
        let isBtnClose = e.target.classList.contains('tr-modal--close-btn');
        let isBtnSave = e.target.classList.contains('tr-modal--save-btn');
        let isBtnDownload = e.target.classList.contains('tr-modal--btn-download');

        if (isBtnSave) {
            saveTranslation(e);
        }

        if (isBtnClose) {
            closeModal(e);
        }

        if (target.innerText && !(isBtnClose || isBtnSave || isBtnDownload)) {
            if (!isModalCreated) {
                createTranslationField(target.innerText);
                isModalCreated = true;
            }
            
            if (!(isBtnClose || isBtnSave || isBtnDownload) && modalEl && modalEl.classList.contains('hidden')) {
                modalEl.classList.remove('hidden');
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

        modal.classList.add('tr-modal');
        header.classList.add('tr-modal--heading');
        textArea.classList.add('tr-modal--textarea');
        buttonsHolder.classList.add('tr-modal--innerField');
        button.classList.add('tr-modal--save-btn');
        closeBtn.classList.add('tr-modal--close-btn');
        
        header.innerText = 'Translation Helper';
        button.innerText = 'SAVE';
        closeBtn.innerText = 'DOWNLOAD';
        addValues(textArea, text);

        buttonsHolder.appendChild(button);
        buttonsHolder.appendChild(closeBtn);
       
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

    function closeModal(e) {
        //destroyModal();
        e.stopPropagation();
        saveTranslation(e);
        download("hello.php", JSON.stringify(translationArrOfObjs));

        isModalCreated = true;
    }

    function destroyModal() {
        doc.removeChild(modalEl);
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
})();