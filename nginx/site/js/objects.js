
document.body.onmouseout = function() {
    document.getElementById('fullpage').classList.add('dimmed');
}

document.body.onmouseover = function() {
    document.getElementById('fullpage').classList.remove('dimmed');
}
