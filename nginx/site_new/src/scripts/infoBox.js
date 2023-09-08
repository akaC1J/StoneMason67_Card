document.getElementById('infoButton').addEventListener('click', function() {
    var infoBox = document.getElementById('infoBox');
    if (infoBox.style.display === 'none') {
        infoBox.style.display = 'block';
    } else {
        infoBox.style.display = 'none';
    }
});
