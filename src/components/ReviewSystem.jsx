import React, { useState, useEffect, useMemo } from 'react';
import { 
  FaStar, 
  FaThumbsUp, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle, 
  FaCamera, 
  FaUtensils, 
  FaCalendarAlt, 
  FaFilter, 
  FaSortAmountDown,
  FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getProductReviews, 
  getProductRatingStats, 
  addCustomerReview, 
  updateCustomerReview, 
  deleteCustomerReview, 
  toggleLikeCustomerReview 
} from '../utils/reviewsManager';

const RATING_LABELS = {
  1: '1 Star — Disappointing',
  2: '2 Stars — Fair',
  3: '3 Stars — Good & Satisfactory',
  4: '4 Stars — Very Delicious & Fresh',
  5: '5 Stars — Outstanding Royal Taste!'
};

const ORDER_TYPES = ['Dine-in', 'Takeaway', 'Home Delivery', 'Festival / Catering'];

export default function ReviewSystem({ productId, productName = 'Delicacy' }) {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  // Submission Form State
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [orderType, setOrderType] = useState('Dine-in');
  const [reviewPhoto, setReviewPhoto] = useState('');
  const [notification, setNotification] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Edit Form State
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const [editOrderType, setEditOrderType] = useState('Dine-in');

  // Filter & Sort State
  const [starFilter, setStarFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Photo modal preview
  const [previewPhotoModal, setPreviewPhotoModal] = useState(null);

  // Load reviews on mount and listen to real-time events
  useEffect(() => {
    const loadReviews = () => {
      setReviews(getProductReviews(productId));
    };

    loadReviews();

    const handleUpdate = () => {
      loadReviews();
    };

    window.addEventListener('roshani_reviews_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('roshani_reviews_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [productId]);

  // Photo upload helper
  const handlePhotoUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditPhoto(reader.result);
        } else {
          setReviewPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit original customer review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    addCustomerReview(productId, {
      userName,
      rating,
      comment,
      photo: reviewPhoto,
      orderType
    });

    // Reset Form
    setUserName('');
    setRating(5);
    setComment('');
    setReviewPhoto('');
    setOrderType('Dine-in');
    setShowForm(false);

    setNotification('Thank you for your review! Your original review has been posted.');
    setTimeout(() => setNotification(''), 4500);
  };

  // Start Edit Mode
  const startEdit = (review) => {
    setEditingId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditPhoto(review.photo || '');
    setEditOrderType(review.orderType || 'Dine-in');
  };

  // Save Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateCustomerReview(productId, editingId, {
      rating: editRating,
      comment: editComment,
      photo: editPhoto,
      orderType: editOrderType
    });
    setEditingId(null);
    setNotification('Review updated successfully.');
    setTimeout(() => setNotification(''), 3000);
  };

  // Delete review
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer review?')) {
      deleteCustomerReview(productId, id);
      setNotification('Review removed.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // Upvote / Like
  const handleLike = (id) => {
    toggleLikeCustomerReview(productId, id);
  };

  // Real-time rating stats
  const stats = useMemo(() => getProductRatingStats(productId), [productId, reviews]);

  // Filtered & Sorted reviews
  const displayReviews = useMemo(() => {
    let list = [...reviews];

    if (starFilter !== 'all') {
      const targetStar = Number(starFilter);
      list = list.filter((r) => r.rating === targetStar);
    }

    if (sortBy === 'newest') {
      list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    } else if (sortBy === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      list.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'helpful') {
      list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    return list;
  }, [reviews, starFilter, sortBy]);

  return (
    <div className="w-full space-y-8 pt-4">
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 border border-green-300 text-green-800 text-xs px-4 py-3 rounded-xl flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-600 w-4 h-4 shrink-0" />
              <span className="font-medium">{notification}</span>
            </div>
            <button onClick={() => setNotification('')} className="text-green-700 hover:text-green-900">
              <FaTimes className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Scorecard & Rating Breakdown */}
      <div className="bg-gradient-to-br from-[#FFF8EF] to-[#F7E9D0]/50 border border-gold/25 p-6 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Main Average Rating */}
          <div className="text-center md:border-r border-gold/15 md:pr-6">
            <span className="text-[10px] font-sans tracking-widest text-chocolate/60 uppercase font-bold">
              Customer Rating
            </span>
            {stats.totalReviews > 0 ? (
              <>
                <h4 className="text-5xl font-serif font-bold text-coffee mt-1.5">
                  {stats.averageRating.toFixed(1)}
                </h4>
                <div className="flex justify-center space-x-1 mt-2 text-gold">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(stats.averageRating) ? 'fill-current' : 'opacity-25'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-chocolate/60 font-sans mt-2">
                  Based on {stats.totalReviews} original customer review{stats.totalReviews === 1 ? '' : 's'}
                </p>
              </>
            ) : (
              <div className="py-2">
                <span className="inline-block bg-gold/15 text-gold text-xs font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full mt-2">
                  No Reviews Yet
                </span>
                <p className="text-xs text-chocolate/50 font-sans mt-2">
                  Be the first customer to share your thoughts!
                </p>
              </div>
            )}
          </div>

          {/* Star Breakdown Bars */}
          <div className="col-span-1 md:col-span-2 space-y-1.5">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stats.ratingBreakdown[stars] || 0;
              const pct = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center text-xs font-sans">
                  <button
                    onClick={() => setStarFilter(starFilter === String(stars) ? 'all' : String(stars))}
                    className={`w-12 text-left font-semibold transition-colors ${
                      starFilter === String(stars) ? 'text-gold' : 'text-chocolate/70 hover:text-gold'
                    }`}
                  >
                    {stars} ★
                  </button>
                  <div className="flex-1 h-2 bg-beige rounded-full mx-3 overflow-hidden border border-gold/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-gold rounded-full"
                    />
                  </div>
                  <span className="w-8 text-right text-chocolate/50 text-[11px] font-medium">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Toggle Button */}
        <div className="mt-6 pt-5 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-chocolate/70 font-sans">
            Tasted our <strong className="text-coffee">{productName}</strong>? Share your genuine feedback!
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto bg-gradient-to-r from-coffee to-chocolate hover:from-gold hover:to-gold-light hover:text-coffee text-cream border border-gold/20 px-5 py-2.5 rounded-xl font-sans text-xs tracking-wider uppercase font-bold transition-all shadow-md shrink-0"
          >
            {showForm ? 'Close Review Form' : 'Write a Review'}
          </button>
        </div>
      </div>

      {/* Write Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#FFFDF9] border border-gold/25 p-6 sm:p-7 rounded-2xl shadow-sm space-y-5">
              <div className="border-b border-gold/10 pb-3">
                <span className="text-[10px] font-sans tracking-widest uppercase text-gold font-bold">
                  Verified Customer Experience
                </span>
                <h4 className="font-serif text-xl font-bold text-coffee mt-0.5">
                  Share Your Real Review
                </h4>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-sans tracking-wider uppercase text-chocolate/70 mb-1.5 font-semibold">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="E.g., Bibek Sah"
                      className="w-full bg-cream border border-gold/25 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-gold transition-colors text-coffee"
                    />
                  </div>

                  {/* Dining / Order Type */}
                  <div>
                    <label className="block text-xs font-sans tracking-wider uppercase text-chocolate/70 mb-1.5 font-semibold">
                      Order / Dining Type
                    </label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full bg-cream border border-gold/25 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-gold transition-colors text-coffee"
                    >
                      {ORDER_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rating Stars Picker */}
                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-chocolate/70 mb-1.5 font-semibold">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform duration-150 hover:scale-125"
                        >
                          <FaStar
                            className={`w-6 h-6 ${
                              s <= (hoverRating || rating) ? 'text-gold' : 'text-gold/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-sans text-chocolate/70 font-medium ml-2">
                      {RATING_LABELS[hoverRating || rating]}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-chocolate/70 mb-1.5 font-semibold">
                    Review / Experience Feedback <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the taste, sweetness, texture, pure ghee aroma, or freshness..."
                    className="w-full bg-cream border border-gold/25 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors text-coffee resize-none"
                  />
                </div>

                {/* Optional Photo Attachment */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 bg-cream hover:bg-beige border border-gold/25 px-4 py-2 rounded-xl cursor-pointer transition-colors text-chocolate/80 text-xs tracking-wider uppercase font-semibold">
                      <FaCamera className="text-gold" />
                      <span>{reviewPhoto ? 'Change Photo' : 'Attach Food Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, false)}
                      />
                    </label>
                    {reviewPhoto && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gold/30 group">
                        <img src={reviewPhoto} alt="Review attachment preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setReviewPhoto('')}
                          className="absolute inset-0 bg-black/60 text-white text-[9px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-coffee to-chocolate hover:from-gold hover:to-gold-light hover:text-coffee text-cream border border-gold/20 px-7 py-2.5 rounded-xl font-sans text-xs tracking-widest uppercase font-bold transition-all shadow-md"
                  >
                    Submit Customer Review
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews Controls: Filter & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/15 pb-3">
        <div className="flex items-center space-x-2">
          <h4 className="font-serif text-lg font-bold text-coffee tracking-wide">
            Customer Reviews ({displayReviews.length})
          </h4>
          {starFilter !== 'all' && (
            <button
              onClick={() => setStarFilter('all')}
              className="text-[10px] bg-gold/15 text-gold hover:bg-gold hover:text-charcoal px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider transition-colors"
            >
              Filtered: {starFilter}★ ✕
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3 text-xs font-sans">
          {/* Sort selector */}
          <div className="flex items-center space-x-1.5 text-chocolate/70">
            <FaSortAmountDown className="text-gold w-3 h-3" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cream border border-gold/20 rounded-lg px-2.5 py-1 text-xs text-coffee focus:outline-none focus:border-gold"
            >
              <option value="newest">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayReviews.length === 0 ? (
          <div className="bg-cream/60 border border-dashed border-gold/25 rounded-2xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto">
              <FaUtensils className="w-5 h-5" />
            </div>
            <h5 className="font-serif text-base font-bold text-coffee">
              {reviews.length === 0 ? 'No Customer Reviews Yet' : 'No Reviews Matching This Filter'}
            </h5>
            <p className="text-xs text-chocolate/60 font-sans max-w-sm mx-auto leading-relaxed">
              {reviews.length === 0
                ? 'Be the first original customer to share your dining experience and taste feedback for this item!'
                : 'Try clearing the star filter to see all genuine customer reviews.'}
            </p>
            {!showForm && reviews.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gold text-charcoal px-5 py-2 rounded-xl text-xs font-sans uppercase tracking-wider font-bold shadow-sm hover:bg-gold-light transition-colors"
              >
                Write First Review
              </button>
            )}
          </div>
        ) : (
          displayReviews.map((rev) => (
            <motion.div
              key={rev.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-cream border border-gold/15 rounded-2xl p-5 shadow-sm hover:border-gold/35 transition-colors space-y-3"
            >
              {editingId === rev.id ? (
                /* EDIT FORM */
                <form onSubmit={handleSaveEdit} className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setEditRating(s)}
                          className="focus:outline-none"
                        >
                          <FaStar
                            className={`w-5 h-5 ${s <= editRating ? 'text-gold' : 'text-gold/20'}`}
                          />
                        </button>
                      ))}
                    </div>
                    <select
                      value={editOrderType}
                      onChange={(e) => setEditOrderType(e.target.value)}
                      className="bg-white border border-gold/25 rounded-lg px-2.5 py-1 text-xs text-coffee"
                    >
                      {ORDER_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    required
                    rows={3}
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full bg-white border border-gold/25 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold text-coffee resize-none"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <label className="flex items-center space-x-1.5 text-xs text-chocolate/80 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gold/20">
                      <FaCamera className="text-gold" />
                      <span>{editPhoto ? 'Change Photo' : 'Add Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, true)}
                      />
                    </label>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-3.5 py-1.5 text-xs font-sans font-medium text-chocolate/70 hover:text-chocolate"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-gold text-charcoal hover:bg-gold-light rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* VIEW REVIEW */
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        {/* Avatar initials */}
                        <div className="w-7 h-7 rounded-full bg-coffee border border-gold/30 text-gold flex items-center justify-center font-serif text-xs font-bold shrink-0">
                          {rev.userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-serif font-bold text-sm text-coffee">
                          {rev.userName}
                        </span>
                        <span className="inline-flex items-center text-[10px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                          <FaCheckCircle className="w-2.5 h-2.5 mr-1" />
                          Verified Customer
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] text-chocolate/50 font-sans mt-1 ml-9">
                        <span>{rev.date}</span>
                        {rev.orderType && (
                          <>
                            <span>•</span>
                            <span className="text-gold font-medium">{rev.orderType}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Star Rating Display */}
                    <div className="flex items-center space-x-0.5 text-gold">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-current' : 'opacity-20'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment Body */}
                  <p className="text-sm font-sans text-chocolate/85 leading-relaxed pl-9">
                    {rev.comment}
                  </p>

                  {/* Photo Attachment Thumbnail */}
                  {rev.photo && (
                    <div className="pl-9 pt-1">
                      <img
                        src={rev.photo}
                        alt="Customer sweet photo"
                        onClick={() => setPreviewPhotoModal(rev.photo)}
                        className="max-h-36 max-w-[200px] rounded-xl object-cover border border-gold/20 shadow-sm cursor-zoom-in hover:opacity-90 transition-opacity"
                      />
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-gold/10 text-xs text-chocolate/60 pl-9">
                    <button
                      onClick={() => handleLike(rev.id)}
                      className="flex items-center space-x-1.5 hover:text-gold transition-colors focus:outline-none"
                    >
                      <FaThumbsUp className="w-3.5 h-3.5" />
                      <span>Helpful ({rev.likes || 0})</span>
                    </button>

                    <div className="flex items-center space-x-3 text-[11px]">
                      <button
                        onClick={() => startEdit(rev)}
                        className="flex items-center space-x-1 hover:text-blue-600 transition-colors focus:outline-none"
                      >
                        <FaEdit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(rev.id)}
                        className="flex items-center space-x-1 hover:text-red-600 transition-colors focus:outline-none"
                      >
                        <FaTrash className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {previewPhotoModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
            onClick={() => setPreviewPhotoModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl max-h-[85vh] bg-charcoal rounded-2xl overflow-hidden p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewPhotoModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-gold hover:text-charcoal transition-colors z-10"
              >
                <FaTimes className="w-4 h-4" />
              </button>
              <img
                src={previewPhotoModal}
                alt="Enlarged review photo"
                className="w-full h-full object-contain rounded-xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
