import React, { useEffect } from 'react';

function Lightbox({ src, caption, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="lightbox active" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
      
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={src} alt={caption} />
        {caption && <p className="lightbox-caption">{caption}</p>}
      </div>
      
      <div className="lightbox-nav">
        <button className="lightbox-nav-btn" onClick={onClose}>
          <i className="fas fa-compress"></i> Close
        </button>
        <a 
          href={src} 
          target="_blank" 
          rel="noopener noreferrer"
          className="lightbox-nav-btn"
          onClick={e => e.stopPropagation()}
        >
          <i className="fas fa-external-link-alt"></i> Open Full
        </a>
      </div>
    </div>
  );
}

export default Lightbox;