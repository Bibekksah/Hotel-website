const REVIEWS_STORAGE_KEY = 'roshani_customer_reviews';

/**
 * Get all stored reviews across products
 */
export function getStoredReviews() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch (err) {
    console.error('Error reading customer reviews from storage:', err);
    return {};
  }
}

/**
 * Save all reviews to localStorage and broadcast update event
 */
export function saveStoredReviews(reviewsData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviewsData));
    window.dispatchEvent(new CustomEvent('roshani_reviews_updated', { detail: reviewsData }));
  } catch (err) {
    console.error('Error saving customer reviews to storage:', err);
  }
}

/**
 * Get reviews list for a single product
 */
export function getProductReviews(productId) {
  const all = getStoredReviews();
  return Array.isArray(all[productId]) ? all[productId] : [];
}

/**
 * Compute real-time rating and breakdown statistics for a product
 */
export function getProductRatingStats(productId) {
  const reviews = getProductReviews(productId);
  const totalReviews = reviews.length;
  
  const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;
  
  reviews.forEach((r) => {
    const star = Math.max(1, Math.min(5, Math.round(Number(r.rating) || 5)));
    ratingBreakdown[star] = (ratingBreakdown[star] || 0) + 1;
    sum += Number(r.rating) || 5;
  });

  const averageRating = totalReviews > 0 ? Number((sum / totalReviews).toFixed(1)) : 0;

  return {
    averageRating,
    totalReviews,
    ratingBreakdown,
  };
}

/**
 * Add a new real customer review
 */
export function addCustomerReview(productId, { userName, rating, comment, photo = '', orderType = 'Dine-in' }) {
  const all = getStoredReviews();
  const existing = Array.isArray(all[productId]) ? all[productId] : [];

  const newReview = {
    id: 'rev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    userName: userName.trim(),
    rating: Math.max(1, Math.min(5, Number(rating) || 5)),
    comment: comment.trim(),
    photo: photo || '',
    orderType: orderType || 'Dine-in',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    timestamp: Date.now(),
    likes: 0,
    isVerified: true, // Tagged as real customer feedback
  };

  const updated = [newReview, ...existing];
  all[productId] = updated;
  saveStoredReviews(all);
  return updated;
}

/**
 * Update an existing customer review
 */
export function updateCustomerReview(productId, reviewId, { rating, comment, photo, orderType }) {
  const all = getStoredReviews();
  const existing = Array.isArray(all[productId]) ? all[productId] : [];

  const updated = existing.map((r) => {
    if (r.id === reviewId) {
      return {
        ...r,
        rating: Math.max(1, Math.min(5, Number(rating) || r.rating)),
        comment: comment.trim(),
        photo: photo !== undefined ? photo : r.photo,
        orderType: orderType || r.orderType,
        editedAt: Date.now(),
      };
    }
    return r;
  });

  all[productId] = updated;
  saveStoredReviews(all);
  return updated;
}

/**
 * Delete a customer review
 */
export function deleteCustomerReview(productId, reviewId) {
  const all = getStoredReviews();
  const existing = Array.isArray(all[productId]) ? all[productId] : [];

  const updated = existing.filter((r) => r.id !== reviewId);
  all[productId] = updated;
  saveStoredReviews(all);
  return updated;
}

/**
 * Toggle like / helpful vote on a customer review
 */
export function toggleLikeCustomerReview(productId, reviewId) {
  const all = getStoredReviews();
  const existing = Array.isArray(all[productId]) ? all[productId] : [];

  const likedKey = `roshani_liked_${reviewId}`;
  const alreadyLiked = typeof window !== 'undefined' && localStorage.getItem(likedKey);

  const updated = existing.map((r) => {
    if (r.id === reviewId) {
      const delta = alreadyLiked ? -1 : 1;
      return { ...r, likes: Math.max(0, (r.likes || 0) + delta) };
    }
    return r;
  });

  if (typeof window !== 'undefined') {
    if (alreadyLiked) {
      localStorage.removeItem(likedKey);
    } else {
      localStorage.setItem(likedKey, '1');
    }
  }

  all[productId] = updated;
  saveStoredReviews(all);
  return updated;
}
