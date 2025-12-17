import React, { useState } from 'react';
import { 
  HiPlus, 
  HiPencil, 
  HiTrash, 
  HiEye,
  HiCalendar,
  HiTag,
  HiNewspaper,
  HiPhotograph,
  HiDownload,
  HiUpload
} from 'react-icons/hi';
import Table from '../components/common/Table'; // Fixed path
import Modal from '../components/common/Modal'; // Fixed path
import './ContentManagement.css';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const articles = [
    {
      id: 1,
      title: 'Pregnancy Nutrition Guide - First Trimester',
      category: 'Pregnancy',
      author: 'Dr. Sunita Reddy',
      status: 'published',
      views: 1245,
      published: '2024-01-20',
      featured: true
    },
    {
      id: 2,
      title: 'Baby Sleep Patterns: What to Expect',
      category: 'Baby Care',
      author: 'Dr. Rohan Sharma',
      status: 'published',
      views: 890,
      published: '2024-01-18',
      featured: false
    },
    {
      id: 3,
      title: 'Postpartum Care Essentials',
      category: 'Pregnancy',
      author: 'Dr. Ananya Patel',
      status: 'draft',
      views: 0,
      published: '-',
      featured: false
    }
  ];

  const offers = [
    {
      id: 1,
      code: 'WELCOME25',
      title: 'Welcome Discount',
      type: 'percentage',
      value: '25%',
      usage: '145/1000',
      status: 'active',
      expiry: '2024-02-28'
    },
    {
      id: 2,
      code: 'FREEDEL',
      title: 'Free Delivery',
      type: 'fixed',
      value: '₹50',
      usage: '89/500',
      status: 'active',
      expiry: '2024-01-31'
    },
    {
      id: 3,
      code: 'HEALTH20',
      title: 'Health Checkup Package',
      type: 'percentage',
      value: '20%',
      usage: '0/200',
      status: 'inactive',
      expiry: '2023-12-31'
    }
  ];

  const banners = [
    {
      id: 1,
      title: 'Homepage Hero Banner',
      position: 'Homepage Top',
      status: 'active',
      clicks: 1245,
      image: 'banner-hero.jpg',
      schedule: '24/7'
    },
    {
      id: 2,
      title: 'Pregnancy Care Promotion',
      position: 'Category Page',
      status: 'active',
      clicks: 567,
      image: 'banner-pregnancy.jpg',
      schedule: '9 AM - 9 PM'
    },
    {
      id: 3,
      title: 'New Year Sale',
      position: 'Homepage Middle',
      status: 'scheduled',
      clicks: 0,
      image: 'banner-sale.jpg',
      schedule: '2024-01-25 to 2024-01-31'
    }
  ];

  const columns = {
    articles: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'author', label: 'Author' },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`status-badge status-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
      { key: 'views', label: 'Views' },
      { key: 'published', label: 'Published Date' },
      { 
        key: 'featured', 
        label: 'Featured',
        render: (featured) => (
          <span className={`featured-badge ${featured ? 'yes' : 'no'}`}>
            {featured ? '⭐ Yes' : 'No'}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, article) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewArticle(article)}
              title="View"
            >
              <HiEye />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => editArticle(article)}
              title="Edit"
            >
              <HiPencil />
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => deleteArticle(article)}
              title="Delete"
            >
              <HiTrash />
            </button>
          </div>
        )
      }
    ],
    offers: [
      { key: 'code', label: 'Coupon Code' },
      { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' },
      { key: 'value', label: 'Value' },
      { 
        key: 'usage', 
        label: 'Usage',
        render: (usage) => (
          <div className="usage-bar">
            <div className="usage-label">{usage}</div>
            <div className="usage-progress">
              <div 
                className="progress-fill" 
                style={{ width: `${(parseInt(usage.split('/')[0]) / parseInt(usage.split('/')[1])) * 100}%` }}
              ></div>
            </div>
          </div>
        )
      },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`status-badge status-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
      { key: 'expiry', label: 'Expiry Date' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, offer) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => editOffer(offer)}
              title="Edit"
            >
              <HiPencil />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => toggleOfferStatus(offer)}
              title={offer.status === 'active' ? 'Deactivate' : 'Activate'}
            >
              {offer.status === 'active' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        )
      }
    ],
    banners: [
      { key: 'title', label: 'Banner Title' },
      { key: 'position', label: 'Position' },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`status-badge status-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
      { key: 'clicks', label: 'Clicks' },
      { key: 'image', label: 'Image File' },
      { key: 'schedule', label: 'Schedule' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, banner) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => previewBanner(banner)}
              title="Preview"
            >
              <HiEye />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => editBanner(banner)}
              title="Edit"
            >
              <HiPencil />
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => deleteBanner(banner)}
              title="Delete"
            >
              <HiTrash />
            </button>
          </div>
        )
      }
    ]
  };

  const viewArticle = (article) => {
    setSelectedItem(article);
    setIsEditing(false);
    setShowModal(true);
  };

  const editArticle = (article) => {
    setSelectedItem(article);
    setIsEditing(true);
    setShowModal(true);
  };

  const deleteArticle = (article) => {
    if (window.confirm(`Delete article "${article.title}"?`)) {
      console.log('Delete article:', article.id);
    }
  };

  const editOffer = (offer) => {
    setSelectedItem(offer);
    setIsEditing(true);
    setShowModal(true);
  };

  const toggleOfferStatus = (offer) => {
    const action = offer.status === 'active' ? 'deactivate' : 'activate';
    if (window.confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} offer "${offer.code}"?`)) {
      console.log(`${action} offer:`, offer.id);
    }
  };

  const previewBanner = (banner) => {
    setSelectedItem(banner);
    setIsEditing(false);
    setShowModal(true);
  };

  const editBanner = (banner) => {
    setSelectedItem(banner);
    setIsEditing(true);
    setShowModal(true);
  };

  const deleteBanner = (banner) => {
    if (window.confirm(`Delete banner "${banner.title}"?`)) {
      console.log('Delete banner:', banner.id);
    }
  };

  const createNewItem = () => {
    setSelectedItem(null);
    setIsEditing(true);
    setShowModal(true);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'articles': return articles;
      case 'offers': return offers;
      case 'banners': return banners;
      default: return [];
    }
  };

  return (
    <div className="content-management">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>Content & Offers Management</h1>
            <p>Manage platform content, promotional offers, and marketing banners</p>
          </div>
          <button className="btn btn-primary" onClick={createNewItem}>
            <HiPlus /> Create New {activeTab === 'articles' ? 'Article' : activeTab === 'offers' ? 'Offer' : 'Banner'}
          </button>
        </div>
      </div>

      <div className="content-stats card">
        <h3>Content Overview</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <HiNewspaper />
            <div>
              <div className="stat-value">{articles.length}</div>
              <div className="stat-label">Total Articles</div>
            </div>
          </div>
          <div className="stat-item">
            <HiTag />
            <div>
              <div className="stat-value">{offers.length}</div>
              <div className="stat-label">Active Offers</div>
            </div>
          </div>
          <div className="stat-item">
            <HiPhotograph />
            <div>
              <div className="stat-value">{banners.length}</div>
              <div className="stat-label">Marketing Banners</div>
            </div>
          </div>
          <div className="stat-item">
            <HiCalendar />
            <div>
              <div className="stat-value">124,567</div>
              <div className="stat-label">Total Content Views</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          <HiNewspaper /> Articles ({articles.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          <HiTag /> Offers ({offers.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'banners' ? 'active' : ''}`}
          onClick={() => setActiveTab('banners')}
        >
          <HiPhotograph /> Banners ({banners.length})
        </button>
      </div>

      <div className="management-toolbar">
        <div className="toolbar-left">
          <input 
            type="text" 
            className="form-input" 
            placeholder={`Search ${activeTab}...`}
          />
          <button className="btn btn-outline">
            Filter by Status
          </button>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline">
            <HiDownload /> Export
          </button>
          <button className="btn btn-outline">
            <HiUpload /> Bulk Upload
          </button>
        </div>
      </div>

      <div className="card">
        <Table
          columns={columns[activeTab]}
          data={getCurrentData()}
          emptyMessage={`No ${activeTab} found`}
        />
      </div>

      {activeTab === 'offers' && (
        <div className="offer-analytics card">
          <h3>Offer Performance Analytics</h3>
          <div className="analytics-grid">
            <div className="analytic-item">
              <div className="analytic-value">24.5%</div>
              <div className="analytic-label">Overall Redemption Rate</div>
            </div>
            <div className="analytic-item">
              <div className="analytic-value">₹1,24,567</div>
              <div className="analytic-label">Revenue from Offers</div>
            </div>
            <div className="analytic-item">
              <div className="analytic-value">1,245</div>
              <div className="analytic-label">New Users via Offers</div>
            </div>
            <div className="analytic-item">
              <div className="analytic-value">18.2%</div>
              <div className="analytic-label">Cart Conversion Rate</div>
            </div>
          </div>
        </div>
      )}

      {showModal && selectedItem && (
        <Modal
          title={isEditing ? `Edit ${activeTab.slice(0, -1)}` : `View ${activeTab.slice(0, -1)}`}
          onClose={() => setShowModal(false)}
          size="large"
        >
          <div className="content-modal">
            {activeTab === 'articles' ? (
              isEditing ? (
                <form className="article-form">
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={selectedItem.title}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-input" defaultValue={selectedItem.category}>
                      <option value="Pregnancy">Pregnancy</option>
                      <option value="Baby Care">Baby Care</option>
                      <option value="Health Tips">Health Tips</option>
                      <option value="Doctor Advice">Doctor Advice</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Author</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={selectedItem.author}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Content</label>
                    <textarea 
                      className="form-input" 
                      rows="10"
                      defaultValue="Article content here..."
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <select className="form-input" defaultValue={selectedItem.status}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <input type="checkbox" defaultChecked={selectedItem.featured} /> Featured Article
                      </label>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Article
                    </button>
                  </div>
                </form>
              ) : (
                <div className="article-view">
                  <h3>{selectedItem.title}</h3>
                  <div className="article-meta">
                    <span>Category: {selectedItem.category}</span>
                    <span>Author: {selectedItem.author}</span>
                    <span>Published: {selectedItem.published}</span>
                    <span>Views: {selectedItem.views}</span>
                  </div>
                  <div className="article-content">
                    <p>Full article content would appear here...</p>
                  </div>
                  <div className="article-actions">
                    <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
                      <HiPencil /> Edit Article
                    </button>
                    <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )
            ) : activeTab === 'offers' ? (
              <form className="offer-form">
                <div className="form-group">
                  <label className="form-label">Coupon Code</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue={selectedItem.code}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Offer Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue={selectedItem.title}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Offer Type</label>
                    <select className="form-input" defaultValue={selectedItem.type}>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="free_shipping">Free Shipping</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Value</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={selectedItem.value}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Max Usage</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      defaultValue="1000"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      defaultValue={selectedItem.expiry}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" defaultValue={selectedItem.status}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Offer
                  </button>
                </div>
              </form>
            ) : (
              <div className="banner-form">
                <div className="form-group">
                  <label className="form-label">Banner Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue={selectedItem.title}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Banner Position</label>
                  <select className="form-input" defaultValue={selectedItem.position}>
                    <option value="Homepage Top">Homepage Top</option>
                    <option value="Homepage Middle">Homepage Middle</option>
                    <option value="Category Page">Category Page</option>
                    <option value="Product Page">Product Page</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Banner Image</label>
                  <div className="image-upload">
                    <div className="upload-preview">
                      <HiPhotograph />
                      <p>Current: {selectedItem.image}</p>
                    </div>
                    <button type="button" className="btn btn-outline">
                      <HiUpload /> Upload New Image
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Schedule</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue={selectedItem.schedule}
                    placeholder="e.g., 24/7 or specific date range"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Redirect URL</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    placeholder="https://example.com/offer"
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Banner
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ContentManagement;