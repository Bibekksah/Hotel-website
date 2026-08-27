import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaEdit, FaTrash, FaCheckCircle, FaCamera } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { initialReviews } from '../data/products';

export default function ReviewSystem({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewPhoto, setReviewPhoto] = useState('');

  // Edit Form State
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [editPhoto, setEditPhoto] = useState('');

  // Load reviews on mount & when productId changes
  useEffect(() => {
    const stored = localStorage.getItem('roshani_all_reviews');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed[productId]) {
        setReviews(parsed[productId]);
      } else {
        // Fallback to initial seed if available
        const seed = initialReviews[productId] || [];
        setReviews(seed);
        parsed[productId] = seed;
        localStorage.setItem('roshani_all_reviews', JSON.stringify(parsed));
      }
    } else {
      // Seed first time
      const seedReviews = { ...initialReviews };
      if (!seedReviews[productId]) {
        seedReviews[productId] = [];
      }
      setReviews(seedReviews[productId]);
      localStorage.setItem('roshani_all_reviews', JSON.stringify(seedReviews));
    }
  }, [productId]);

  // Save reviews helper
  const saveReviews = (updatedList) => {
    setReviews(updatedList);
    const stored = localStorage.getItem('roshani_all_reviews');
    const parsed = stored ? JSON.parse(stored) : {};
    parsed[productId] = updatedList;
    localStorage.setItem('roshani_all_reviews', JSON.stringify(parsed));
  };

  // Base64 Photo Uploader Helper
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

  // Submit Review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    const newReview = {
      id: 'rev_' + Date.now(),
      userName,
      rating,
      comment,
      photo: reviewPhoto,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      isVerified: true // Set true to simulate verified purchases in our boutique
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);

    // Reset Form
    setUserName('');
    setRating(5);
    setComment('');
    setReviewPhoto('');
  };

  // Delete Review
  const handleDelete = (id) => {
    const updated = reviews.filter(r => r.id !== id);
    saveReviews(updated);
  };

  // Start Edit Mode
  const startEdit = (review) => {
    setEditingId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditPhoto(review.photo || '');
  };

  // Save Edited Review
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updated = reviews.map(r => {
      if (r.id === editingId) {
        return {
          ...r,
          rating: editRating,
          comment: editComment,
          photo: editPhoto
        };
      }
      return r;
    });
    saveReviews(updated);
    setEditingId(null);
  };

  // Like Review
  const handleLike = (id) => {
    const updated = reviews.map(r => {
      if (r.id === id) {
        return { ...r, likes: r.likes + 1 };
      }
      return r;
    });
    saveReviews(updated);
  };

  // Calculate Aggregates
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  // Rating breakdowns
  const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (ratingBreakdown[r.rating] !== undefined) {
      ratingBreakdown[r.rating]++;
    }
  });

  return (
    <div className="w-full space-y-10 pt-6">
      {/* Review Header / Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-cream border border-gold/15 p-6 sm:p-8 rounded-2xl shadow-sm">
        {/* Large Score */}
        <div className="text-center lg:border-r border-gold/10 lg:pr-8 py-2">
          <p className="text-sm font-sans tracking-widest text-chocolate/60 uppercase">Average Rating</p>
          <h4 className="text-5xl font-serif font-bold text-coffee mt-2">{averageRating}</h4>
          <div className="flex justify-center space-x-1 mt-2.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <FaStar 
                key={s} 
                className={`w-4 h-4 ${
                  s <= Math.round(Number(averageRating)) ? 'text-gold' : 'text-gold/20'
                }`} 
              />
            ))}
          </div>
          <p className="text-xs text-chocolate/50 font-sans tracking-wide mt-2">Based on {totalReviews} reviews</p>
        </div>

        {/* Progress Bars */}
        <div className="col-span-1 lg:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingBreakdown[stars];
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center text-sm font-sans">
                <span className="w-8 text-chocolate/70 font-semibold">{stars} ★</span>
                <div className="flex-1 h-2.5 bg-beige rounded-full mx-3 overflow-hidden border border-gold/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gold rounded-full"
                  />
                </div>
                <span className="w-10 text-right text-chocolate/50">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Submission Form */}
      <div className="bg-[#FFFDF9] border border-gold/15 p-6 rounded-2xl">
        <h4 className="font-serif text-lg text-coffee font-semibold tracking-wider mb-4">Share Your Taste Experience</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans tracking-widest uppercase text-chocolate/60 mb-1.5 font-medium">Your Name</label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="E.g., Anish Gurung"
                className="w-full bg-cream border border-gold/20 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-gold transition-colors text-coffee"
              />
            </div>
            <div>
              <label className="block text-xs font-sans tracking-widest uppercase text-chocolate/60 mb-1.5 font-medium">Your Rating</label>
              <div className="flex items-center space-x-1.5 h-10">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform duration-200 hover:scale-125"
                  >
                    <FaStar 
                      className={`w-6 h-6 ${
                        s <= (hoverRating || rating) ? 'text-gold' : 'text-gold/20'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans tracking-widest uppercase text-chocolate/60 mb-1.5 font-medium">Review Content</label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others how it tastes! Softness, sweetness level, presentation..."
              className="w-full bg-cream border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors text-coffee resize-none"
            />
          </div>

          {/* Optional Photo Attachment */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 bg-cream hover:bg-beige border border-gold/20 px-4 py-2 rounded-xl cursor-pointer transition-colors text-chocolate/80 text-xs tracking-wider uppercase font-semibold">
                <FaCamera className="text-gold" />
                <span>Add Sweet Photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handlePhotoUpload(e, false)} 
                />
              </label>
              {reviewPhoto && (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gold/20">
                  <img src={reviewPhoto} alt="Upload preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setReviewPhoto('')}
                    className="absolute inset-0 bg-black/50 text-cream text-[9px] flex items-center justify-center font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-coffee to-chocolate hover:from-gold hover:to-gold-light hover:text-coffee text-cream border border-gold/20 px-6 py-2.5 rounded-xl transition-all duration-300 shadow-md font-sans text-xs tracking-widest uppercase font-semibold"
            >
              Post Review
            </button>
          </div>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h4 className="font-serif text-lg text-coffee font-semibold tracking-wider border-b border-gold/10 pb-3">
          Customer Stories ({totalReviews})
        </h4>

        {reviews.length === 0 ? (
          <p className="text-sm text-chocolate/50 font-sans italic text-center py-6">Be the first to review this sweet delicacy!</p>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {reviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-cream border border-gold/10 rounded-2xl p-5 shadow-sm relative hover:border-gold/35 transition-colors duration-300"
                >
                  {editingId === rev.id ? (
                    /* EDIT REVIEW FORM */
                    <form onSubmit={handleSaveEdit} className="space-y-4">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setEditRating(s)}
                            className="focus:outline-none"
                          >
                            <FaStar className={`w-5 h-5 ${s <= editRating ? 'text-gold' : 'text-gold/20'}`} />
                          </button>
                        ))}
                      </div>
                      <textarea
                        required
                        rows={3}
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        className="w-full bg-white border border-gold/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold text-coffee resize-none"
                      />
                      <div className="flex items-center space-x-3">
                        <label className="flex items-center space-x-2 bg-white hover:bg-beige border border-gold/20 px-3 py-1.5 rounded-lg cursor-pointer transition-colors text-chocolate/80 text-[10px] uppercase font-semibold">
                          <FaCamera className="text-gold" />
                          <span>Change Photo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handlePhotoUpload(e, true)} 
                          />
                        </label>
                        {editPhoto && (
                          <div className="relative w-8 h-8 rounded border border-gold/15">
                            <img src={editPhoto} alt="Edit preview" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => setEditPhoto('')}
                              className="absolute inset-0 bg-black/60 text-cream text-[8px] flex items-center justify-center font-bold"
                            >
                              x
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="bg-gray-200 text-charcoal hover:bg-gray-300 text-xs px-4 py-1.5 rounded-lg transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-chocolate text-cream hover:bg-gold hover:text-coffee text-xs px-4 py-1.5 rounded-lg transition-colors font-medium border border-gold/20"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* VIEW REVIEW MODE */
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-serif font-bold text-sm text-coffee tracking-wide">{rev.userName}</span>
                            {rev.isVerified && (
                              <span className="flex items-center text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium tracking-wide">
                                <FaCheckCircle className="w-2.5 h-2.5 mr-1" />
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-chocolate/40 font-sans">{rev.date}</span>
                        </div>

                        {/* Stars */}
                        <div className="flex space-x-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FaStar key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? 'text-gold' : 'text-gold/20'}`} />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm font-sans text-chocolate/85 leading-relaxed pr-6">{rev.comment}</p>

                      {/* Review Photo Attachment */}
                      {rev.photo && (
                        <div className="mt-3 relative inline-block max-w-xs group cursor-zoom-in">
                          <img 
                            src={rev.photo} 
                            alt="Customer upload" 
                            className="max-h-48 rounded-xl object-cover border border-gold/15 shadow-sm group-hover:brightness-95 transition-all duration-300"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-gold/5 mt-2">
                        <button
                          onClick={() => handleLike(rev.id)}
                          className="flex items-center space-x-1.5 text-xs text-chocolate/50 hover:text-gold transition-colors focus:outline-none"
                        >
                          <FaThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful ({rev.likes})</span>
                        </button>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => startEdit(rev)}
                            className="flex items-center space-x-1 text-[11px] text-chocolate/50 hover:text-blue-600 transition-colors focus:outline-none"
                            title="Edit review"
                          >
                            <FaEdit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(rev.id)}
                            className="flex items-center space-x-1 text-[11px] text-chocolate/50 hover:text-red-600 transition-colors focus:outline-none"
                            title="Delete review"
                          >
                            <FaTrash className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
