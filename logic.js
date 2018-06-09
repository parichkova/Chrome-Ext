//this is design pattern - module
(() => {
    let doc = document;
    let singletonFlag = false;
    let isModalCreated = false;
    let modal = null;
    let textField = null;

    if (!singletonFlag) {
        singletonFlag = true;    
    } else {
        return;
    }

    doc.addEventListener('click', handleClick);

    function handleClick(e) {
        let target = e.target;

        if (target.innerText) {
            console.log(target.innerText);

            if (!isModalCreated) {
                createTranslationField(target.innerText);
                addEventListeners(); 
                isModalCreated = true;
            }

            if (modal && modal.classList.contains('hidden')) {
                modal.classList.remove('hidden');
                addValues(textField, target.innerText);
            }
        }
    }

    function createTranslationField(text) {
        let field = doc.createElement('div');
        let innerFieldOriginalText = doc.createElement('div');
        let button = doc.createElement('button');
        let closeBtn = doc.createElement('button');

        field.classList.add('tr-modal');
        innerFieldOriginalText.classList.add('tr-modal--innerField');
        button.classList.add('tr-modal--save-btn');
        closeBtn.classList.add('tr-modal--close-btn');

        button.innerText = 'SAVE';
        closeBtn.innerText = 'CANCEL';

        addValues(innerFieldOriginalText, text);
        field.appendChild(innerFieldOriginalText);
        field.appendChild(button);
        field.appendChild(closeBtn);

        doc.body.appendChild(field);
        modal  = doc.getElementsByClassName('tr-modal')[0];
        textField = doc.getElementsByClassName('tr-modal--innerField');
        addEventListeners();
    }

    function addEventListeners() {
        if (!modal) {return;}
        
        let modalSaveBtn = modal.querySelector('.tr-modal--save-btn');
        let modalCloseBtn = modal.querySelector('.tr-modal--close-btn');

        if (modalSaveBtn) {
            modalSaveBtn.addEventListener('click', saveTranslation);
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }
    }

    function addValues(domEl, stringVal) {
        if (!domEl || !stringVal) {
            return;
        }

        domEl.innerText = stringVal;
    }
    function saveTranslation(e) {
        hideModal(e);
        isModalCreated = false;
    }

    function hideModal(e) {
        e.stopPropagation();
        modal.style.display = 'none';
    }

    function closeModal() {
        //destroyModal();
        download("hello.txt","This is the content of my file :)");

        isModalCreated = false;
    }

    function destroyModal() {
        doc.removeChild(modal);
    }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }
      
      // Start file download.
      
})();