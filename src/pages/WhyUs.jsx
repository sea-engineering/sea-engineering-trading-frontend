import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { API_URL, getStorageUrl } from '../config/api';
import Swiper from 'swiper';
import { Navigation, Controller, EffectFade, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const WhyUs = () => {
  const [data, setData] = useState({
    banners: [],
    card_global_title_en: 'Why Choose Us?',
    card_global_title_fr: 'Pourquoi nous choisir ?',
    cards: [],
    page_adv_title_en: '',
    page_adv_title_fr: '',
    page_advantages: [],
    cta_title_en: '',
    cta_title_fr: '',
    cta_description_en: '',
    cta_description_fr: '',
    cta_text_color: '#000000'
  });
  
  const { i18n } = useTranslation();
  const bannerSwiperRef = useRef(null);
  const cardsSwiperRef = useRef(null);
  const advImageSwiperRef = useRef(null);
  const advTextSwiperRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/pages/why-us/data`)
      .then(response => {
        setData(prev => ({
          ...prev,
          banners: response.data.banners || [],
          card_global_title_en: response.data.card_global_title_en || prev.card_global_title_en,
          card_global_title_fr: response.data.card_global_title_fr || prev.card_global_title_fr,
          cards: response.data.cards || [],
          page_adv_title_en: response.data.page_adv_title_en || '',
          page_adv_title_fr: response.data.page_adv_title_fr || '',
          page_advantages: response.data.page_advantages || [],
          cta_title_en: response.data.cta_title_en || '',
          cta_title_fr: response.data.cta_title_fr || '',
          cta_description_en: response.data.cta_description_en || '',
          cta_description_fr: response.data.cta_description_fr || '',
          cta_text_color: response.data.cta_text_color || '#000000'
        }));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Initialize Banner Swiper
  useEffect(() => {
    if (data.banners.length > 0 && bannerSwiperRef.current) {
      const swiper = new Swiper(bannerSwiperRef.current, {
        modules: [EffectFade, Pagination, Autoplay],
        effect: "fade",
        loop: data.banners.length > 1,
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
      return () => { if (swiper) swiper.destroy(true, true); };
    }
  }, [data.banners]);

  // Initialize Cards Swiper
  useEffect(() => {
    if (data.cards.length > 0 && cardsSwiperRef.current) {
      const swiper = new Swiper(cardsSwiperRef.current, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 24,
        loop: data.cards.length > 3,
        centerInsufficientSlides: true,
        navigation: {
          prevEl: '#prev-page-cards',
          nextEl: '#next-page-cards'
        },
        breakpoints: {
          600: { slidesPerView: 2 },
          992: { slidesPerView: 3 }
        }
      });
      return () => { if (swiper) swiper.destroy(true, true); };
    }
  }, [data.cards]);

  // Initialize Advantages Dual Swiper
  useEffect(() => {
    if (data.page_advantages.length > 0 && advImageSwiperRef.current && advTextSwiperRef.current) {
      const imageSwiper = new Swiper(advImageSwiperRef.current, {
        modules: [EffectFade, Controller],
        allowTouchMove: false,
        loop: data.page_advantages.length > 1,
        effect: 'fade'
      });
      const textSwiper = new Swiper(advTextSwiperRef.current, {
        modules: [Navigation, Controller],
        spaceBetween: 40,
        loop: data.page_advantages.length > 1,
        speed: 400,
        navigation: { prevEl: '#prev-whyus-adv', nextEl: '#next-whyus-adv' }
      });
      imageSwiper.controller.control = textSwiper;
      textSwiper.controller.control = imageSwiper;
      return () => {
        if (imageSwiper) imageSwiper.destroy(true, true);
        if (textSwiper) textSwiper.destroy(true, true);
      };
    }
  }, [data.page_advantages]);

  return (
    <>
      {/* Banners Section */}
      <section className="position-relative">
          <div className="swiper position-absolute top-0 start-0 w-100 h-100" ref={bannerSwiperRef} data-bs-theme="dark">
            <div className="swiper-wrapper">
              {data.banners.map((banner) => (
                <div key={banner.id} className="swiper-slide" style={{ backgroundColor: '#6dafca' }}>
                  <div className="position-absolute d-flex align-items-center w-100 h-100 z-2">
                    <div className="container mt-lg-n4">
                      <div className="row justify-content-center text-center">
                        <div className="col-9 col-sm-8 col-md-7 col-lg-8">
                          {((i18n.language === 'fr' && banner.subtitle_fr) || (i18n.language === 'en' && banner.subtitle_en)) && (
                            <p className="fs-sm mb-lg-4" style={{ color: banner.subtitle_color || '#ffffff' }}>
                              {i18n.language === 'fr' ? banner.subtitle_fr : banner.subtitle_en}
                            </p>
                          )}
                          
                          <h2 className="display-4 pb-2 pb-md-3 pb-lg-4" style={{ color: banner.title_color || '#ffffff' }}>
                            {i18n.language === 'fr' ? banner.title_fr : banner.title_en}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img src={getStorageUrl(banner.image_path)} className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rtl-flip" style={{ objectPosition: 'top' }} alt="Banner" />
                </div>
              ))}
            </div>
            <div className="swiper-pagination pb-sm-2"></div>
          </div>
          <div className="d-md-none" style={{ height: '380px' }}></div>
          <div className="d-none d-md-block d-lg-none" style={{ height: '420px' }}></div>
          <div className="d-none d-lg-block d-xl-none" style={{ height: '500px' }}></div>
          <div className="d-none d-xl-block d-xxl-none" style={{ height: '560px' }}></div>
          <div className="d-none d-xxl-block" style={{ height: '624px' }}></div>
      </section>

      {/* Cards Section */}
      {data.cards && data.cards.length > 0 && (
        <section className="container py-5 mt-2 mb-1 my-sm-3 my-md-4 my-lg-5">
          <div className="d-flex align-items-center justify-content-center pb-4 mb-3 mb-md-4">
            {/* Spacer left (same width as buttons on md+) to keep title centered */}
            <div className="d-none d-md-block flex-shrink-0" style={{ width: '96px' }}></div>

            <h3 className="h1 mb-0 flex-grow-1 text-center">
              {i18n.language === 'fr' ? data.card_global_title_fr : data.card_global_title_en}
            </h3>

            <div className="d-flex gap-2 flex-shrink-0 ms-3 ms-md-0" style={{ minWidth: '96px', justifyContent: 'flex-end' }}>
              <button type="button" id="prev-page-cards" className="btn btn-icon btn-outline-secondary rounded-circle animate-slide-start" aria-label="Prev">
                <i className="ci-chevron-left fs-xl animate-target"></i>
              </button>
              <button type="button" id="next-page-cards" className="btn btn-icon btn-outline-secondary rounded-circle animate-slide-end" aria-label="Next">
                <i className="ci-chevron-right fs-xl animate-target"></i>
              </button>
            </div>
          </div>
  
          {/* Slider */}
          <div className="swiper" ref={cardsSwiperRef}>
            <div className="swiper-wrapper py-2">
              {data.cards.map((card) => (
                <div key={card.id} className="swiper-slide h-auto">
                  <div className="card w-100 h-100 align-items-center text-wrap text-center rounded-4 px-0 px-xl-2 py-4 py-xl-5 border-secondary-subtle">
                    <div className="card-body pb-0 pt-3 pt-xl-0">
                      {card.icon_path && (
                        <div className="mb-3 d-block mx-auto align-self-center" style={{ width: '40px', height: '40px', overflow: 'hidden' }}>
                          <img 
                            src={getStorageUrl(card.icon_path)}
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
                    <div className="card-footer w-100 bg-transparent border-0 text-body fs-sm fw-normal pt-0 pb-3 pb-xl-0" style={{ whiteSpace: 'pre-line' }}>
                      {i18n.language === 'fr' ? card.description_fr : card.description_en}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advantages Section — same design as Home */}
      {data.page_advantages.length > 0 && (
        <div className="container py-5 my-1 my-sm-2 my-md-3 my-lg-4 my-xl-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="h3 mb-0">
              {i18n.language === 'fr' ? data.page_adv_title_fr : data.page_adv_title_en}
            </h2>
            <div className="d-flex gap-2">
              <button type="button" id="prev-whyus-adv" className="btn btn-prev btn-icon btn-outline-secondary rounded-circle animate-slide-start me-1" aria-label="Prev">
                <i className="ci-chevron-left fs-lg animate-target"></i>
              </button>
              <button type="button" id="next-whyus-adv" className="btn btn-next btn-icon btn-outline-secondary rounded-circle animate-slide-end" aria-label="Next">
                <i className="ci-chevron-right fs-lg animate-target"></i>
              </button>
            </div>
          </div>
          <div className="row g-0 overflow-hidden rounded-5">
            <div className="col-12 col-md-5 order-md-2 user-select-none">
              <div className="swiper h-100" ref={advImageSwiperRef}>
                <div className="swiper-wrapper h-100">
                  {data.page_advantages.map((adv) => (
                    <div key={adv.id} className="swiper-slide h-100">
                      {adv.image_path && (
                        <img 
                          src={getStorageUrl(adv.image_path)} 
                          className="w-100 h-100 object-fit-cover" 
                          style={{ objectPosition: 'left center' }}
                          alt={i18n.language === 'fr' ? adv.title_fr : adv.title_en} 
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-7 bg-dark order-md-1 py-5 px-4 px-sm-5" data-bs-theme="dark">
              <div className="swiper py-sm-2 py-md-3 my-xl-2 my-xxl-3" ref={advTextSwiperRef}>
                <div className="swiper-wrapper">
                  {data.page_advantages.map((adv) => (
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
      )}

      {/* CTA Section */}
      {(data.cta_title_en || data.cta_title_fr) && (
        <section className="container pt-3 pt-sm-4 pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5">
          <div className="position-relative overflow-hidden rounded-5 p-4 p-sm-5 border border-secondary-subtle" style={{ backgroundColor: '#ffffff' }}>
            <div className="position-relative z-2 text-center py-4 py-md-5 my-md-2 my-lg-5 mx-auto" style={{ maxWidth: '700px' }}>
              <h1 className="pt-xl-4 mb-4" style={{ color: data.cta_text_color }}>
                {i18n.language === 'fr' ? data.cta_title_fr : data.cta_title_en}
              </h1>
              <p className="fs-lg pb-3 pb-sm-4" style={{ color: data.cta_text_color, whiteSpace: 'pre-line' }}>
                {i18n.language === 'fr' ? data.cta_description_fr : data.cta_description_en}
              </p>
              <Link className="btn btn-lg btn-dark rounded-pill mb-xl-4" to="/contact">
                {i18n.language === 'fr' ? 'Envoyer votre demande' : 'Send your request'}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default WhyUs;

