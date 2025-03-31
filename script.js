 // スクロール時にヘッダーのスタイルを変更
 window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ハンバーガーメニューの動作
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }

      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });

  // スクロールアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.hidden').forEach(el => {
    observer.observe(el);
  });

  // 数字のカウントアップアニメーション
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateNumber(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / duration * 10;
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current > target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 10);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(number => {
    statsObserver.observe(number);
  });

  // スライダー機能
  const slides = document.querySelector('.slides');
  const slideItems = document.querySelectorAll('.slide');
  const sliderDots = document.querySelector('.slider-dots');
  let currentSlide = 0;
  const slideCount = slideItems.length;

  // スライダードットの作成
  slideItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  // 次のスライドへ
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }

  // 前のスライドへ
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  }

  // 特定のスライドへ
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  // スライダーの更新
  function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // 自動スライド
  let slideInterval = setInterval(nextSlide, 5000);

  // スライドコントロール
  document.querySelector('.next').addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, 5000);
  });

  document.querySelector('.prev').addEventListener('click', () => {
    clearInterval(slideInterval);
    prevSlide();
    slideInterval = setInterval(nextSlide, 5000);
  });

  // 問い合わせフォームの送信イベント
  const contactForm = document.querySelector('.contact-form form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    // フォームデータの処理（実際の送信はサーバーサイドで行う）
    alert('お問い合わせありがとうございます。メッセージを送信しました。');
    this.reset();
  });

  // 画像の遅延読み込み
  function lazyLoad() {
    const lazyImages = document.querySelectorAll('[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imgObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        imgObserver.observe(img);
      });
    } else {
      // フォールバック
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // DOMContentLoadedイベントでlazyLoad関数を呼び出す
  document.addEventListener('DOMContentLoaded', lazyLoad);