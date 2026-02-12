<template>
  <section class="mt-16 text-center">
    <!-- Section Header -->
    <div class="mb-6">
      <h2 class="font-khmer-title text-gradient-gold text-xl mb-2">
        ទីតាំងពិធី
      </h2>
      <div class="flex items-center justify-center gap-3 opacity-40">
        <div class="h-[1px] w-8 bg-yellow-600"></div>
        <span class="text-yellow-700 text-lg">❖ ❀ ❖</span>
        <div class="h-[1px] w-8 bg-yellow-600"></div>
      </div>
    </div>

    <!-- Location Card -->
    <div class="location-card mx-auto max-w-sm">
      <div class="p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm">
        <p class="font-khmer-body text-gray-800 text-lg font-bold mb-2">
          សណ្ឋាគារ Rosewood Phnom Penh
        </p>
        <p class="font-khmer-body text-gray-600 text-sm leading-relaxed">
          ជាន់ទី៣៧ អគារ វឌ្ឍនៈ រាជធានីភ្នំពេញ
        </p>
      </div>
    </div>

    <!-- Maps Button -->
    <a
      href="https://maps.google.com/?q=Rosewood+Phnom+Penh"
      target="_blank"
      class="maps-btn mt-8 inline-flex items-center gap-2"
    >
      <span class="text-lg">📍</span>
      <span class="font-khmer-body font-bold uppercase tracking-wider">បើកក្នុង Google Maps</span>
    </a>
  </section>
</template>

<style scoped>
/* Typography Mapping - Shared with Header.vue */
.font-khmer-title { font-family: 'Moul', cursive; }
.font-khmer-body { font-family: 'Battambang', sans-serif; }

/* Text Gradient for Titles */
.text-gradient-gold {
  background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Location card styling with double border effect */
.location-card {
  position: relative;
  padding: 8px;
  background: linear-gradient(135deg, #d4af37 0%, #fcf6ba 50%, #d4af37 100%);
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(184, 137, 0, 0.2);
}

/* Elegant Button */
.maps-btn {
  background: linear-gradient(135deg, #bf953f 0%, #8a6d3b 100%);
  color: white;
  padding: 14px 28px;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(138, 109, 59, 0.4);
  transition: all 0.3s ease;
  text-decoration: none;
}

.maps-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(138, 109, 59, 0.5);
  filter: brightness(1.1);
}

.maps-btn:active {
  transform: translateY(-1px);
}
</style>