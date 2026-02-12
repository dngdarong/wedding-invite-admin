<template>
  <div class="app-wrapper min-h-screen relative overflow-hidden">

    <!-- Curtain -->
    <div v-if="showCurtain" class="curtain-container">
      <div class="panel left"></div>
      <div class="panel right"></div>

      <!-- Emblem -->
      <div class="emblem-container">
        <div class="emblem">❖</div>
      </div>
    </div>

    <!-- Sparkles -->
    <div v-if="showSparkle" class="sparkle-layer">
      <span
        v-for="(s, i) in sparkles"
        :key="i"
        class="sparkle"
        :style="{
          left: s.x + '%',
          top: s.y + '%',
          animationDelay: s.delay + 's'
        }"
      />
    </div>

    <!-- Main Content -->
    <main class="app-content relative z-10 mx-auto max-w-lg min-h-screen home-container">
      <Header />
      <div class="space-y-4 pb-20">
        <Countdown />
        <Location />
        <Calendar />
        <Timeline />
        <Gallery />
        <Hashtag />
        <RSVP />
        <Wishes />
      </div>

      <footer class="text-center pb-12 opacity-40">
        <div class="font-khmer-title text-yellow-800 text-sm">សូមអរគុណ</div>
        <div class="text-xs text-yellow-700 mt-2">❖ ❀ ❖</div>
      </footer>
    </main>

    <audio
      ref="audioRef"
      :src="audioUrl"
      autoplay
      loop
      playsinline
    />

    <div v-if="showAudioGate" class="audio-gate">
      <div v-if="showButterfly" class="butterfly" aria-hidden="true"></div>
      <div v-if="showStar" class="star-burst" aria-hidden="true">*</div>
      <button class="audio-gate-btn" @click="startAudio">
        Tap to Enter
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Header from '../components/Header.vue'
import Countdown from '../components/Countdown.vue'
import Location from '../components/Location.vue'
import Calendar from '../components/Calendar.vue'
import Timeline from '../components/Timeline.vue'
import Gallery from '../components/Gallery.vue'
import RSVP from '../components/RSVP.vue'
import Wishes from '../components/Wishes.vue'
import Hashtag from '../components/Hashtag.vue'

const showCurtain = ref(true)
const showSparkle = ref(false)
const sparkles = ref([])
const audioRef = ref(null)
const audioUrl = new URL('../assets/wealth-of-love.mp3', import.meta.url).href
const showAudioGate = ref(true)
const showButterfly = ref(false)
const showStar = ref(false)

function createSparkles() {
  sparkles.value = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 1.5
  }))
}

async function tryPlayAudio() {
  if (!audioRef.value) return
  try {
    await audioRef.value.play()
    return true
  } catch {
    return false
  }
}

async function startAudio() {
  showButterfly.value = true
  showStar.value = true
  await tryPlayAudio()
  setTimeout(() => {
    showButterfly.value = false
    showStar.value = false
    showAudioGate.value = false
  }, 2200)
}

onMounted(() => {
  createSparkles()
  tryPlayAudio().then((ok) => {
    if (ok) showAudioGate.value = false
  })

  // sparkles appear after curtain opens
  setTimeout(() => {
    showSparkle.value = true
  }, 4800)

  // remove curtain
  setTimeout(() => {
    showCurtain.value = false
  }, 5200)

  // remove sparkles
  setTimeout(() => {
    showSparkle.value = false
  }, 9000)
})
</script>

<style>
/* Khmer Fonts */
:root{
  --gold:#bf953f;
  --cream:#fffaf3;
}

body{
  margin:0;
  background:var(--cream);
}

.font-khmer-title{font-family:'Moul',cursive}
.font-khmer-body{font-family:'Battambang',sans-serif}

/* App background */
.app-content{
  background:linear-gradient(to bottom,var(--cream),#ffe7cc);
  box-shadow:0 0 100px rgba(184,137,0,.05);
  padding:0 20px;
}

/* Curtain */
.curtain-container{
  position:fixed;
  inset:0;
  z-index:9999;
  display:flex;
  pointer-events:none;
}

.panel{
  width:50%;
  height:100%;
  background:linear-gradient(135deg,#ffffff,#f0ece3);
  box-shadow:inset 0 0 50px rgba(184,137,0,.15);
}

.panel.left{
  animation:openLeft 4.5s cubic-bezier(.77,0,.175,1) forwards;
}

.panel.right{
  animation:openRight 4.5s cubic-bezier(.77,0,.175,1) forwards;
}

@keyframes openLeft{
  0%{transform:translateX(0)}
  40%{transform:translateX(0)}
  100%{transform:translateX(-100%)}
}

@keyframes openRight{
  0%{transform:translateX(0)}
  40%{transform:translateX(0)}
  100%{transform:translateX(100%)}
}

/* Emblem */
.emblem-container{
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  animation:emblemFade 3.2s ease forwards;
}

.emblem{
  font-size:4rem;
  background:linear-gradient(135deg,#bf953f,#fcf6ba,#aa771c);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 4px 10px rgba(0,0,0,.1));
}

@keyframes emblemFade{
  0%{opacity:0; transform:scale(.7)}
  30%{opacity:1; transform:scale(1)}
  70%{opacity:1}
  100%{opacity:0; transform:scale(1.4)}
}

/* Sparkles */
.sparkle-layer{
  position:fixed;
  inset:0;
  z-index:9998;
  pointer-events:none;
}

.sparkle{
  position:absolute;
  width:6px;
  height:6px;
  background:radial-gradient(circle,#fff,#ffe9a8);
  border-radius:50%;
  opacity:0;
  animation:sparkleAnim 3.5s ease forwards;
  filter:drop-shadow(0 0 6px rgba(191,149,63,.8));
}

@keyframes sparkleAnim{
  0%{opacity:0; transform:scale(0)}
  50%{opacity:1; transform:scale(1.8)}
  100%{opacity:0; transform:scale(0)}
}

@media (min-width: 1024px) {
  .home-container {
    max-width: 60rem;
  }
}

.audio-gate{
  position:fixed;
  inset:0;
  z-index:10000;
  background:radial-gradient(circle at top,#fff7ea,#f8ead3 55%,#f1dec3 100%);
  display:flex;
  align-items:center;
  justify-content:center;
}

.audio-gate-btn{
  background:linear-gradient(135deg,#bf953f,#8a6d3b);
  color:#fff;
  border:none;
  padding:14px 22px;
  border-radius:999px;
  font-size:13px;
  letter-spacing:.1em;
  text-transform:uppercase;
  box-shadow:0 10px 22px rgba(138,109,59,.25);
}

.audio-gate-btn:active{
  transform:translateY(1px);
}

.butterfly{
  position:absolute;
  left:20%;
  bottom:18%;
  width:34px;
  height:24px;
  border-radius:50%;
  background:
    radial-gradient(circle at 30% 50%, #f8c9d6 0 60%, transparent 61%),
    radial-gradient(circle at 70% 50%, #f8c9d6 0 60%, transparent 61%),
    radial-gradient(circle at 50% 60%, #c58c7a 0 30%, transparent 31%);
  filter:drop-shadow(0 4px 10px rgba(138,109,59,.2));
  animation:butterflyFly 2.2s ease forwards;
}

@keyframes butterflyFly{
  0%{transform:translate(0,0) scale(.7); opacity:0}
  10%{opacity:1}
  40%{transform:translate(120px,-120px) scale(1)}
  70%{transform:translate(240px,-220px) scale(.9)}
  100%{transform:translate(320px,-300px) scale(.6); opacity:0}
}

.star-burst{
  position:absolute;
  right:18%;
  top:18%;
  font-size:48px;
  color:#ffd36b;
  text-shadow:0 0 16px rgba(255,211,107,.7);
  animation:starPop 1.8s ease forwards;
}

@keyframes starPop{
  0%{transform:scale(.4) rotate(0deg); opacity:0}
  30%{transform:scale(1.2) rotate(20deg); opacity:1}
  100%{transform:scale(.9) rotate(40deg); opacity:0}
}

</style>

