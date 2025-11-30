document.querySelectorAll('.account-row').forEach(row => {
  row.addEventListener('click', function() {
    window.location.href = 'counter.html';
  })
});

document.getElementById('useother').addEventListener('click', function() {
  alert('Functie komt binnenkort!');
});
