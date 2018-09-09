document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    var share = new Sharer;
    share.setUrls();

    var toc = document.querySelector('#toc');
    toc.querySelector('#toc__toggler').addEventListener('click', function (event) {
        event.preventDefault();
        toc.querySelector('ul').classList.toggle('open');

    });

    toc.querySelectorAll('ul a').forEach(function(e){
        e.addEventListener('click', function(d){
            var targetID = d.target.getAttribute('href').split('#').reverse()[0];
            smoothScroll( targetID );
        });
    });

}

function Sharer() {
    this.elements = document.querySelectorAll('.share__item');
}

Sharer.prototype.setUrls = function () {
    Array.from(this.elements).forEach(function (e) {
        var href = e.getAttribute('href');
        e.setAttribute('href', href + window.location.href);
    });
}



function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 50) speed = 50;
    var step = Math.round(distance / 8);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}