import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Contact = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('customers');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    website: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
  const [mapSettings, setMapSettings] = useState({ lat: 48.8566, lng: 2.3522, address: '', country: '' });
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/contact/settings`)
      .then(res => {
        setMapSettings({
          lat: parseFloat(res.data.map_latitude) || 48.8566,
          lng: parseFloat(res.data.map_longitude) || 2.3522,
          address: res.data.map_address || '',
          country: res.data.map_country || ''
        });
        setIsMapLoaded(true);
      })
      .catch(err => {
        console.error(err);
        setIsMapLoaded(true);
      });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({
      first_name: '',
      last_name: '',
      company_name: '',
      contact_person: '',
      email: '',
      phone: '',
      website: '',
      subject: '',
      message: ''
    });
    setStatus(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, {
        ...formData,
        type: activeTab
      });
      setStatus('success');
      setFormData({
        first_name: '', last_name: '', company_name: '', contact_person: '',
        email: '', phone: '', website: '', subject: '', message: ''
      });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <>
      <section className="bg-body-tertiary pb-1 pb-sm-3 pb-md-4 pb-lg-5" style={{ marginTop: '-110px', paddingTop: '110px' }}>
        <div className="container py-5 mb-xxl-3">
          <h1 className="text-center pb-2 pb-sm-3 mt-lg-3 mt-xl-4">{t('contact_title')}</h1>

          <ul className="nav nav-pills justify-content-center pb-2 pb-sm-3 mb-3" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                type="button"
                className={`nav-link ${activeTab === 'customers' ? 'active' : ''}`}
                onClick={() => handleTabChange('customers')}
              >
                <i className="ci-shopping-bag fs-base me-2 ms-n1"></i>
                {t('contact_for_customers')}
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                type="button"
                className={`nav-link ${activeTab === 'retailers' ? 'active' : ''}`}
                onClick={() => handleTabChange('retailers')}
              >
                <i className="ci-box fs-base me-2 ms-n1"></i>
                {t('contact_for_retailers')}
              </button>
            </li>
          </ul>

          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-9 col-xl-8">
              <div className="tab-content bg-body rounded-5 py-3 py-sm-4 px-4 px-sm-5">
                <p className="text-center py-3 mx-auto" style={{ maxWidth: '450px' }}>
                  {t('contact_intro')}
                </p>

                {status === 'success' && (
                  <div className="alert alert-success text-center">{t('contact_success')}</div>
                )}
                {status === 'error' && (
                  <div className="alert alert-danger text-center">{t('contact_error')}</div>
                )}

                {activeTab === 'customers' && (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label htmlFor="fn" className="form-label">{t('contact_first_name')}</label>
                        <input type="text" className="form-control form-control-lg rounded-pill" id="fn" name="first_name" value={formData.first_name} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="ln" className="form-label">{t('contact_last_name')}</label>
                        <input type="text" className="form-control form-control-lg rounded-pill" id="ln" name="last_name" value={formData.last_name} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">{t('contact_email')}</label>
                        <input type="email" className="form-control form-control-lg rounded-pill" id="email" name="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">{t('contact_phone')}</label>
                        <input type="tel" className="form-control form-control-lg rounded-pill" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div className="col-12">
                        <label className="form-label">{t('contact_subject')}</label>
                        <select className="form-select form-select-lg rounded-pill" name="subject" value={formData.subject} onChange={handleChange} required>
                          <option value="">{t('contact_select_subject')}</option>
                          <option value="General inquiry">{t('subject_general_inquiry')}</option>
                          <option value="Order status">{t('subject_order_status')}</option>
                          <option value="Product information">{t('subject_product_info')}</option>
                          <option value="Technical support">{t('subject_technical_support')}</option>
                          <option value="Website feedback">{t('subject_website_feedback')}</option>
                          <option value="Account assistance">{t('subject_account_assistance')}</option>
                          <option value="Security concerns">{t('subject_security')}</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">{t('contact_message')}</label>
                        <textarea className="form-control form-control-lg rounded-6" id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                      </div>
                      <div className="col-12 text-center pt-2 pb-3">
                        <button type="submit" className="btn btn-lg btn-dark rounded-pill" disabled={status === 'loading'}>
                          {status === 'loading' ? t('contact_sending') : t('contact_send')}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {activeTab === 'retailers' && (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label htmlFor="company" className="form-label">{t('contact_company_name')}</label>
                        <input type="text" className="form-control form-control-lg rounded-pill" id="company" name="company_name" value={formData.company_name} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="person" className="form-label">{t('contact_person')}</label>
                        <input type="text" className="form-control form-control-lg rounded-pill" id="person" name="contact_person" value={formData.contact_person} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email-r" className="form-label">{t('contact_email')}</label>
                        <input type="email" className="form-control form-control-lg rounded-pill" id="email-r" name="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone-r" className="form-label">{t('contact_phone')}</label>
                        <input type="tel" className="form-control form-control-lg rounded-pill" id="phone-r" name="phone" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="website" className="form-label">{t('contact_website')}</label>
                        <input type="text" className="form-control form-control-lg rounded-pill" id="website" name="website" value={formData.website} onChange={handleChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">{t('contact_subject')}</label>
                        <select className="form-select form-select-lg rounded-pill" name="subject" value={formData.subject} onChange={handleChange} required>
                          <option value="">{t('contact_select_subject')}</option>
                          <option value="General inquiry">{t('subject_general_inquiry')}</option>
                          <option value="Product information">{t('subject_product_info')}</option>
                          <option value="Technical support">{t('subject_technical_support')}</option>
                          <option value="Affiliation program">{t('subject_affiliation')}</option>
                          <option value="Marketing and promotions">{t('subject_marketing')}</option>
                          <option value="Press and media inquiries">{t('subject_press')}</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label htmlFor="message-r" className="form-label">{t('contact_message')}</label>
                        <textarea className="form-control form-control-lg rounded-6" id="message-r" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                      </div>
                      <div className="col-12 text-center pt-2 pb-3">
                        <button type="submit" className="btn btn-lg btn-dark rounded-pill" disabled={status === 'loading'}>
                          {status === 'loading' ? t('contact_sending') : t('contact_send')}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {isMapLoaded && (
        <section className="container mb-5 pb-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="h3 mb-0 w-100">{t('our_location')}</h2>
          </div>
          <div className="row g-4 align-items-center">
            {(mapSettings.address || mapSettings.country) && (
              <div className="col-lg-4 col-md-5">
                <div className="card border-0 bg-secondary-subtle rounded-5 p-4 p-xl-5 h-100 d-flex flex-column justify-content-center">
                  <h3 className="h4 mb-4">{t('headquarters')}</h3>
                  
                  {mapSettings.address && (
                    <div className="d-flex align-items-start mb-3">
                      <i className="ci-map-pin fs-xl text-primary mt-1 me-3"></i>
                      <div>
                        <span className="fw-semibold text-body-emphasis d-block mb-1">{t('address')}</span>
                        <span className="text-body">{mapSettings.address}</span>
                      </div>
                    </div>
                  )}

                  {mapSettings.country && (
                    <div className="d-flex align-items-start">
                      <i className="ci-globe fs-xl text-primary mt-1 me-3"></i>
                      <div>
                        <span className="fw-semibold text-body-emphasis d-block mb-1">{t('country_region')}</span>
                        <span className="text-body">{mapSettings.country}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className={(mapSettings.address || mapSettings.country) ? "col-lg-8 col-md-7" : "col-12"}>
              <div className="rounded-5 overflow-hidden border border-secondary-subtle shadow-sm" style={{ height: '450px', zIndex: 1 }}>
                <MapContainer 
                  center={[mapSettings.lat, mapSettings.lng]} 
                  zoom={14} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[mapSettings.lat, mapSettings.lng]}>
                    <Popup>
                      SEA International Trading <br />
                      {mapSettings.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Contact;