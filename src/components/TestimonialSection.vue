<template>
  <section class="section testimonial-section" aria-label="Testimonial">
    <div class="container">
      <div class="testimonial-card reveal">
        <div class="quote-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 7.05C7.28 7.56 4.5 10.78 4.5 14.5c0 1.1.89 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2H7.22c.53-2.13 2.42-3.74 4.78-3.98V3.5C7.02 4.07 3.5 7.93 3.5 12.5v4c0 2.21 1.79 4 4 4h3c2.21 0 4-1.79 4-4v-3c0-2.21-1.79-4-4-4h-.5V7.05zM21 7.05c-3.72.51-6.5 3.73-6.5 7.45 0 1.1.89 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2h-2.28c.53-2.13 2.42-3.74 4.78-3.98V3.5c-4.98.57-8.5 4.43-8.5 9v4c0 2.21 1.79 4 4 4h3c2.21 0 4-1.79 4-4v-3c0-2.21-1.79-4-4-4h-.5V7.05z"/>
          </svg>
        </div>
        <blockquote class="testimonial-quote">
          <p>
            Adam led our Vue 3 migration and did an incredible job — both in terms of
            technical and leadership ability, along with pioneering the heavy use of AI to tackle such a
            large task. Through hard work and initiative, he made this a reality far sooner than any of us expected.
          </p>
        </blockquote>
        <div class="testimonial-author">
          <div class="author-info">
            <span class="author-name">Jason Rooney</span>
            <span class="author-role">Staff Engineer, H2 Analytics</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-section {
  padding-top: 0;
}

.testimonial-card {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 44px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  text-align: center;
  position: relative;
}

.quote-icon {
  color: var(--accent);
  opacity: 0.3;
  margin-bottom: 20px;
}

.testimonial-quote p {
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--text-primary);
  font-style: italic;
  margin-bottom: 24px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.author-role {
  font-size: 0.83rem;
  color: var(--text-tertiary);
}

@media (max-width: 640px) {
  .testimonial-card {
    padding: 28px 24px;
  }

  .testimonial-quote p {
    font-size: 1rem;
  }
}

@media (max-width: 375px) {
  .testimonial-card {
    padding: 24px 20px;
  }
}
</style>
