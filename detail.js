function closeModal() {
    $('#myModal').modal('hide');
}

document.getElementById('openModalBtn').addEventListener('click', function () {
    $('#myModal').modal('show');
});