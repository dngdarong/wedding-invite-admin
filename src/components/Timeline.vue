<template>
  <section class="mt-16 text-center">
    <!-- Section Header -->
    <div class="mb-6">
      <h2 class="font-khmer-title text-gradient-gold text-xl mb-2">
        កម្មវិធីមង្គលការ
      </h2>
      <div class="flex items-center justify-center gap-3 opacity-40">
        <div class="h-[1px] w-8 bg-yellow-600"></div>
        <span class="text-yellow-700 text-lg">❖ ❀ ❖</span>
        <div class="h-[1px] w-8 bg-yellow-600"></div>
      </div>
    </div>

    <!-- Timeline Card -->
    <div class="timeline-card mx-auto max-w-sm">
      <div class="p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm text-left">
        <div class="timeline-container relative pl-8 border-l-2 border-yellow-600/30">
          <div v-for="(item, index) in events" :key="index" class="timeline-item relative mb-8 last:mb-0">
            <!-- Lotus Marker -->
            <div class="absolute -left-[43px] top-1">
              <svg class="lotus w-6 h-6" viewBox="0 0 100 100">
                <path fill="#bf953f" d="M50 15 C60 35,80 45,50 85 C20 45,40 35,50 15Z"/>
              </svg>
            </div>
            
            <h3 class="font-khmer-body font-bold text-yellow-800 text-sm mb-1">
              {{ item.time }}
            </h3>
            <p class="font-khmer-body text-gray-700 text-base">
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const events = [
  { time: "08:00 ព្រឹក", text: "ទទួលភ្ញៀវកិត្តិយស" },
  { time: "09:00 ព្រឹក", text: "ពិធីសំពះផ្ទឹម" },
  { time: "12:00 ថ្ងៃត្រង់", text: "អាហារថ្ងៃត្រង់" },
  { time: "18:00 ល្ងាច", text: "ពិធីលៀងអាពាហ៍ពិពាហ៍" }
]
</script>

<style scoped>
/* Typography Mapping - Consistent with theme */
.font-khmer-title { font-family: 'Moul', cursive; }
.font-khmer-body { font-family: 'Battambang', sans-serif; }

/* Text Gradient for Titles */
.text-gradient-gold {
  background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Timeline card with the gold gradient "frame" */
.timeline-card {
  position: relative;
  padding: 8px;
  background: linear-gradient(135deg, #d4af37 0%, #fcf6ba 50%, #d4af37 100%);
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(184, 137, 0, 0.2);
}

/* Lotus Glow and Floating Animation */
.lotus {
  filter: drop-shadow(0 0 4px rgba(191, 149, 63, 0.4));
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.15); opacity: 1; filter: drop-shadow(0 0 8px rgba(191, 149, 63, 0.6)); }
}
</style>