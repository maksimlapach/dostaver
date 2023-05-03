const privacyFullText = () => {
    const fullTextBtn = document.querySelector('.privacy__mobile_full'),
          text = document.querySelector('.privacy__mobile_text');

    if (fullTextBtn) {
        fullTextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            text.style.display = 'block';
            fullTextBtn.style.display = 'none';
        })
    }
};

export default privacyFullText;