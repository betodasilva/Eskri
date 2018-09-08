document.addEventListener('DOMContentLoaded', initApp);

function initApp(){
    var share = new Sharer;
    share.setUrls();
}

function Sharer(){
    this.elements = document.querySelectorAll('.share__item');
}

Sharer.prototype.setUrls = function(){
    Array.from( this.elements ).forEach(function(e){
        var href = e.getAttribute('href');
        e.setAttribute('href', href + window.location.href);
    });
}