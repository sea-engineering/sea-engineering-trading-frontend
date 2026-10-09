import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ADMIN_LOGIN_URL } from '../../config/api';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark z-fixed p-0" data-sticky-navbar='{"offset": 200}'>
      <div className="container d-flex align-items-center py-2" data-bs-theme="dark">

        {/* Mobile toggler */}
        <button
          type="button"
          className="navbar-toggler me-3 d-lg-none"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo */}
        <Link to="/" className="navbar-brand me-4 flex-shrink-0">
          <img src="/assets/icons/logo_corrige.png" alt="SEA INTERNATIONAL TRADING" style={{ height: '70px' }} />
        </Link>

        {/* Nav links — centred on large screens */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">{t('home')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">{t('about')}</NavLink>
            </li>
            {/* Products & Solutions dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('products_solutions')}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/products/industrial-equipment">
                    {t('industrial_equipment')}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/oilfield-equipment">
                    {t('oilfield_equipment')}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/general-commodities">
                    {t('general_commodities')}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/procurement-logistics">
                    {t('procurement_logistics')}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/why-us">{t('why_us')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">{t('contact')}</NavLink>
            </li>
          </ul>
        </div>

        {/* Right side: Language + User — always visible */}
        <div className="d-flex align-items-center gap-1 ms-auto ms-lg-3 flex-shrink-0">
          {/* Language Selection */}
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-secondary border-0 dropdown-toggle text-white fw-medium"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {i18n.language.toUpperCase()}
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm" style={{ minWidth: 'auto' }}>
              {i18n.language === 'en' ? (
                <li><button className="dropdown-item" onClick={() => changeLanguage('fr')}>FR</button></li>
              ) : (
                <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>EN</button></li>
              )}
            </ul>
          </div>

          {/* User Account (Admin Login) */}
          <a
            className="btn btn-icon btn-lg fs-lg btn-outline-secondary border-0 rounded-circle animate-shake text-white"
            href={ADMIN_LOGIN_URL}
            title="Admin Login"
          >
            <i className="ci-user animate-target"></i>
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;
