<template>
  <section class="mt-12 text-center">
    <h2 class="font-khmer-title text-gradient-gold text-xl mb-2">
      រាប់ថយក្រោយ
    </h2>
    <div class="flex items-center justify-center gap-3 opacity-40 mb-5">
      <div class="h-[1px] w-8 bg-yellow-600"></div>
      <span class="text-yellow-700 text-lg">❖ ❀ ❖</span>
      <div class="h-[1px] w-8 bg-yellow-600"></div>
    </div>

    <div class="premium-card-frame mx-auto max-w-sm">
      <div class="glass-panel">
        <div class="countdown-grid">
          <div class="countdown-item">
            <div class="countdown-value">{{ timeLeft.days }}</div>
            <div class="countdown-label">ថ្ងៃ</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-value">{{ timeLeft.hours }}</div>
            <div class="countdown-label">ម៉ោង</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-value">{{ timeLeft.minutes }}</div>
            <div class="countdown-label">នាទី</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-value">{{ timeLeft.seconds }}</div>
            <div class="countdown-label">វិនាទី</div>
          </div>
        </div>
        <p class="mt-4 text-xs text-yellow-800/70">
          27 មិថុនា 2026 • 8:00 AM (GMT+7)
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const target = new Date('2026-06-27T08:00:00+07:00').getTime()
const timeLeft = ref({ days: '0', hours: '00', minutes: '00', seconds: '00' })
let timer = null

function pad(value) {
  return String(value).padStart(2, '0')
}

function updateCountdown() {
  const now = Date.now()
  const diff = Math.max(target - now, 0)
  const totalSeconds = Math.floor(diff / 1000)

  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  timeLeft.value = {
    days: String(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds)
  }
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.countdown-item {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 14px;
  padding: 10px 8px;
}

.countdown-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #8a6d3b;
}

.countdown-label {
  margin-top: 4px;
  font-size: 0.75rem;
  color: rgba(93, 64, 55, 0.8);
}

@media (max-width: 420px) {
  .countdown-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
