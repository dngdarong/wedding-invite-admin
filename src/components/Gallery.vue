<template>
  <section class="mt-16 text-center">
    <!-- Section Header -->
    <div class="mb-6">
      <h2 class="font-khmer-title text-gradient-gold text-xl mb-2">
        រូបភាពអនុស្សាវរីយ៍
      </h2>
      <div class="flex items-center justify-center gap-3 opacity-40">
        <div class="h-[1px] w-8 bg-yellow-600"></div>
        <span class="text-yellow-700 text-lg">❖ ❀ ❖</span>
        <div class="h-[1px] w-8 bg-yellow-600"></div>
      </div>
    </div>

    <!-- Gallery Card Container -->
    <div class="gallery-card-frame mx-auto max-w-sm lg:max-w-2xl">
      <div class="p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm">
        
        <!-- Masonry-style Grid -->
        <div class="grid grid-cols-2 gap-3">
          <div 
            v-for="(photo, i) in photos" 
            :key="i"
            :class="[
              'overflow-hidden rounded-xl shadow-md border border-white/50 transition-transform duration-500 hover:scale-[1.02]',
              i === 0 ? 'col-span-2 h-48' : 'h-32'
            ]"
          >
            <img 
              :src="photo" 
              class="w-full h-full object-cover"
              alt="Wedding memory"
            >
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const photos = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511285560982-1356c11d4606?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80"
]
</script>

<style scoped>
/* Typography Mapping */
.font-khmer-title { font-family: 'Moul', cursive; }

/* Text Gradient for Titles */
.text-gradient-gold {
  background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gallery card with the gold gradient "frame" */
.gallery-card-frame {
  position: relative;
  padding: 8px;
  background: linear-gradient(135deg, #d4af37 0%, #fcf6ba 50%, #d4af37 100%);
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(184, 137, 0, 0.2);
}

/* Image Hover Effect */
img {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-card-frame:hover img {
  transform: scale(1.05);
}
</style>