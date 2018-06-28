let mainHelper = (() => {
    console.log('a');
    
    function isSVGElement(el) {
        if (!el) {return;}

        return el instanceof SVGElement;
    }

    function containsObject(obj, list) {
        let  x = obj;
        for (x in list) {
            if (list.hasOwnProperty(x) && list[x] === obj) {

                return true;
            }
        }
    
        return false;
    }

    return {
        isSVGElement: isSVGElement,
        contains: containsObject
    }
})(); 