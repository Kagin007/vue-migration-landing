<template>
  <section id="credibility" class="section">
    <div class="container">
      <div class="reveal">
        <span class="section-label">// About & Proof</span>
        <h2 class="section-title">Built by someone who's<br><span class="text-gradient">done the work.</span></h2>
      </div>

      <div class="credibility-layout">
        <div class="about-card reveal reveal-delay-1">
          <div class="about-avatar">
            <div class="avatar-placeholder">AS</div>
          </div>
          <div class="about-content">
            <h3>Hi, I'm Adam.</h3>
            <p>
              I'm a fullstack developer who recently completed a full Vue 2 to Vue 3 migration
              on a production enterprise application (300+ files) — Options API to Composition API, Vuex to Pinia,
              Vue CLI to Vite, and TypeScript adoption across the entire codebase.
            </p>
            <p>
              I broke the work into 40 structured tickets and completed it in just two sprints using
              an AI-accelerated methodology I've refined through hands-on execution. Now I help other
              teams do the same — faster, cheaper, and with less risk than figuring it out alone.
            </p>
            <div class="about-links">
              <a href="#linkedin" class="btn btn-secondary btn-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href="mailto:hello@example.com" class="btn btn-secondary btn-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>

        <div class="testimonials-block">
          <h3 class="reveal">What clients say</h3>

          <div class="testimonial-card reveal reveal-delay-2">
            <div class="testimonial-quote">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.3">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p>"Placeholder testimonial — Adam's structured approach to our Vue 2 migration gave us confidence that the project would be delivered on time and without breaking changes. Highly recommended for any team facing this transition."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">JD</div>
              <div>
                <strong>Jane Doe</strong>
                <span>CTO, Example SaaS Co.</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card reveal reveal-delay-3">
            <div class="testimonial-quote">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.3">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p>"Placeholder testimonial — The AI-accelerated methodology meant we were migrated in a fraction of the time we budgeted. The detailed ticket breakdown made it easy for our team to follow along and learn the new patterns."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">JS</div>
              <div>
                <strong>John Smith</strong>
                <span>Engineering Manager, Tech Corp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tech-stack reveal">
        <span class="stack-label mono">Migration Coverage</span>
        <div class="stack-items">
          <div class="stack-item">
            <span class="stack-from mono">Vue 2</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">Vue 3</span>
          </div>
          <div class="stack-item">
            <span class="stack-from mono">Options API</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">Composition API</span>
          </div>
          <div class="stack-item">
            <span class="stack-from mono">Vuex</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">Pinia</span>
          </div>
          <div class="stack-item">
            <span class="stack-from mono">Vue CLI</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">Vite</span>
          </div>
          <div class="stack-item">
            <span class="stack-from mono">JavaScript</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.credibility-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 48px;
}

.about-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 36px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 20px;
}

.avatar-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: var(--gradient-accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.about-content h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
}

.about-content p {
  font-size: 0.93rem;
  margin-bottom: 12px;
}

.about-links {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 10px 16px;
  font-size: 0.85rem;
}

.testimonials-block h3 {
  font-size: 1rem;
  color: var(--text-tertiary);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.testimonial-card {
  padding: 28px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 16px;
  margin-bottom: 16px;
}

.testimonial-quote {
  margin-bottom: 20px;
}

.testimonial-quote svg {
  margin-bottom: 8px;
}

.testimonial-quote p {
  font-size: 0.93rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
}

.testimonial-author strong {
  display: block;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.testimonial-author span {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.tech-stack {
  text-align: center;
  padding: 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 20px;
}

.stack-label {
  font-size: 0.8rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 24px;
  display: block;
}

.stack-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.stack-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.85rem;
}

.stack-from {
  color: var(--text-tertiary);
  text-decoration: line-through;
  opacity: 0.7;
}

.stack-to {
  color: var(--accent);
  font-weight: 600;
}

@media (max-width: 768px) {
  .credibility-layout {
    grid-template-columns: 1fr;
  }

  .stack-items {
    flex-direction: column;
    align-items: center;
  }
}
</style>
