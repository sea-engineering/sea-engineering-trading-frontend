import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer position-relative bg-dark border-top">
      <span className="position-absolute top-0 start-0 w-100 h-100 bg-body d-none d-block-dark"></span>
      <div className="container position-relative z-1 pt-sm-2 pt-md-3 pt-lg-4" data-bs-theme="dark">

        <div className="accordion py-5" id="footerLinks">
          <div className="row">

            {/* Column 1: Logo & Description */}
            <div className="col-md-4 d-sm-flex flex-md-column align-items-center align-items-md-start pb-3 mb-sm-4">
              <Link className="d-inline-block mb-sm-0 mb-md-4 me-4" to="/">
                <img src="/assets/icons/logo_corrige.png" alt="SEA INTERNATIONAL TRADING" style={{ height: '90px' }} />
              </Link>
              <p className="text-body fs-sm text-sm-end text-md-start mb-sm-0 mb-md-3 ms-0 ms-sm-auto ms-md-0 me-4">
                {t('footer_desc')}
              </p>
              <div className="dropdown" style={{ maxWidth: '250px' }}>
                <Link to="/contact" className="btn btn-light w-100">
                  {t('contact')}
                </Link>
              </div>
            </div>

            <div className="col-md-8">
              <div className="row row-cols-1 row-cols-sm-3 gx-3 gx-md-4">

                {/* Column 2: Quick Links */}
                <div className="accordion-item col border-0">
                  <h6 className="accordion-header" id="companyHeading">
                    <span className="text-dark-emphasis d-none d-sm-block">{t('quick_links')}</span>
                    <button type="button" className="accordion-button collapsed py-3 d-sm-none" data-bs-toggle="collapse" data-bs-target="#companyLinks" aria-expanded="false" aria-controls="companyLinks">{t('quick_links')}</button>
                  </h6>
                  <div className="accordion-collapse collapse d-sm-block" id="companyLinks" aria-labelledby="companyHeading" data-bs-parent="#footerLinks">
                    <ul className="nav flex-column gap-2 pt-sm-3 pb-3 mt-n1 mb-1">
                      <li className="d-flex w-100 pt-1">
                        <Link className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" to="/">{t('home')}</Link>
                      </li>
                      <li className="d-flex w-100 pt-1">
                        <Link className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" to="/about">{t('about')}</Link>
                      </li>
                      <li className="d-flex w-100 pt-1">
                        <Link className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" to="/why-us">{t('why_us')}</Link>
                      </li>
                      <li className="d-flex w-100 pt-1">
                        <Link className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" to="/contact">{t('contact')}</Link>
                      </li>
                    </ul>
                  </div>
                  <hr className="d-sm-none my-0" />
                </div>

                {/* Column 3: Products & Solutions */}
                <div className="accordion-item col border-0">
                  <h6 className="accordion-header" id="accountHeading">
                    <span className="text-dark-emphasis d-none d-sm-block">{t('products_solutions')}</span>
                    <button type="button" className="accordion-button collapsed py-3 d-sm-none" data-bs-toggle="collapse" data-bs-target="#accountLinks" aria-expanded="false" aria-controls="accountLinks">{t('products_solutions')}</button>
                  </h6>
                  <div className="accordion-collapse collapse d-sm-block" id="accountLinks" aria-labelledby="accountHeading" data-bs-parent="#footerLinks">
                    <ul className="nav flex-column gap-2 pt-sm-3 pb-3 mt-n1 mb-1">
                      <li className="d-flex w-100 pt-1">
                        <Link className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" to="/products/industrial-equipment">{t('industrial_equipment')}</Link>
                      </li>
                      <li className="d-flex w-100 pt-1">
                        <Link className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" to="/products/oilfield-equipment">{t('oilfield_equipment')}</Link>
                      </li>
                      <li className="d-flex w-100 pt-1">
                        <Link className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" to="/products/general-commodities">{t('general_commodities')}</Link>
                      </li>
                      <li className="d-flex w-100 pt-1">
                        <Link className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" to="/products/procurement-logistics">{t('procurement_logistics')}</Link>
                      </li>
                    </ul>
                  </div>
                  <hr className="d-sm-none my-0" />
                </div>

                {/* Column 4: Contact Info */}
                <div className="accordion-item col border-0">
                  <h6 className="accordion-header" id="customerHeading">
                    <span className="text-dark-emphasis d-none d-sm-block">{t('contact_info')}</span>
                    <button type="button" className="accordion-button collapsed py-3 d-sm-none" data-bs-toggle="collapse" data-bs-target="#customerLinks" aria-expanded="false" aria-controls="customerLinks">{t('contact_info')}</button>
                  </h6>
                  <div className="accordion-collapse collapse d-sm-block" id="customerLinks" aria-labelledby="customerHeading" data-bs-parent="#footerLinks">
                    <ul className="nav flex-column gap-2 pt-sm-3 pb-3 mt-n1 mb-1">
                      <li className="d-flex w-100 pt-1">
                        <span className="nav-link d-inline fw-normal p-0"><i className="ci-map-pin me-2"></i>{t('tunis_tunisia')}</span>
                      </li>
                      <li className="d-flex w-100 pt-1">
                        <a className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" href="tel:+21612345678"><i className="ci-phone me-2"></i>[Phone Number]</a>
                      </li>
                      <li className="d-flex w-100 pt-1">
                        <a className="nav-link animate-underline animate-target d-inline fw-normal text-truncate p-0" href="mailto:info@seainternationaltrading.com"><i className="ci-mail me-2"></i>[Email Address]</a>
                      </li>
                    </ul>
                  </div>
                  <hr className="d-sm-none my-0" />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="d-md-flex align-items-center border-top py-4">
          <p className="text-body fs-xs text-center text-md-start mb-0 me-4 order-md-1">
            &copy; {new Date().getFullYear()} {t('all_rights_reserved')}
          </p>
        </div>
      </div>

      {/* Additional spacing to accommodate the fixed button on mobile */}
      <div className="d-lg-none" style={{ height: '4rem' }}></div>
    </footer>
  );
};

export default Footer;
