const toggleBtn = document.querySelector('.toggle_button');
const overlay = document.querySelector('.mobile-menu-overlay');
const closeBtn = document.querySelector('.mobile-menu-close');

toggleBtn.addEventListener('click', () => {
  overlay.classList.add('active');
  document.body.classList.add('menu-open');
});

closeBtn.addEventListener('click', () => {
  overlay.classList.remove('active');
  document.body.classList.remove('menu-open');
});

document.querySelectorAll('.mobile-nav-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.mobile-nav-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.mobile-nav-item.open').forEach(el => {
      el.classList.remove('open');
    });

    if (!isOpen) item.classList.add('open');
  });
});



/* ============================================
   ADD NEW SLIDES HERE.
   Just add another { title, text, img } object.
   The heading "Advice and Guidance / Membership"
   never changes — only these three fields do.
   ============================================ */

(function(){
    const imageFrame = document.getElementById('agsImageTrack');
    const contentTrack = document.getElementById('agsContentTrack');
    const arrows = document.querySelectorAll('.ags-arrow');

    let current = 0;
    let isAnimating = false;

    function goTo(direction){
        if(isAnimating) return;

        const imgs = Array.from(imageFrame.querySelectorAll('.ags-image-slide'));
        const texts = Array.from(contentTrack.querySelectorAll('.ags-content-slide'));
        const total = imgs.length;

        const next = direction === 'next'
            ? (current + 1) % total
            : (current - 1 + total) % total;

        isAnimating = true;

        // trigger the white flash over the image frame
        imageFrame.classList.remove('ags-flash');
        void imageFrame.offsetWidth; // reflow to restart animation
        imageFrame.classList.add('ags-flash');

        [imgs, texts].forEach(list => {
            const activeEl = list[current];
            const nextEl = list[next];

            activeEl.classList.remove('ags-active');
            activeEl.classList.add('ags-exit');

            nextEl.classList.add('ags-active');
        });

        current = next;

        setTimeout(() => {
            [imgs, texts].forEach(list => {
                list.forEach(el => {
                    if(!el.classList.contains('ags-active')){
                        el.classList.remove('ags-exit');
                    }
                });
            });
            imageFrame.classList.remove('ags-flash');
            isAnimating = false;
        }, 520);
    }

    arrows.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            goTo(btn.getAttribute('data-direction'));
        });
    });
})();
