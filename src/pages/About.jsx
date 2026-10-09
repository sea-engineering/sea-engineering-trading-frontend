import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { API_URL, getStorageUrl } from '../config/api';
import Swiper from 'swiper';
import { Navigation, Controller, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const About = () => {
  const { i18n } = useTranslation();

  const [data, setData] = useState({
    page_adv_title_en: '',
    page_adv_title_fr: '',
    page_advantages: [],
    card_global_title_en: '',
    card_global_title_fr: '',
    cards: [],
  });

  const advImageSwiperRef = useRef(null);
  const advTextSwiperRef  = useRef(null);
  const cardsSwiperRef    = useRef(null);

  // Fetch data
  useEffect(() => {
    axios.get(`${API_URL}/pages/about/data`)
      .then(response => {
        setData({
          page_adv_title_en:    response.data.page_adv_title_en    || '',
          page_adv_title_fr:    response.data.page_adv_title_fr    || '',
          page_advantages:      response.data.page_advantages      || [],
          card_global_title_en: response.data.card_global_title_en || '',
          card_global_title_fr: response.data.card_global_title_fr || '',
          cards:                response.data.cards                || [],
        });
      })
      .catch(error => console.error('Error fetching about data:', error));
  }, []);

  // Advantages Dual Swiper
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
        navigation: { prevEl: '#prev-about-adv', nextEl: '#next-about-adv' }
      });
      imageSwiper.controller.control = textSwiper;
      textSwiper.controller.control  = imageSwiper;
      return () => {
        if (imageSwiper) imageSwiper.destroy(true, true);
        if (textSwiper)  textSwiper.destroy(true, true);
      };
    }
  }, [data.page_advantages]);

  // Cards Swiper
  useEffect(() => {
    if (data.cards.length > 0 && cardsSwiperRef.current) {
      const swiper = new Swiper(cardsSwiperRef.current, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 24,
        loop: data.cards.length > 3,
        centerInsufficientSlides: true,
        navigation: { prevEl: '#prev-about-cards', nextEl: '#next-about-cards' },
        breakpoints: {
          600: { slidesPerView: 2 },
          992: { slidesPerView: 3 }
        }
      });
      return () => { if (swiper) swiper.destroy(true, true); };
    }
  }, [data.cards]);

  return (
    <>
      {/* ── Advantages Section ── */}
      {data.page_advantages.length > 0 && (
        <div className="container py-5 my-1 my-sm-2 my-md-3 my-lg-4 my-xl-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="h3 mb-0">
              {i18n.language === 'fr' ? data.page_adv_title_fr : data.page_adv_title_en}
            </h2>
            <div className="d-flex gap-2">
              <button type="button" id="prev-about-adv" className="btn btn-prev btn-icon btn-outline-secondary rounded-circle animate-slide-start me-1" aria-label="Prev">
                <i className="ci-chevron-left fs-lg animate-target"></i>
              </button>
              <button type="button" id="next-about-adv" className="btn btn-next btn-icon btn-outline-secondary rounded-circle animate-slide-end" aria-label="Next">
                <i className="ci-chevron-right fs-lg animate-target"></i>
              </button>
            </div>
          </div>

          <div className="row g-0 overflow-hidden rounded-5">
            {/* Images */}
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

            {/* Text */}
            <div className="col-12 col-md-7 bg-dark order-md-1 py-5 px-4 px-sm-5" data-bs-theme="dark">
              <div className="swiper py-sm-2 py-md-3 my-xl-2 my-xxl-3" ref={advTextSwiperRef}>
                <div className="swiper-wrapper">
                  {data.page_advantages.map((adv) => (
                    <div key={adv.id} className="swiper-slide">
                      <h3 className="h3 mb-4">{i18n.language === 'fr' ? adv.title_fr : adv.title_en}</h3>
                      <p className="text-body fs-sm lh-lg pb-4" style={{ whiteSpace: 'pre-line' }}>{i18n.language === 'fr' ? adv.description_fr : adv.description_en}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Cards Section ── */}
      {data.cards.length > 0 && (
        <section className="container py-5 mt-2 mb-1 my-sm-3 my-md-4 my-lg-5">
          <div className="d-flex align-items-center justify-content-center pb-4 mb-3 mb-md-4">
            {/* Spacer to keep title centred */}
            <div className="d-none d-md-block flex-shrink-0" style={{ width: '96px' }}></div>

            <h3 className="h1 mb-0 flex-grow-1 text-center">
              {i18n.language === 'fr' ? data.card_global_title_fr : data.card_global_title_en}
            </h3>

            <div className="d-flex gap-2 flex-shrink-0 ms-3 ms-md-0" style={{ minWidth: '96px', justifyContent: 'flex-end' }}>
              <button type="button" id="prev-about-cards" className="btn btn-icon btn-outline-secondary rounded-circle animate-slide-start" aria-label="Prev">
                <i className="ci-chevron-left fs-xl animate-target"></i>
              </button>
              <button type="button" id="next-about-cards" className="btn btn-icon btn-outline-secondary rounded-circle animate-slide-end" aria-label="Next">
                <i className="ci-chevron-right fs-xl animate-target"></i>
              </button>
            </div>
          </div>

          <div className="swiper" ref={cardsSwiperRef}>
            <div className="swiper-wrapper py-2">
              {data.cards.map((card) => (
                <div key={card.id} className="swiper-slide h-auto">
                  <div className="card w-100 h-100 align-items-center text-wrap text-center rounded-4 px-0 px-xl-2 py-4 py-xl-5 border-secondary-subtle">
                    <div className="card-body pb-0 pt-3 pt-xl-0">
                      {card.icon_path && (
                        <div className="mb-3 d-block mx-auto" style={{ width: '40px', height: '40px', overflow: 'hidden' }}>
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
    </>
  );
};

export default About;
