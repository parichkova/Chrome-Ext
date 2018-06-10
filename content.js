let contentHelper = (() =>{
    let port = null;

  //  makeLongLiveConn();
  //  portListenToMsg();
    //showTextArea();

    function showTextArea() {
        let area = document.createElement('div');
        
        area.classList.add('tihomira');
        area.style.position = 'absolute';
        area.style.top = 200 + 'px';
        area.classList.add('success');
        document.body.appendChild(area);
    }

    return {showTextArea: showTextArea};
})();
