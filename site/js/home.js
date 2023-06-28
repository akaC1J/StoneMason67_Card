
document.body.onmouseout = function() {
    document.getElementById('fullpage').classList.add('dimmed');
    document.getElementById('logo').classList.remove('hidden');
    document.getElementById('logo').classList.add('visible');
}

document.body.onmouseover = function() {
    document.getElementById('fullpage').classList.remove('dimmed');
    document.getElementById('logo').classList.remove('visible');
}
