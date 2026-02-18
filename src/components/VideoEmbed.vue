<script setup>
import { ref } from 'vue'

const VIDEO_ID = 'uWn5zjGAPS0'
const playing = ref(false)

function play() {
  playing.value = true
}
</script>

<template>
  <section class="video-section reveal" aria-labelledby="video-heading">
    <div class="container">
      <div class="video-wrapper">
        <h2 id="video-heading" class="video-title">Still on Vue 2? <span class="text-gradient">Here's the Plan</span></h2>

        <div class="video-player">
          <div v-if="!playing" class="video-facade" @click="play" role="button" tabindex="0" aria-label="Play video" @keydown.enter="play">
            <img
              :src="`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`"
              :alt="'Video: why Vue 2 end of life matters and how I help teams migrate to Vue 3'"
              class="video-thumbnail"
              loading="lazy"
            />
            <div class="video-play-btn">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          </div>
          <iframe
            v-else
            :src="`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`"
            title="Why Vue 2 end of life matters and how I help teams migrate to Vue 3"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <p class="video-caption">
          2 minutes — the problem, the process, and how to get started.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-section {
  padding: 60px 0;
}

.video-wrapper {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.video-title {
  margin-bottom: 24px;
}

.video-player {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-tertiary);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
}

.video-facade {
  position: absolute;
  inset: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-play-btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  transition: transform 0.2s ease, background 0.2s ease;
}

.video-facade:hover .video-play-btn {
  transform: scale(1.1);
  background: rgba(66, 184, 131, 0.9);
}

.video-player iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.video-caption {
  margin-top: 16px;
  font-size: 0.9rem;
  color: var(--text-tertiary);
}

@media (max-width: 640px) {
  .video-play-btn {
    width: 56px;
    height: 56px;
  }

  .video-play-btn svg {
    width: 36px;
    height: 36px;
  }
}
</style>
