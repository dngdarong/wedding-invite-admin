<template>
  <div class="header-container text-center">
    
    <!-- Decorative Top Icon -->
    <div class="mb-6 animate-float">
      <svg class="w-12 h-12 mx-auto text-yellow-600/80" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>

    <!-- Title -->
    <p class="font-khmer-title text-yellow-800 text-sm tracking-widest mb-2 uppercase opacity-80">
      ពិធីរៀបអាពាហ៍ពិពាហ៍
    </p>
    <p class="font-khmer-body text-gray-500 text-xs mb-8">
      WEDDING INVITATION
    </p>

    <!-- Names -->
    <div class="space-y-2 mb-8">
      <h1 class="font-script text-7xl text-gradient-gold leading-tight">{{ bride }}</h1>
      <div class="flex items-center justify-center gap-4 opacity-60">
        <div class="h-[1px] w-12 bg-yellow-600"></div>
        <span class="font-script text-3xl text-yellow-700">&</span>
        <div class="h-[1px] w-12 bg-yellow-600"></div>
      </div>
      <h1 class="font-script text-7xl text-gradient-gold leading-tight">{{ groom }}</h1>
    </div>

    <!-- Date -->
    <div class="mb-10 relative z-10">
      <p class="font-khmer-body text-gray-800 text-lg font-bold">
        {{ date }}
      </p>
      <p class="font-khmer-body text-gray-500 text-sm mt-1">
        Save the Date
      </p>
    </div>

  </div>
</template>

<script setup>
defineProps({
  bride: {
    type: String,
    default: 'Emma'
  },
  groom: {
    type: String,
    default: 'Liam'
  },
  date: {
    type: String,
    default: 'ថ្ងៃសៅរ៍ ទី២៥ ខែមិថុនា ឆ្នាំ២០២៦'
  }
})
</script>

<style scoped>
/* Typography Mapping */
/* Ensure these fonts are imported in your main index.html or App.vue */
.font-script { font-family: 'Great Vibes', cursive; }
.font-khmer-title { font-family: 'Moul', cursive; }
.font-khmer-body { font-family: 'Battambang', sans-serif; }

/* Text Gradient for Names */
.text-gradient-gold {
  background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

/* Floating Animation */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
</style>