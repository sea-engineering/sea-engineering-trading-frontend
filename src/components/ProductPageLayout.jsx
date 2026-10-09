import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { API_URL, getStorageUrl } from '../config/api';
import Swiper from 'swiper';
import { Navigation, Controller, EffectFade, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const ProductPageLayout = ({ pageKey, fallbackGlobalTitleEn, fallbackGlobalTitleFr }) => {
  const [data, setData] = useState({
    banners: [],
    announce_global_title_en: fallbackGlobalTitleEn,
    announce_global_title_fr: fallbackGlobalTitleFr,
    announces: [],
    article_global_title_en: '',
    article_global_title_fr: '',
    articles: [],
    card_global_title_en: '',
    card_global_title_fr: '',
    cards: []
  });

  const { i18n } = useTranslation();
  const bannerSwiperRef = useRef(null);
  const announceImageSwiperRef = useRef(null);
  const announceTextSwiperRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/pages/${pageKey}/data`)
      .then(response => {
        setData({
          banners: response.data.banners || [],
          announce_global_title_en: response.data.announce_global_title_en || fallbackGlobalTitleEn,
          announce_global_title_fr: response.data.announce_global_title_fr || fallbackGlobalTitleFr,
          announces: response.data.announces || [],
          article_global_title_en: response.data.article_global_title_en || '',
          article_global_title_fr: response.data.article_global_title_fr || '',
          articles: response.data.articles || [],
          card_global_title_en: response.data.card_global_title_en || '',
          card_global_title_fr: response.data.card_global_title_fr || '',
          cards: response.data.cards || []
        });
      })
      .catch(error => {
        console.error(`Error fetching data for ${pageKey}:`, error);
      });
  }, [pageKey, fallbackGlobalTitleEn, fallbackGlobalTitleFr]);

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

      return () => {
        if (swiper) swiper.destroy(true, true);
      };
    }
  }, [data.banners]);

  // Initialize Announces Dual Swiper
  useEffect(() => {
    if (data.announces.length > 0 && announceImageSwiperRef.current && announceTextSwiperRef.current) {
      const imageSwiper = new Swiper(announceImageSwiperRef.current, {
        modules: [EffectFade, Controller],
        allowTouchMove: false,
        loop: data.announces.length > 1,
        effect: "fade"
      });

      const textSwiper = new Swiper(announceTextSwiperRef.current, {
        modules: [Navigation, Controller],
        spaceBetween: 40,
        loop: data.announces.length > 1,
        speed: 400,
        navigation: {
          prevEl: '#prev-announce',
          nextEl: '#next-announce'
        }
      });

      imageSwiper.controller.control = textSwiper;
      textSwiper.controller.control = imageSwiper;

      return () => {
        if (imageSwiper) imageSwiper.destroy(true, true);
        if (textSwiper) textSwiper.destroy(true, true);
      };
    }
  }, [data.announces]);

  // Initialize Articles Swiper
  useEffect(() => {
    if (data.articles.length > 0) {
      const el = document.getElementById('articles-swiper');
      if (!el) return;
      const swiper = new Swiper(el, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 24,
        loop: data.articles.length > 1,
        speed: 400,
        navigation: {
          prevEl: '.btn-prev-article',
          nextEl: '.btn-next-article'
        },
        breakpoints: {
          500: { slidesPerView: 2 },
          992: { slidesPerView: 3 }
        }
      });
      return () => {
        if (swiper) swiper.destroy(true, true);
      };
    }
  }, [data.articles]);

  return (
    <>
      {/* Banners Section */}
      <section className="position-relative">
        <div className="swiper w-100" ref={bannerSwiperRef} data-bs-theme="dark">
          <div className="swiper-wrapper">
            {data.banners.map((banner) => (
              <div key={banner.id} className="swiper-slide position-relative" style={{ backgroundColor: '#6dafca' }}>
                <img src={getStorageUrl(banner.image_path)} className="w-100 h-auto rtl-flip" alt="Banner" />
                <div className="position-absolute top-0 start-0 d-flex align-items-center w-100 h-100 z-2">
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
              </div>
            ))}
          </div>
          <div className="swiper-pagination pb-sm-2"></div>
        </div>
      </section>


      {/* Articles Section */}
      {data.articles.length > 0 && (
        <section className="bg-body-tertiary py-5">
          <div className="container py-1 py-sm-2 py-md-3 py-lg-4 py-xl-5">
            {(data.article_global_title_en || data.article_global_title_fr) && (
              <h2 className="text-center pb-2 pb-sm-3 pb-lg-4">
                {i18n.language === 'fr' ? data.article_global_title_fr : data.article_global_title_en}
              </h2>
            )}

            {/* Carousel */}
            <div className="position-relative mx-2 mx-sm-0">
              <div className="swiper" id="articles-swiper">
                <div className="swiper-wrapper">
                  {data.articles.map((article) => (
                    <article key={article.id} className="swiper-slide">
                      {article.image_path && (
                        <div className="ratio d-flex hover-effect-scale rounded overflow-hidden" style={{ '--cz-aspect-ratio': 'calc(306 / 416 * 100%)' }}>
                          <img
                            src={getStorageUrl(article.image_path)}
                            className="hover-effect-target object-fit-cover w-100"
                            alt={i18n.language === 'fr' ? article.title_fr : article.title_en}
                          />
                        </div>
                      )}
                      <div className="pt-4">
                        {(article.title_en || article.title_fr) && (
                          <h3 className="h5 mb-2">
                            {i18n.language === 'fr' ? article.title_fr : article.title_en}
                          </h3>
                        )}
                        {(article.description_en || article.description_fr) && (
                          <p className="text-body-secondary fs-sm mb-0">
                            {i18n.language === 'fr' ? article.description_fr : article.description_en}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Prev button */}
              <div className="position-absolute top-50 start-0 z-2 translate-middle hover-effect-target mt-n5">
                <button type="button" className="btn btn-prev-article btn-icon btn-outline-secondary bg-body rounded-circle animate-slide-start" aria-label="Prev">
                  <i className="ci-chevron-left fs-lg animate-target"></i>
                </button>
              </div>

              {/* Next button */}
              <div className="position-absolute top-50 start-100 z-2 translate-middle hover-effect-target mt-n5">
                <button type="button" className="btn btn-next-article btn-icon btn-outline-secondary bg-body rounded-circle animate-slide-end" aria-label="Next">
                  <i className="ci-chevron-right fs-lg animate-target"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Announces Section */}
      <div className="container py-5 my-1 my-sm-2 my-md-3 my-lg-4 my-xl-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="h3 mb-0">
            {i18n.language === 'fr' ? data.announce_global_title_fr : data.announce_global_title_en}
          </h2>
          <div className="d-flex gap-2">
            <button type="button" id="prev-announce" className="btn btn-prev btn-icon btn-outline-secondary rounded-circle animate-slide-start me-1" aria-label="Prev">
              <i className="ci-chevron-left fs-lg animate-target"></i>
            </button>
            <button type="button" id="next-announce" className="btn btn-next btn-icon btn-outline-secondary rounded-circle animate-slide-end" aria-label="Next">
              <i className="ci-chevron-right fs-lg animate-target"></i>
            </button>
          </div>
        </div>
        <div className="row border border-secondary-subtle g-0 overflow-hidden rounded-5">

          {/* Binded images (controlled slider) */}
          <div className="col-12 col-md-5 order-md-2 user-select-none">
            <div className="swiper" ref={announceImageSwiperRef}>
              <div className="swiper-wrapper">
                {data.announces.map((announce) => (
                  <div key={announce.id} className="swiper-slide">
                    {announce.image_path && (
                      <img src={getStorageUrl(announce.image_path)} className="w-100 h-auto" alt="Image" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text slider (WHITE BACKGROUND) */}
          <div className="col-12 col-md-7 bg-white order-md-1 py-5 px-4 px-sm-5">
            <div className="swiper py-sm-2 py-md-3 my-xl-2 my-xxl-3" ref={announceTextSwiperRef}>
              <div className="swiper-wrapper">
                {data.announces.map((announce) => (
                  <div key={announce.id} className="swiper-slide">
                    <h3 className="h3 mb-4 text-dark">{i18n.language === 'fr' ? announce.title_fr : announce.title_en}</h3>
                    <p className="text-body fs-lg lh-lg pb-4">{i18n.language === 'fr' ? announce.description_fr : announce.description_en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPageLayout;
