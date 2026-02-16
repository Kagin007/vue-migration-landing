<script setup>
import profilePic from '../assets/adam_profile_pic.jpeg'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="credibility" class="section" aria-labelledby="credibility-heading">
    <div class="container">
      <div>
        <span class="section-label">// About & Proof</span>
        <h2 id="credibility-heading" class="section-title">Your Vue Migration<br><span class="text-gradient">Consultant</span></h2>
      </div>

      <div class="about-card">
        <div class="about-avatar">
          <img :src="profilePic" alt="Adam Schulte" class="avatar-img" />
        </div>
        <div class="about-content">
          <h3>Hi, I'm Adam — Vue Migration Developer</h3>
          <p>
            I'm a fullstack developer who recently completed a full Vue 2 to Vue 3 migration
            on a production enterprise application (300+ files) — Options API to Composition API, Vuex to Pinia,
            Vuetify 2 to Vuetify 3, and Vue CLI to Vite.
          </p>
          <p>
            I broke the work into 40 structured tickets and completed it in just two sprints using
            a methodology I've refined through hands-on execution. Now I help other
            teams do the same — faster, cheaper, and with less risk than figuring it out alone.
          </p>
          <div class="about-links">
            <a href="https://www.linkedin.com/in/adam-schulte-a279ab10/" class="btn btn-secondary btn-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <router-link to="/blog/vue-2-to-vue-3-migration-case-study" class="btn btn-secondary btn-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
              Read the Case Study
            </router-link>
            <a href="#contact" class="btn btn-secondary btn-sm" @click.prevent="scrollTo('contact')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <div class="testimonial">
        <svg class="quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.194 11 15c0 1.933-1.567 3.5-3.5 3.5-1.196 0-2.31-.603-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.194 21 15c0 1.933-1.567 3.5-3.5 3.5-1.196 0-2.31-.603-2.917-1.179z"/>
        </svg>
        <blockquote>
          <p>He's doing an incredible job both in terms of technical and leadership ability. Through hard work and initiative, he's made this a reality far sooner than any of us expected.</p>
        </blockquote>
        <div class="testimonial-author">
          <span class="author-name">Staff Engineer</span>
          <span class="author-title">Enterprise SaaS Company</span>
        </div>
      </div>

      <div class="tech-stack">
        <span class="stack-label mono">Migration Coverage</span>
        <div class="stack-items">
          <div class="stack-item">
            <span class="stack-from mono">Vue 2</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">Vue 3</span>
          </div>
          <div class="stack-item">
            <span class="stack-from mono">Options API</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">Composition API</span>
          </div>
          <div class="stack-item">
            <span class="stack-from mono">Vuetify 2</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">Vuetify 3</span>
          </div>
          <div class="stack-item">
            <span class="stack-from mono">Vuex</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">Pinia</span>
          </div>
          <div class="stack-item">
            <span class="stack-from mono">Vue CLI</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            <span class="stack-to mono">Vite</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-card {
  max-width: 720px;
  margin: 0 auto 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 36px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 20px;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid var(--accent-border);
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


.testimonial {
  max-width: 720px;
  margin: 0 auto 32px;
  padding: 36px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 20px;
  text-align: center;
}

.quote-icon {
  color: var(--accent);
  opacity: 0.3;
  margin-bottom: 16px;
}

.testimonial blockquote {
  margin: 0;
}

.testimonial blockquote p {
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.8;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.author-title {
  font-size: 0.85rem;
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
  .stack-items {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 375px) {
  .about-card {
    padding: 24px 20px;
  }

  .tech-stack {
    padding: 24px 16px;
  }

  .stack-item {
    padding: 8px 12px;
    font-size: 0.8rem;
    width: 100%;
    justify-content: center;
  }
}
</style>
