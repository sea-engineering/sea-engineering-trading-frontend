import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import { Navigation, Controller, EffectFade, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [cardsData, setCardsData] = useState({ global_title_en: 'Open positions', global_title_fr: 'Postes ouverts', cards: [] });
  const [advantagesData, setAdvantagesData] = useState({ global_title_en: 'Charitable contributions', global_title_fr: 'Contributions caritatives', advantages: [] });
  const [ctaData, setCtaData] = useState({
    title_en: 'Thank you for your order!',
    title_fr: 'Merci pour votre commande!',
    description_en: 'Your order accepted and will be processed shortly.',
    description_fr: 'Votre commande est acceptée et sera traitée sous peu.',
    text_color: '#000000'
  });
  const { t, i18n } = useTranslation();
  const bannerSwiperRef = useRef(null);
  const cardsSwiperRef = useRef(null);
  const advImageSwiperRef = useRef(null);
  const advTextSwiperRef = useRef(null);

  useEffect(() => {
    if (banners.length > 0 && bannerSwiperRef.current) {
      const swiper = new Swiper(bannerSwiperRef.current, {
        modules: [EffectFade, Pagination, Autoplay],
        effect: "fade",
        loop: banners.length > 1,
        speed: 400,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          delay: 5500,
          disableOnInteraction: false
        }
      });

      return () => {
        if (swiper) swiper.destroy(true, true);
      };
    }
  }, [banners]);

  useEffect(() => {
    if (cardsData.cards.length > 0 && cardsSwiperRef.current) {
      const swiper = new Swiper(cardsSwiperRef.current, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 24,
        loop: cardsData.cards.length > 4,
        navigation: {
          prevEl: '#prev-positions',
          nextEl: '#next-positions'
        },
        breakpoints: {
          500: { slidesPerView: 2 },
          800: { slidesPerView: 3 },
          1080: { slidesPerView: 4 }
        }
      });

      return () => {
        if (swiper) swiper.destroy(true, true);
      };
    }
  }, [cardsData.cards]);

  useEffect(() => {
    // Fetch active banners from Laravel API
    axios.get(`${import.meta.env.VITE_API_URL}/banners`)
      .then(response => {
        setBanners(response.data);
      })
      .catch(error => {
        console.error("Error fetching banners:", error);
      });

    // Fetch active cards and global titles from Laravel API
    axios.get(`${import.meta.env.VITE_API_URL}/cards`)
      .then(response => {
        setCardsData({
          global_title_en: response.data.global_title_en || 'Open positions',
          global_title_fr: response.data.global_title_fr || 'Postes ouverts',
          cards: response.data.cards || []
        });
      })
      .catch(error => {
        console.error("Error fetching cards:", error);
      });

    // Fetch active advantages and global titles from Laravel API
    axios.get(`${import.meta.env.VITE_API_URL}/advantages`)
      .then(response => {
        setAdvantagesData({
          global_title_en: response.data.global_title_en || 'Charitable contributions',
          global_title_fr: response.data.global_title_fr || 'Contributions caritatives',
          advantages: response.data.advantages || []
        });
      })
      .catch(error => {
        console.error("Error fetching advantages:", error);
      });

    // Fetch CTA data from Laravel API
    axios.get(`${import.meta.env.VITE_API_URL}/cta`)
      .then(response => {
        setCtaData(response.data);
      })
      .catch(error => {
        console.error("Error fetching CTA data:", error);
      });
  }, []);

  useEffect(() => {
    if (advantagesData.advantages.length > 0 && advImageSwiperRef.current && advTextSwiperRef.current) {
      const imageSwiper = new Swiper(advImageSwiperRef.current, {
        modules: [EffectFade, Controller],
        allowTouchMove: false,
        loop: advantagesData.advantages.length > 1,
        effect: "fade"
      });

      const textSwiper = new Swiper(advTextSwiperRef.current, {
        modules: [Navigation, Controller],
        spaceBetween: 40,
        loop: advantagesData.advantages.length > 1,
        speed: 400,
        navigation: {
          prevEl: '#prev-post',
          nextEl: '#next-post'
        }
      });

      imageSwiper.controller.control = textSwiper;
      textSwiper.controller.control = imageSwiper;

      return () => {
        if (imageSwiper) imageSwiper.destroy(true, true);
        if (textSwiper) textSwiper.destroy(true, true);
      };
    }
  }, [advantagesData.advantages]);

  return (
    <>
      <section className="position-relative">
          <div className="swiper position-absolute top-0 start-0 w-100 h-100" ref={bannerSwiperRef} data-bs-theme="dark">
            <div className="swiper-wrapper">

              {banners.map((banner) => (
                <div key={banner.id} className="swiper-slide" style={{ backgroundColor: '#6dafca' }}>
                  <div className="position-absolute d-flex align-items-center w-100 h-100 z-2">
                    <div className="container mt-lg-n4">
                      <div className="row">
                        <div className="col-9 col-sm-8 col-md-7 col-lg-6">
                          {((i18n.language === 'fr' && banner.subtitle_fr) || (i18n.language === 'en' && banner.subtitle_en)) && (
                            <p className="fs-sm text-white mb-lg-4">
                              {i18n.language === 'fr' ? banner.subtitle_fr : banner.subtitle_en}
                            </p>
                          )}
                          
                          <h2 className="display-4 pb-2 pb-md-3 pb-lg-4">
                            {i18n.language === 'fr' ? banner.title_fr : banner.title_en}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img src={`http://localhost:8000/storage/${banner.image_path}`} className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rtl-flip" alt="Banner" />
                </div>
              ))}

            </div>

            {/* Slider pagination (Bullets) */}
            <div className="swiper-pagination pb-sm-2"></div>
          </div>
          <div className="d-md-none" style={{ height: '380px' }}></div>
          <div className="d-none d-md-block d-lg-none" style={{ height: '420px' }}></div>
          <div className="d-none d-lg-block d-xl-none" style={{ height: '500px' }}></div>
          <div className="d-none d-xl-block d-xxl-none" style={{ height: '560px' }}></div>
          <div className="d-none d-xxl-block" style={{ height: '624px' }}></div>
      </section>

      <section className="container py-5 mt-2 mb-1 my-sm-3 my-md-4 my-lg-5">
        <div className="d-flex align-items-end justify-content-between pb-3 mb-1 mb-md-3">
          <div className="me-4">
            <h3 className="h1 mb-0">
              {i18n.language === 'fr' ? cardsData.global_title_fr : cardsData.global_title_en}
            </h3>
          </div>

          {/* External slider prev/next buttons */}
          <div className="d-flex justify-content-center justify-content-md-start gap-2">
            <button type="button" id="prev-positions" className="btn btn-icon btn-outline-secondary rounded-circle animate-slide-start me-1" aria-label="Prev">
              <i className="ci-chevron-left fs-xl animate-target"></i>
            </button>
            <button type="button" id="next-positions" className="btn btn-icon btn-outline-secondary rounded-circle animate-slide-end" aria-label="Next">
              <i className="ci-chevron-right fs-xl animate-target"></i>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="swiper" ref={cardsSwiperRef}>
          <div className="swiper-wrapper py-2">

            {cardsData.cards.map((card) => (
              <div key={card.id} className="swiper-slide h-auto">
                <div className="card w-100 h-100 align-items-start text-wrap text-start rounded-4 px-0 px-xl-2 py-4 py-xl-5 border-secondary-subtle">
                  <div className="card-body pb-0 pt-3 pt-xl-0">
                    {card.icon_path && (
                      <div 
                        className="mb-3 d-block mx-auto" 
                        style={{ width: '40px', height: '40px', overflow: 'hidden' }}
                      >
                        <img 
                          src={`http://localhost:8000/storage/${card.icon_path}`} 
                          alt="Icon" 
                          style={{ 
                            height: '100%', 
                            width: '100%', 
                            objectFit: 'contain', 
                            filter: `drop-shadow(40px 0 0 ${card.icon_color || '#000'})`,
                            transform: 'translateX(-40px)'
                          }} 
                        />
                      </div>
                    )}
                    <h4 className="h5 py-2 my-1 my-xl-2">
                      {i18n.language === 'fr' ? card.title_fr : card.title_en}
                    </h4>
                  </div>
                  <div className="card-footer w-100 bg-transparent border-0 text-body fs-sm fw-normal pt-0 pb-3 pb-xl-0">
                    {i18n.language === 'fr' ? card.description_fr : card.description_en}
                    
                    {card.url && (
                      <div className="mt-4 text-center text-sm-start">
                        <Link to={card.url} className="btn btn-primary w-100 w-sm-auto">
                          {t('explore')}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      <div className="container py-5 my-1 my-sm-2 my-md-3 my-lg-4 my-xl-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="h3 mb-0">
            {i18n.language === 'fr' ? advantagesData.global_title_fr : advantagesData.global_title_en}
          </h2>
          <div className="d-flex gap-2">
            <button type="button" id="prev-post" className="btn btn-prev btn-icon btn-outline-secondary rounded-circle animate-slide-start me-1" aria-label="Prev">
              <i className="ci-chevron-left fs-lg animate-target"></i>
            </button>
            <button type="button" id="next-post" className="btn btn-next btn-icon btn-outline-secondary rounded-circle animate-slide-end" aria-label="Next">
              <i className="ci-chevron-right fs-lg animate-target"></i>
            </button>
          </div>
        </div>
        <div className="row g-0 overflow-hidden rounded-5">

          {/* Binded images (controlled slider) */}
          <div className="col-12 col-md-5 order-md-2 user-select-none">
            <div className="swiper h-100" ref={advImageSwiperRef}>
              <div className="swiper-wrapper h-100">
                {advantagesData.advantages.map((adv) => (
                  <div key={adv.id} className="swiper-slide h-100">
                    {adv.image_path && (
                      <img 
                        src={`http://localhost:8000/storage/${adv.image_path}`} 
                        className="w-100 h-100 object-fit-cover" 
                        style={{ objectPosition: 'left center' }}
                        alt="Image" 
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text slider */}
          <div className="col-12 col-md-7 bg-dark order-md-1 py-5 px-4 px-sm-5" data-bs-theme="dark">
            <div className="swiper py-sm-2 py-md-3 my-xl-2 my-xxl-3" ref={advTextSwiperRef}>
              <div className="swiper-wrapper">
                {advantagesData.advantages.map((adv) => (
                  <div key={adv.id} className="swiper-slide">
                    <h3 className="h3 mb-4">{i18n.language === 'fr' ? adv.title_fr : adv.title_en}</h3>
                    <p className="text-body fs-lg lh-lg pb-4" style={{ whiteSpace: 'pre-line' }}>{i18n.language === 'fr' ? adv.description_fr : adv.description_en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="container pt-3 pt-sm-4 pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5">
        <div className="position-relative overflow-hidden rounded-5 p-4 p-sm-5 border border-secondary-subtle" style={{ backgroundColor: '#ffffff' }}>
          <div className="position-relative z-2 text-center py-4 py-md-5 my-md-2 my-lg-5 mx-auto" style={{ maxWidth: '700px' }}>
            <h1 className="pt-xl-4 mb-4" style={{ color: ctaData.text_color }}>
              {i18n.language === 'fr' ? ctaData.title_fr : ctaData.title_en}
            </h1>
            <p className="fs-lg pb-3 pb-sm-4" style={{ color: ctaData.text_color }}>
              {i18n.language === 'fr' ? ctaData.description_fr : ctaData.description_en}
            </p>
            <a className="btn btn-lg btn-dark rounded-pill mb-xl-4" href="/contact">
              {i18n.language === 'fr' ? 'Envoyer votre demande' : 'Send your request'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
