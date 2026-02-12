<template>
  <section class="mt-16 text-center">
    <div class="mb-6">
      <h2 class="font-khmer-title text-gradient-gold text-xl mb-2">Calendar</h2>
      <div class="flex items-center justify-center gap-3 opacity-40">
        <div class="h-[1px] w-8 bg-yellow-600"></div>
        <span class="text-yellow-700 text-lg">❖ ❀ ❖</span>
        <div class="h-[1px] w-8 bg-yellow-600"></div>
      </div>
    </div>

    <div class="premium-card-frame mx-auto max-w-sm">
      <div class="glass-panel text-center">
        <div class="calendar-top text-xs uppercase tracking-[0.35em] text-yellow-700">
          Save the Date
        </div>
        <div class="calendar-grid mt-5">
          <div class="calendar-month">{{ month }}</div>
          <div class="calendar-day">{{ day }}</div>
          <div class="calendar-weekday">{{ weekday }}</div>
          <div class="calendar-year">{{ year }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  month: {
    type: String,
    default: 'June'
  },
  day: {
    type: String,
    default: '27'
  },
  weekday: {
    type: String,
    default: 'Saturday'
  },
  year: {
    type: String,
    default: '2026'
  }
})
</script>

<style scoped>
.calendar-grid {
  display: grid;
  gap: 6px;
}

.calendar-top {
  letter-spacing: 0.35em;
}

.calendar-month {
  font-size: 1rem;
  color: #8a6d3b;
  font-weight: 600;
  text-transform: uppercase;
}

.calendar-day {
  font-size: 4rem;
  line-height: 1;
  font-weight: 700;
  color: #bf953f;
  text-shadow: 0 6px 18px rgba(191, 149, 63, 0.25);
}

.calendar-weekday {
  font-size: 1rem;
  color: #5d4037;
  font-weight: 600;
}

.calendar-year {
  font-size: 0.9rem;
  color: #7c6a53;
  letter-spacing: 0.2em;
}
</style>
