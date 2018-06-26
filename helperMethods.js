let mainHelper = (() => {
    console.log('a');
    
    function isSVGElement(el) {
        if (!el) {return;}

        return el instanceof SVGElement;
    }

    return {
        isSVGElement: isSVGElement
    };
})(); 