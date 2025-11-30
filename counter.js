const incBtn = document.getElementById('inc-btn');
const number = document.getElementById('number');
let val = 0;

incBtn.addEventListener('click', () => {
    if (val < 100) {
        val++;
        number.textContent = val;
        number.classList.remove('bounce');
        void number.offsetWidth; // reflow for retrigger
        number.classList.add('bounce');
    }
    if(val === 100) {
        incBtn.textContent = 'Max!';
        incBtn.disabled = true;
        incBtn.style.background = '#ffca48';
        incBtn.style.cursor = 'default';
    }
});

