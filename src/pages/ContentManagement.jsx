import React, { useState, useEffect } from 'react';
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
  HiUpload,
  HiCheckCircle,
  HiXCircle,
  HiExclamationCircle,
  HiX,
  HiOutlineSearch,
  HiFilter,
  HiClock,
  HiArchive
} from 'react-icons/hi';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import './ContentManagement.css';

// Mock API service
const ContentAPI = {
  getArticles: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Pregnancy Nutrition Guide - First Trimester',
            category: 'Pregnancy',
            author: 'Dr. Sunita Reddy',
            status: 'published',
            views: 1245,
            published: '2024-01-20',
            featured: true,
            content: 'A comprehensive guide to nutrition during the first trimester of pregnancy. Learn about essential nutrients, foods to avoid, and healthy eating habits for you and your baby.',
            tags: ['nutrition', 'trimester', 'health', 'pregnancy'],
            readTime: '5 min'
          },
          {
            id: 2,
            title: 'Baby Sleep Patterns: What to Expect',
            category: 'Baby Care',
            author: 'Dr. Rohan Sharma',
            status: 'published',
            views: 890,
            published: '2024-01-18',
            featured: false,
            content: 'Understanding your baby\'s sleep patterns can help establish healthy sleep habits. Learn about sleep cycles, nap schedules, and tips for better sleep.',
            tags: ['sleep', 'baby', 'patterns', 'care'],
            readTime: '4 min'
          },
          {
            id: 3,
            title: 'Postpartum Care Essentials',
            category: 'Pregnancy',
            author: 'Dr. Ananya Patel',
            status: 'draft',
            views: 0,
            published: '-',
            featured: false,
            content: 'Essential care tips for mothers during the postpartum period. Physical recovery, emotional well-being, and self-care strategies.',
            tags: ['postpartum', 'care', 'health', 'recovery'],
            readTime: '6 min'
          },
          {
            id: 4,
            title: 'Breastfeeding Tips for New Mothers',
            category: 'Baby Care',
            author: 'Dr. Priya Singh',
            status: 'published',
            views: 567,
            published: '2024-01-15',
            featured: true,
            content: 'A practical guide to breastfeeding for new mothers. Learn about positioning, latching, common challenges, and maintaining milk supply.',
            tags: ['breastfeeding', 'newborn', 'mother', 'health'],
            readTime: '7 min'
          }
        ]);
      }, 500);
    });
  },

  getOffers: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            code: 'WELCOME25',
            title: 'Welcome Discount',
            type: 'percentage',
            value: '25%',
            usage: '145/1000',
            currentUsage: 145,
            maxUsage: 1000,
            status: 'active',
            expiry: '2024-02-28',
            description: 'Welcome discount for new users',
            minPurchase: 500,
            created: '2024-01-01'
          },
          {
            id: 2,
            code: 'FREEDEL',
            title: 'Free Delivery',
            type: 'fixed',
            value: '₹50',
            usage: '89/500',
            currentUsage: 89,
            maxUsage: 500,
            status: 'active',
            expiry: '2024-01-31',
            description: 'Free delivery on all orders',
            minPurchase: 1000,
            created: '2024-01-05'
          },
          {
            id: 3,
            code: 'HEALTH20',
            title: 'Health Checkup Package',
            type: 'percentage',
            value: '20%',
            usage: '0/200',
            currentUsage: 0,
            maxUsage: 200,
            status: 'inactive',
            expiry: '2023-12-31',
            description: 'Discount on health checkup packages',
            minPurchase: 2000,
            created: '2023-11-15'
          },
          {
            id: 4,
            code: 'BABYFIRST',
            title: 'Baby Essentials Bundle',
            type: 'percentage',
            value: '15%',
            usage: '45/300',
            currentUsage: 45,
            maxUsage: 300,
            status: 'active',
            expiry: '2024-03-15',
            description: 'Discount on baby essential products',
            minPurchase: 1500,
            created: '2024-01-10'
          }
        ]);
      }, 500);
    });
  },

  getBanners: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Homepage Hero Banner',
            position: 'Homepage Top',
            status: 'active',
            clicks: 1245,
            image: 'banner-hero.jpg',
            imageUrl: 'https://via.placeholder.com/800x300/4DB6AC/FFFFFF?text=Pregnancy+Care',
            schedule: '24/7',
            redirectUrl: 'https://example.com/pregnancy-guides',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            altText: 'Pregnancy care banner'
          },
          {
            id: 2,
            title: 'Pregnancy Care Promotion',
            position: 'Category Page',
            status: 'active',
            clicks: 567,
            image: 'banner-pregnancy.jpg',
            imageUrl: 'https://via.placeholder.com/800x250/4DB6AC/FFFFFF?text=Baby+Essentials',
            schedule: '9 AM - 9 PM',
            redirectUrl: 'https://example.com/pregnancy-care',
            startDate: '2024-01-15',
            endDate: '2024-03-15',
            altText: 'Pregnancy promotion banner'
          },
          {
            id: 3,
            title: 'New Year Sale',
            position: 'Homepage Middle',
            status: 'scheduled',
            clicks: 0,
            image: 'banner-sale.jpg',
            imageUrl: 'https://via.placeholder.com/800x250/4DB6AC/FFFFFF?text=New+Year+Sale',
            schedule: '2024-01-25 to 2024-01-31',
            redirectUrl: 'https://example.com/new-year-sale',
            startDate: '2024-01-25',
            endDate: '2024-01-31',
            altText: 'New year sale banner'
          }
        ]);
      }, 500);
    });
  },

  getAnnouncements: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'System Maintenance',
            message: 'Platform will be down for maintenance on Feb 15, 2:00 AM - 4:00 AM IST',
            type: 'warning',
            status: 'active',
            created: '2024-01-20',
            expires: '2024-02-16',
            priority: 'high'
          },
          {
            id: 2,
            title: 'New Features Released',
            message: 'Check out our new telemedicine features! Video consultations now available.',
            type: 'info',
            status: 'active',
            created: '2024-01-18',
            expires: '2024-02-18',
            priority: 'medium'
          },
          {
            id: 3,
            title: 'Holiday Schedule',
            message: 'Our customer support will be closed on Republic Day, Jan 26th',
            type: 'info',
            status: 'active',
            created: '2024-01-15',
            expires: '2024-01-27',
            priority: 'low'
          }
        ]);
      }, 500);
    });
  },

  saveArticle: async (article) => {
    console.log('Saving article:', article);
    return new Promise(resolve => setTimeout(() => resolve({ 
      success: true, 
      data: { ...article, id: article.id || Date.now() }
    }), 500));
  },

  saveOffer: async (offer) => {
    console.log('Saving offer:', offer);
    return new Promise(resolve => setTimeout(() => resolve({ 
      success: true, 
      data: { ...offer, id: offer.id || Date.now() }
    }), 500));
  },

  saveBanner: async (banner) => {
    console.log('Saving banner:', banner);
    return new Promise(resolve => setTimeout(() => resolve({ 
      success: true, 
      data: { ...banner, id: banner.id || Date.now() }
    }), 500));
  },

  saveAnnouncement: async (announcement) => {
    console.log('Saving announcement:', announcement);
    return new Promise(resolve => setTimeout(() => resolve({ 
      success: true, 
      data: { ...announcement, id: announcement.id || Date.now() }
    }), 500));
  },

  deleteItem: async (type, id) => {
    console.log(`Deleting ${type} with id:`, id);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  },

  toggleStatus: async (type, id, status) => {
    console.log(`Toggling ${type} status:`, id, status);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  },

  getAnalytics: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          totalViews: 124567,
          redemptionRate: 24.5,
          offerRevenue: 124567,
          newUsers: 1245,
          conversionRate: 18.2,
          totalArticles: 42,
          activeOffers: 8,
          bannerClicks: 5678
        });
      }, 500);
    });
  }
};

// Simple Confirm Modal Component
const ConfirmModal = ({ 
  title = 'Confirm Action',
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <HiExclamationCircle className="cm-modal-icon" />;
      case 'success':
        return <HiCheckCircle className="cm-modal-icon" />;
      case 'error':
        return <HiXCircle className="cm-modal-icon" />;
      default:
        return <HiExclamationCircle className="cm-modal-icon" />;
    }
  };

  return (
    <div className="cm-confirm-modal-overlay">
      <div className="cm-confirm-modal">
        <button className="cm-modal-close-btn" onClick={onCancel}>
          <HiX />
        </button>
        
        <div className="cm-modal-header">
          {getIcon()}
          <h3 className="cm-modal-title">{title}</h3>
        </div>
        
        <div className="cm-modal-body">
          <p className="cm-modal-message">{message}</p>
        </div>
        
        <div className="cm-modal-footer">
          <button 
            className="cm-btn cm-btn-outline" 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`cm-btn ${type === 'warning' ? 'cm-btn-warning' : type === 'error' ? 'cm-btn-error' : 'cm-btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [actionType, setActionType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [articles, setArticles] = useState([]);
  const [offers, setOffers] = useState([]);
  const [banners, setBanners] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    loadData();
    loadAnalytics();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [articlesData, offersData, bannersData, announcementsData] = await Promise.all([
        ContentAPI.getArticles(),
        ContentAPI.getOffers(),
        ContentAPI.getBanners(),
        ContentAPI.getAnnouncements()
      ]);
      
      setArticles(articlesData);
      setOffers(offersData);
      setBanners(bannersData);
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const analyticsData = await ContentAPI.getAnalytics();
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  // Navigation handlers
  const navigateToGuideList = () => {
    setActiveTab('articles');
    setStatusFilter('all');
    setSearchTerm('');
  };

  const navigateToAnnouncements = () => {
    setActiveTab('announcements');
    setStatusFilter('all');
    setSearchTerm('');
  };

  const navigateToBannerManager = () => {
    setActiveTab('banners');
    setStatusFilter('all');
    setSearchTerm('');
  };

  const navigateToAddContent = (type = 'article') => {
    setSelectedItem(null);
    setFormData({});
    setIsEditing(true);
    setShowModal(true);
    setActionType('add');
    setImagePreview(null);
    if (type === 'article') setActiveTab('articles');
    else if (type === 'offer') setActiveTab('offers');
    else if (type === 'banner') setActiveTab('banners');
    else if (type === 'announcement') setActiveTab('announcements');
  };

  // Article handlers
  const openArticle = (article) => {
    setSelectedItem(article);
    setIsEditing(false);
    setShowModal(true);
  };

  const editArticle = (article) => {
    setSelectedItem(article);
    setFormData(article);
    setIsEditing(true);
    setShowModal(true);
    setActionType('edit');
  };

  const deleteArticle = (article) => {
    setSelectedItem(article);
    setActionType('delete_article');
    setShowConfirmModal(true);
  };

  // Offer handlers
  const addCoupon = () => {
    setSelectedItem(null);
    setFormData({});
    setIsEditing(true);
    setShowModal(true);
    setActionType('add');
  };

  const editOffer = (offer) => {
    setSelectedItem(offer);
    setFormData(offer);
    setIsEditing(true);
    setShowModal(true);
    setActionType('edit');
  };

  const deleteOffer = (offer) => {
    setSelectedItem(offer);
    setActionType('delete_offer');
    setShowConfirmModal(true);
  };

  const viewStats = () => {
    setActiveTab('offers');
    alert('Showing detailed redemption analytics in a separate panel...');
  };

  // Banner handlers
  const uploadBanner = () => {
    setSelectedItem(null);
    setFormData({});
    setIsEditing(true);
    setShowModal(true);
    setActionType('add');
    setImagePreview(null);
  };

  const previewBanner = (banner) => {
    setSelectedItem(banner);
    setIsEditing(false);
    setShowModal(true);
  };

  const editBanner = (banner) => {
    setSelectedItem(banner);
    setFormData(banner);
    setIsEditing(true);
    setShowModal(true);
    setActionType('edit');
    setImagePreview(banner.imageUrl);
  };

  const deleteBanner = (banner) => {
    setSelectedItem(banner);
    setActionType('delete_banner');
    setShowConfirmModal(true);
  };

  // Announcement handlers
  const editAnnouncement = (announcement) => {
    setSelectedItem(announcement);
    setFormData(announcement);
    setIsEditing(true);
    setShowModal(true);
    setActionType('edit');
  };

  const deleteAnnouncement = (announcement) => {
    setSelectedItem(announcement);
    setActionType('delete_announcement');
    setShowConfirmModal(true);
  };

  // Form handlers
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let result;
      const itemData = { ...formData };
      
      if (activeTab === 'articles') {
        if (!itemData.published && itemData.status === 'published') {
          itemData.published = new Date().toISOString().split('T')[0];
        }
        result = await ContentAPI.saveArticle(itemData);
        if (result.success) {
          if (actionType === 'add') {
            setArticles([...articles, result.data]);
          } else {
            setArticles(articles.map(a => a.id === result.data.id ? result.data : a));
          }
          setShowModal(false);
          alert(`Article ${actionType === 'add' ? 'created' : 'updated'} successfully!`);
        }
      } else if (activeTab === 'offers') {
        result = await ContentAPI.saveOffer(itemData);
        if (result.success) {
          if (actionType === 'add') {
            setOffers([...offers, result.data]);
          } else {
            setOffers(offers.map(o => o.id === result.data.id ? result.data : o));
          }
          setShowModal(false);
          alert(`Offer ${actionType === 'add' ? 'created' : 'updated'} successfully!`);
        }
      } else if (activeTab === 'banners') {
        if (imagePreview) {
          itemData.imageUrl = imagePreview;
        }
        result = await ContentAPI.saveBanner(itemData);
        if (result.success) {
          if (actionType === 'add') {
            setBanners([...banners, result.data]);
          } else {
            setBanners(banners.map(b => b.id === result.data.id ? result.data : b));
          }
          setShowModal(false);
          alert(`Banner ${actionType === 'add' ? 'created' : 'updated'} successfully!`);
        }
      } else if (activeTab === 'announcements') {
        result = await ContentAPI.saveAnnouncement(itemData);
        if (result.success) {
          if (actionType === 'add') {
            setAnnouncements([...announcements, result.data]);
          } else {
            setAnnouncements(announcements.map(a => a.id === result.data.id ? result.data : a));
          }
          setShowModal(false);
          alert(`Announcement ${actionType === 'add' ? 'created' : 'updated'} successfully!`);
        }
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        handleFormChange('image', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Confirm action handler
  const handleConfirmAction = async () => {
    setLoading(true);
    try {
      if (actionType === 'delete_article') {
        await ContentAPI.deleteItem('article', selectedItem.id);
        setArticles(articles.filter(a => a.id !== selectedItem.id));
        alert('Article deleted successfully!');
      } else if (actionType === 'delete_offer') {
        await ContentAPI.deleteItem('offer', selectedItem.id);
        setOffers(offers.filter(o => o.id !== selectedItem.id));
        alert('Offer deleted successfully!');
      } else if (actionType === 'delete_banner') {
        await ContentAPI.deleteItem('banner', selectedItem.id);
        setBanners(banners.filter(b => b.id !== selectedItem.id));
        alert('Banner deleted successfully!');
      } else if (actionType === 'delete_announcement') {
        await ContentAPI.deleteItem('announcement', selectedItem.id);
        setAnnouncements(announcements.filter(a => a.id !== selectedItem.id));
        alert('Announcement deleted successfully!');
      } else if (actionType === 'toggle_offer') {
        const newStatus = selectedItem.status === 'active' ? 'inactive' : 'active';
        await ContentAPI.toggleStatus('offer', selectedItem.id, newStatus);
        setOffers(offers.map(o => 
          o.id === selectedItem.id ? {...o, status: newStatus} : o
        ));
        alert(`Offer ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
      }
      
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error performing action:', error);
      alert('Error performing action. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle offer status
  const toggleOfferStatus = (offer) => {
    setSelectedItem(offer);
    setActionType('toggle_offer');
    setShowConfirmModal(true);
  };

  // Filter and search functions
  const getFilteredData = () => {
    let data = [];
    switch (activeTab) {
      case 'articles': data = articles; break;
      case 'offers': data = offers; break;
      case 'banners': data = banners; break;
      case 'announcements': data = announcements; break;
      default: data = [];
    }

    if (searchTerm) {
      data = data.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (statusFilter !== 'all') {
      data = data.filter(item => item.status === statusFilter);
    }

    return data;
  };

  // Export functionality
  const handleExport = () => {
    const data = getFilteredData();
    if (data.length === 0) {
      alert('No data to export!');
      return;
    }
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(`Exported ${data.length} items successfully!`);
  };

  // Bulk upload functionality
  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      alert('Please upload a JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!Array.isArray(data)) {
          alert('Invalid file format. Expected an array of items.');
          return;
        }
        alert(`Successfully loaded ${data.length} items from ${file.name}`);
        console.log('Uploaded data:', data);
      } catch (error) {
        alert('Error parsing JSON file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'articles': return articles;
      case 'offers': return offers;
      case 'banners': return banners;
      case 'announcements': return announcements;
      default: return [];
    }
  };

  // Columns configuration
  const columns = {
    articles: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'author', label: 'Author' },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`cm-status-badge cm-status-${status}`}>
            {status === 'published' ? <HiCheckCircle /> : <HiClock />}
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
          <span className={`cm-featured-badge ${featured ? 'cm-yes' : 'cm-no'}`}>
            {featured ? '⭐ Yes' : 'No'}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, article) => (
          <div className="cm-action-buttons">
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-view"
              onClick={() => openArticle(article)}
              title="Open"
            >
              <HiEye />
            </button>
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-edit"
              onClick={() => editArticle(article)}
              title="Edit"
            >
              <HiPencil />
            </button>
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-delete"
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
        render: (usage, offer) => (
          <div className="cm-usage-bar">
            <div className="cm-usage-label">{usage}</div>
            <div className="cm-usage-progress">
              <div 
                className="cm-progress-fill" 
                style={{ 
                  width: `${(offer.currentUsage / offer.maxUsage) * 100}%`
                }}
              ></div>
            </div>
          </div>
        )
      },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`cm-status-badge cm-status-${status}`}>
            {status === 'active' ? <HiCheckCircle /> : <HiXCircle />}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
      { key: 'expiry', label: 'Expiry Date' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, offer) => (
          <div className="cm-action-buttons">
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-edit"
              onClick={() => editOffer(offer)}
              title="Edit Offer"
            >
              <HiPencil />
            </button>
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-delete"
              onClick={() => deleteOffer(offer)}
              title="Delete Offer"
            >
              <HiTrash />
            </button>
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-toggle"
              onClick={() => toggleOfferStatus(offer)}
              title={offer.status === 'active' ? 'Deactivate' : 'Activate'}
            >
              {offer.status === 'active' ? <HiXCircle /> : <HiCheckCircle />}
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
          <span className={`cm-status-badge cm-status-${status}`}>
            {status === 'active' ? <HiCheckCircle /> : 
             status === 'scheduled' ? <HiCalendar /> : <HiXCircle />}
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
          <div className="cm-action-buttons">
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-view"
              onClick={() => previewBanner(banner)}
              title="Preview"
            >
              <HiEye />
            </button>
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-edit"
              onClick={() => editBanner(banner)}
              title="Edit"
            >
              <HiPencil />
            </button>
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-delete"
              onClick={() => deleteBanner(banner)}
              title="Delete"
            >
              <HiTrash />
            </button>
          </div>
        )
      }
    ],
    announcements: [
      { key: 'title', label: 'Title' },
      { key: 'message', label: 'Message', width: '300px' },
      { 
        key: 'type', 
        label: 'Type',
        render: (type) => (
          <span className={`cm-type-badge cm-type-${type}`}>
            {type === 'warning' ? <HiExclamationCircle /> : <HiCheckCircle />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        )
      },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`cm-status-badge cm-status-${status}`}>
            {status === 'active' ? <HiCheckCircle /> : <HiArchive />}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
      { key: 'created', label: 'Created Date' },
      { key: 'expires', label: 'Expires' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, announcement) => (
          <div className="cm-action-buttons">
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-edit"
              onClick={() => editAnnouncement(announcement)}
              title="Edit"
            >
              <HiPencil />
            </button>
            <button 
              className="cm-btn-icon cm-btn-sm cm-btn-delete"
              onClick={() => deleteAnnouncement(announcement)}
              title="Delete"
            >
              <HiTrash />
            </button>
          </div>
        )
      }
    ]
  };

  const renderModalContent = () => {
    if (activeTab === 'articles') {
      if (isEditing) {
        return (
          <form className="cm-article-form" onSubmit={handleFormSubmit}>
            <div className="cm-form-group">
              <label className="cm-form-label">Title *</label>
              <input 
                type="text" 
                className="cm-form-input" 
                value={formData.title || ''}
                onChange={(e) => handleFormChange('title', e.target.value)}
                required
                placeholder="Enter article title"
              />
            </div>
            <div className="cm-form-row">
              <div className="cm-form-group">
                <label className="cm-form-label">Category *</label>
                <select 
                  className="cm-form-input" 
                  value={formData.category || 'Pregnancy'}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                  required
                >
                  <option value="Pregnancy">Pregnancy</option>
                  <option value="Baby Care">Baby Care</option>
                  <option value="Health Tips">Health Tips</option>
                  <option value="Doctor Advice">Doctor Advice</option>
                  <option value="Parenting">Parenting</option>
                </select>
              </div>
              <div className="cm-form-group">
                <label className="cm-form-label">Author *</label>
                <input 
                  type="text" 
                  className="cm-form-input" 
                  value={formData.author || ''}
                  onChange={(e) => handleFormChange('author', e.target.value)}
                  required
                  placeholder="Enter author name"
                />
              </div>
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Content *</label>
              <textarea 
                className="cm-form-input" 
                rows="10"
                value={formData.content || ''}
                onChange={(e) => handleFormChange('content', e.target.value)}
                required
                placeholder="Write your article content here..."
              />
            </div>
            <div className="cm-form-row">
              <div className="cm-form-group">
                <label className="cm-form-label">Status</label>
                <select 
                  className="cm-form-input" 
                  value={formData.status || 'draft'}
                  onChange={(e) => handleFormChange('status', e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="cm-form-group">
                <label className="cm-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={formData.featured || false}
                    onChange={(e) => handleFormChange('featured', e.target.checked)}
                  /> 
                  <span>Featured Article</span>
                </label>
              </div>
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Tags (comma separated)</label>
              <input 
                type="text" 
                className="cm-form-input" 
                value={formData.tags ? formData.tags.join(', ') : ''}
                onChange={(e) => handleFormChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                placeholder="nutrition, pregnancy, health"
              />
            </div>
            <div className="cm-form-actions">
              <button type="button" className="cm-btn cm-btn-outline" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit" className="cm-btn cm-btn-primary" disabled={loading}>
                {loading ? 'Saving...' : actionType === 'add' ? 'Publish Article' : 'Save Changes'}
              </button>
              {actionType === 'add' && (
                <button 
                  type="button" 
                  className="cm-btn cm-btn-secondary"
                  onClick={() => {
                    handleFormChange('status', 'draft');
                    handleFormSubmit({ preventDefault: () => {} });
                  }}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save as Draft'}
                </button>
              )}
            </div>
          </form>
        );
      } else {
        return (
          <div className="cm-article-view">
            <h2>{selectedItem?.title}</h2>
            <div className="cm-article-meta">
              <div className="cm-meta-item">
                <span className="cm-meta-label">Category:</span>
                <span className="cm-meta-value">{selectedItem?.category}</span>
              </div>
              <div className="cm-meta-item">
                <span className="cm-meta-label">Author:</span>
                <span className="cm-meta-value">{selectedItem?.author}</span>
              </div>
              <div className="cm-meta-item">
                <span className="cm-meta-label">Published:</span>
                <span className="cm-meta-value">{selectedItem?.published}</span>
              </div>
              <div className="cm-meta-item">
                <span className="cm-meta-label">Views:</span>
                <span className="cm-meta-value">{selectedItem?.views?.toLocaleString()}</span>
              </div>
              <div className="cm-meta-item">
                <span className="cm-meta-label">Read Time:</span>
                <span className="cm-meta-value">{selectedItem?.readTime}</span>
              </div>
            </div>
            <div className="cm-article-content">
              <p>{selectedItem?.content}</p>
            </div>
            {selectedItem?.tags && selectedItem.tags.length > 0 && (
              <div className="cm-article-tags">
                {selectedItem.tags.map((tag, index) => (
                  <span key={index} className="cm-tag">{tag}</span>
                ))}
              </div>
            )}
            <div className="cm-article-actions">
              <button className="cm-btn cm-btn-outline" onClick={() => setIsEditing(true)}>
                <HiPencil /> Edit Article
              </button>
              <button className="cm-btn cm-btn-primary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        );
      }
    } else if (activeTab === 'offers') {
      return (
        <form className="cm-offer-form" onSubmit={handleFormSubmit}>
          <div className="cm-form-row">
            <div className="cm-form-group">
              <label className="cm-form-label">Coupon Code *</label>
              <input 
                type="text" 
                className="cm-form-input" 
                value={formData.code || ''}
                onChange={(e) => handleFormChange('code', e.target.value.toUpperCase())}
                required
                placeholder="e.g., WELCOME25"
                style={{ textTransform: 'uppercase' }}
              />
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Offer Title *</label>
              <input 
                type="text" 
                className="cm-form-input" 
                value={formData.title || ''}
                onChange={(e) => handleFormChange('title', e.target.value)}
                required
                placeholder="e.g., Welcome Discount"
              />
            </div>
          </div>
          <div className="cm-form-row">
            <div className="cm-form-group">
              <label className="cm-form-label">Offer Type *</label>
              <select 
                className="cm-form-input" 
                value={formData.type || 'percentage'}
                onChange={(e) => handleFormChange('type', e.target.value)}
                required
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
                <option value="free_shipping">Free Shipping</option>
              </select>
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Value *</label>
              <input 
                type="text" 
                className="cm-form-input" 
                value={formData.value || ''}
                onChange={(e) => handleFormChange('value', e.target.value)}
                required
                placeholder={formData.type === 'percentage' ? 'e.g., 25%' : 'e.g., ₹50'}
              />
            </div>
          </div>
          <div className="cm-form-row">
            <div className="cm-form-group">
              <label className="cm-form-label">Max Usage *</label>
              <input 
                type="number" 
                className="cm-form-input" 
                value={formData.maxUsage || ''}
                onChange={(e) => handleFormChange('maxUsage', parseInt(e.target.value) || 0)}
                required
                min="1"
                placeholder="e.g., 1000"
              />
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Expiry Date *</label>
              <input 
                type="date" 
                className="cm-form-input" 
                value={formData.expiry || ''}
                onChange={(e) => handleFormChange('expiry', e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          <div className="cm-form-row">
            <div className="cm-form-group">
              <label className="cm-form-label">Minimum Purchase</label>
              <input 
                type="number" 
                className="cm-form-input" 
                value={formData.minPurchase || 0}
                onChange={(e) => handleFormChange('minPurchase', parseInt(e.target.value) || 0)}
                min="0"
                placeholder="e.g., 500"
              />
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Status</label>
              <select 
                className="cm-form-input" 
                value={formData.status || 'active'}
                onChange={(e) => handleFormChange('status', e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <div className="cm-form-group">
            <label className="cm-form-label">Description</label>
            <textarea 
              className="cm-form-input" 
              rows="3"
              value={formData.description || ''}
              onChange={(e) => handleFormChange('description', e.target.value)}
              placeholder="Enter offer description"
            />
          </div>
          <div className="cm-form-actions">
            <button type="button" className="cm-btn cm-btn-outline" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="cm-btn cm-btn-primary" disabled={loading}>
              {loading ? 'Saving...' : actionType === 'add' ? 'Create Offer' : 'Update Offer'}
            </button>
          </div>
        </form>
      );
    } else if (activeTab === 'banners') {
      if (isEditing) {
        return (
          <form className="cm-banner-form" onSubmit={handleFormSubmit}>
            <div className="cm-form-group">
              <label className="cm-form-label">Banner Title *</label>
              <input 
                type="text" 
                className="cm-form-input" 
                value={formData.title || ''}
                onChange={(e) => handleFormChange('title', e.target.value)}
                required
                placeholder="e.g., Summer Sale Banner"
              />
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Banner Position *</label>
              <select 
                className="cm-form-input" 
                value={formData.position || 'Homepage Top'}
                onChange={(e) => handleFormChange('position', e.target.value)}
                required
              >
                <option value="Homepage Top">Homepage Top</option>
                <option value="Homepage Middle">Homepage Middle</option>
                <option value="Category Page">Category Page</option>
                <option value="Product Page">Product Page</option>
                <option value="Sidebar">Sidebar</option>
              </select>
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Banner Image</label>
              <div className="cm-image-upload">
                <div className="cm-upload-preview" onClick={() => document.getElementById('cm-banner-upload').click()}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="cm-banner-preview" />
                  ) : selectedItem?.imageUrl ? (
                    <img src={selectedItem.imageUrl} alt="Current" className="cm-banner-preview" />
                  ) : (
                    <>
                      <HiPhotograph className="cm-upload-icon" />
                      <p>Click to upload banner image</p>
                      <p className="cm-upload-hint">Recommended: 800x300px</p>
                    </>
                  )}
                </div>
                <input
                  id="cm-banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <button 
                  type="button" 
                  className="cm-btn cm-btn-outline"
                  onClick={() => document.getElementById('cm-banner-upload').click()}
                >
                  <HiUpload /> Choose Image
                </button>
              </div>
            </div>
            <div className="cm-form-row">
              <div className="cm-form-group">
                <label className="cm-form-label">Start Date</label>
                <input 
                  type="date" 
                  className="cm-form-input" 
                  value={formData.startDate || ''}
                  onChange={(e) => handleFormChange('startDate', e.target.value)}
                />
              </div>
              <div className="cm-form-group">
                <label className="cm-form-label">End Date</label>
                <input 
                  type="date" 
                  className="cm-form-input" 
                  value={formData.endDate || ''}
                  onChange={(e) => handleFormChange('endDate', e.target.value)}
                />
              </div>
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Redirect URL *</label>
              <input 
                type="url" 
                className="cm-form-input" 
                value={formData.redirectUrl || ''}
                onChange={(e) => handleFormChange('redirectUrl', e.target.value)}
                required
                placeholder="https://example.com/offer"
              />
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Alt Text (Accessibility)</label>
              <input 
                type="text" 
                className="cm-form-input" 
                value={formData.altText || ''}
                onChange={(e) => handleFormChange('altText', e.target.value)}
                placeholder="Description of the banner image"
              />
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Status</label>
              <select 
                className="cm-form-input" 
                value={formData.status || 'active'}
                onChange={(e) => handleFormChange('status', e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div className="cm-form-actions">
              <button type="button" className="cm-btn cm-btn-outline" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit" className="cm-btn cm-btn-primary" disabled={loading}>
                {loading ? 'Saving...' : actionType === 'add' ? 'Create Banner' : 'Update Banner'}
              </button>
            </div>
          </form>
        );
      } else {
        return (
          <div className="cm-banner-preview-modal">
            <h2>{selectedItem?.title}</h2>
            <div className="cm-banner-info">
              <div className="cm-info-item">
                <span className="cm-info-label">Position:</span>
                <span className="cm-info-value">{selectedItem?.position}</span>
              </div>
              <div className="cm-info-item">
                <span className="cm-info-label">Status:</span>
                <span className={`cm-status-badge cm-status-${selectedItem?.status}`}>
                  {selectedItem?.status?.charAt(0).toUpperCase() + selectedItem?.status?.slice(1)}
                </span>
              </div>
              <div className="cm-info-item">
                <span className="cm-info-label">Schedule:</span>
                <span className="cm-info-value">{selectedItem?.schedule}</span>
              </div>
              <div className="cm-info-item">
                <span className="cm-info-label">Clicks:</span>
                <span className="cm-info-value">{selectedItem?.clicks?.toLocaleString()}</span>
              </div>
              <div className="cm-info-item">
                <span className="cm-info-label">Redirect URL:</span>
                <a href={selectedItem?.redirectUrl} target="_blank" rel="noopener noreferrer" className="cm-info-link">
                  {selectedItem?.redirectUrl}
                </a>
              </div>
            </div>
            <div className="cm-banner-image-preview">
              <img 
                src={selectedItem?.imageUrl || 'https://via.placeholder.com/800x300/4DB6AC/FFFFFF?text=Banner+Image'} 
                alt={selectedItem?.altText || selectedItem?.title}
                className="cm-preview-image"
              />
            </div>
            <div className="cm-banner-actions">
              <button className="cm-btn cm-btn-outline" onClick={() => setIsEditing(true)}>
                <HiPencil /> Edit Banner
              </button>
              <button className="cm-btn cm-btn-primary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        );
      }
    } else if (activeTab === 'announcements') {
      return (
        <form className="cm-announcement-form" onSubmit={handleFormSubmit}>
          <div className="cm-form-group">
            <label className="cm-form-label">Title *</label>
            <input 
              type="text" 
              className="cm-form-input" 
              value={formData.title || ''}
              onChange={(e) => handleFormChange('title', e.target.value)}
              required
              placeholder="Enter announcement title"
            />
          </div>
          <div className="cm-form-group">
            <label className="cm-form-label">Message *</label>
            <textarea 
              className="cm-form-input" 
              rows="4"
              value={formData.message || ''}
              onChange={(e) => handleFormChange('message', e.target.value)}
              required
              placeholder="Enter announcement message"
            />
          </div>
          <div className="cm-form-row">
            <div className="cm-form-group">
              <label className="cm-form-label">Type</label>
              <select 
                className="cm-form-input" 
                value={formData.type || 'info'}
                onChange={(e) => handleFormChange('type', e.target.value)}
              >
                <option value="info">Information</option>
                <option value="warning">Warning</option>
              </select>
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Priority</label>
              <select 
                className="cm-form-input" 
                value={formData.priority || 'medium'}
                onChange={(e) => handleFormChange('priority', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="cm-form-row">
            <div className="cm-form-group">
              <label className="cm-form-label">Created Date</label>
              <input 
                type="date" 
                className="cm-form-input" 
                value={formData.created || new Date().toISOString().split('T')[0]}
                onChange={(e) => handleFormChange('created', e.target.value)}
              />
            </div>
            <div className="cm-form-group">
              <label className="cm-form-label">Expires On</label>
              <input 
                type="date" 
                className="cm-form-input" 
                value={formData.expires || ''}
                onChange={(e) => handleFormChange('expires', e.target.value)}
              />
            </div>
          </div>
          <div className="cm-form-group">
            <label className="cm-form-label">Status</label>
            <select 
              className="cm-form-input" 
              value={formData.status || 'active'}
              onChange={(e) => handleFormChange('status', e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="cm-form-actions">
            <button type="button" className="cm-btn cm-btn-outline" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="cm-btn cm-btn-primary" disabled={loading}>
              {loading ? 'Saving...' : actionType === 'add' ? 'Create Announcement' : 'Update Announcement'}
            </button>
          </div>
        </form>
      );
    }
    return null;
  };

  return (
    <div className="cm-content-management">
      <div className="cm-page-header">
        <div className="cm-header-content">
          <div className="cm-header-title">
            <h1>Content & Offers Management</h1>
            <p>Manage platform content, promotional offers, and marketing banners</p>
          </div>
          <div className="cm-header-buttons">
            <button className="cm-btn cm-btn-secondary" onClick={navigateToGuideList}>
              Pregnancy Guides
            </button>
            <button className="cm-btn cm-btn-secondary" onClick={() => navigateToAddContent('article')}>
              Baby Care Content
            </button>
            <button className="cm-btn cm-btn-secondary" onClick={navigateToAnnouncements}>
              Announcements
            </button>
            <button className="cm-btn cm-btn-secondary" onClick={navigateToBannerManager}>
              Banners
            </button>
            <button className="cm-btn cm-btn-primary" onClick={() => navigateToAddContent()}>
              <HiPlus /> Add Content
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="cm-content-stats cm-card">
        <h3>Content Overview</h3>
        <div className="cm-stats-grid">
          <div className="cm-stat-item">
            <HiNewspaper />
            <div>
              <div className="cm-stat-value">{analytics?.totalArticles || articles.length}</div>
              <div className="cm-stat-label">Total Articles</div>
            </div>
          </div>
          <div className="cm-stat-item">
            <HiTag />
            <div>
              <div className="cm-stat-value">{offers.filter(o => o.status === 'active').length}</div>
              <div className="cm-stat-label">Active Offers</div>
            </div>
          </div>
          <div className="cm-stat-item">
            <HiPhotograph />
            <div>
              <div className="cm-stat-value">{banners.length}</div>
              <div className="cm-stat-label">Marketing Banners</div>
            </div>
          </div>
          <div className="cm-stat-item">
            <HiCalendar />
            <div>
              <div className="cm-stat-value">{analytics?.totalViews?.toLocaleString() || '124,567'}</div>
              <div className="cm-stat-label">Total Content Views</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="cm-tab-navigation">
        <button 
          className={`cm-tab-btn ${activeTab === 'articles' ? 'cm-active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          <HiNewspaper /> Articles ({articles.length})
        </button>
        <button 
          className={`cm-tab-btn ${activeTab === 'offers' ? 'cm-active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          <HiTag /> Offers ({offers.length})
        </button>
        <button 
          className={`cm-tab-btn ${activeTab === 'banners' ? 'cm-active' : ''}`}
          onClick={() => setActiveTab('banners')}
        >
          <HiPhotograph /> Banners ({banners.length})
        </button>
        <button 
          className={`cm-tab-btn ${activeTab === 'announcements' ? 'cm-active' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          <HiCalendar /> Announcements ({announcements.length})
        </button>
      </div>

      {/* Management Toolbar */}
      <div className="cm-management-toolbar">
        <div className="cm-toolbar-left">
          <div className="cm-search-filter-container">
            {/* Search Box */}
            <div className="cm-search-box">
              <HiOutlineSearch className="cm-search-icon" />
              <input 
                type="text" 
                className="cm-form-input cm-search-input" 
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Box */}
            <div className="cm-filter-box">
              <HiFilter className="cm-filter-icon" />
              <select 
                className="cm-form-input cm-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
        </div>
        <div className="cm-toolbar-right">
          {activeTab === 'offers' && (
            <button className="cm-btn cm-btn-primary" onClick={addCoupon}>
              <HiPlus /> Add Coupon
            </button>
          )}
          {activeTab === 'banners' && (
            <button className="cm-btn cm-btn-primary" onClick={uploadBanner}>
              <HiUpload /> Upload Banner
            </button>
          )}
          <button className="cm-btn cm-btn-outline" onClick={handleExport} disabled={getFilteredData().length === 0}>
            <HiDownload /> Export
          </button>
          <label className="cm-btn cm-btn-outline">
            <HiUpload /> Bulk Upload
            <input 
              type="file" 
              accept=".json" 
              style={{ display: 'none' }}
              onChange={handleBulkUpload}
            />
          </label>
          {activeTab === 'offers' && (
            <button className="cm-btn cm-btn-secondary" onClick={viewStats}>
              <HiEye /> View Stats
            </button>
          )}
        </div>
      </div>

      {/* Main Content Table */}
      <div className="cm-content-table cm-card cm-no-scroll">
        {loading && getFilteredData().length === 0 ? (
          <div className="cm-loading-spinner">
            <div className="cm-spinner"></div>
            <p>Loading {activeTab}...</p>
          </div>
        ) : (
          <>
            <div className="cm-table-container">
              <Table
                columns={columns[activeTab]}
                data={getFilteredData()}
                emptyMessage={`No ${activeTab} found. ${searchTerm || statusFilter !== 'all' ? 'Try changing your search or filter.' : `Click "Add ${activeTab === 'articles' ? 'Content' : activeTab === 'announcements' ? 'Announcement' : activeTab.slice(0, -1)}" to create one.`}`}
              />
            </div>
            {searchTerm && getFilteredData().length > 0 && (
              <div className="cm-search-results-info">
                Found {getFilteredData().length} {activeTab} matching "{searchTerm}"
              </div>
            )}
          </>
        )}
      </div>

      {/* Offer Analytics */}
      {activeTab === 'offers' && (
        <div className="cm-offer-analytics cm-card">
          <div className="cm-analytics-header">
            <h3>Offer Performance Analytics</h3>
          </div>
          <div className="cm-analytics-grid">
            <div className="cm-analytic-item">
              <div className="cm-analytic-value">{analytics?.redemptionRate || '24.5'}%</div>
              <div className="cm-analytic-label">Overall Redemption Rate</div>
            </div>
            <div className="cm-analytic-item">
              <div className="cm-analytic-value">₹{analytics?.offerRevenue?.toLocaleString() || '1,24,567'}</div>
              <div className="cm-analytic-label">Revenue from Offers</div>
            </div>
            <div className="cm-analytic-item">
              <div className="cm-analytic-value">{analytics?.newUsers?.toLocaleString() || '1,245'}</div>
              <div className="cm-analytic-label">New Users via Offers</div>
            </div>
            <div className="cm-analytic-item">
              <div className="cm-analytic-value">{analytics?.conversionRate || '18.2'}%</div>
              <div className="cm-analytic-label">Cart Conversion Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Modal */}
      {showModal && (
        <Modal
          title={
            isEditing 
              ? actionType === 'add' 
                ? `Add New ${activeTab === 'articles' ? 'Article' : activeTab === 'announcements' ? 'Announcement' : activeTab.slice(0, -1)}` 
                : `Edit ${activeTab === 'articles' ? 'Article' : activeTab === 'announcements' ? 'Announcement' : activeTab.slice(0, -1)}`
              : `View ${activeTab === 'articles' ? 'Article' : activeTab === 'announcements' ? 'Announcement' : activeTab.slice(0, -1)}`
          }
          onClose={() => setShowModal(false)}
          size="large"
        >
          <div className="cm-content-modal cm-no-scroll">
            {renderModalContent()}
          </div>
        </Modal>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <ConfirmModal
          title={
            actionType.includes('delete') ? 'Confirm Delete' : 
            actionType.includes('toggle') ? 'Confirm Status Change' : 'Confirm Action'
          }
          message={
            actionType.includes('delete') 
              ? `Are you sure you want to delete "${selectedItem?.title || selectedItem?.code}"? This action cannot be undone.`
              : actionType.includes('toggle')
              ? `Are you sure you want to ${selectedItem?.status === 'active' ? 'deactivate' : 'activate'} "${selectedItem?.title || selectedItem?.code}"?`
              : `Are you sure you want to perform this action on "${selectedItem?.title || selectedItem?.code}"?`
          }
          onConfirm={handleConfirmAction}
          onCancel={() => setShowConfirmModal(false)}
          confirmText={
            actionType.includes('delete') ? 'Delete' : 
            actionType.includes('toggle') ? (selectedItem?.status === 'active' ? 'Deactivate' : 'Activate') : 'Confirm'
          }
          cancelText="Cancel"
          type={actionType.includes('delete') ? 'error' : 'warning'}
        />
      )}
    </div>
  );
};

export default ContentManagement;