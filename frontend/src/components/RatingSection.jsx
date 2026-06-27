import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';

const RatingSection = ({ reportId }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [thumb, setThumb] = useState(null); // 'up' or 'down'
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (reportId && rating > 0) {
      try {
        const response = await fetch(`http://localhost:8000/api/reports/${reportId}/rate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating }),
        });
        if (!response.ok) {
          console.error("Failed to submit rating to server");
        }
      } catch (err) {
        console.error("Error submitting rating:", err);
      }
    }
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setThumb(null);
      setFeedback('');
    }, 3000);
  };

  if (submitted) {
    return (
      <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: '500' }}>
        Thank you! Your feedback has been recorded.
      </div>
    );
  }

  return (
    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>How was this AI Summary?</h4>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          
          {/* Thumbs Feedback */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              type="button"
              className={`btn ${thumb === 'up' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.5rem' }}
              onClick={() => setThumb('up')}
            >
              <ThumbsUp size={18} />
            </button>
            <button 
              type="button"
              className={`btn ${thumb === 'down' ? 'btn-danger' : 'btn-outline'}`}
              style={{ padding: '0.5rem' }}
              onClick={() => setThumb('down')}
            >
              <ThumbsDown size={18} />
            </button>
          </div>

          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>

          {/* Star Rating */}
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: (hoveredRating || rating) >= star ? 'var(--color-warning)' : 'var(--color-text-muted)',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star size={24} fill={(hoveredRating || rating) >= star ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <textarea 
            className="form-control" 
            placeholder="Optional: Tell us what could be improved..." 
            rows="2"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn btn-secondary" 
          disabled={!thumb && rating === 0}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default RatingSection;
