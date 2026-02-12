<template>
  <div class="min-h-screen px-5 py-10 admin-bg">
    <div class="mx-auto max-w-3xl admin-container">
      <header class="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-khmer-title text-gradient-gold">Admin Dashboard</h1>
          <p class="text-sm text-yellow-800/70">RSVP list</p>
        </div>
        <button
          v-if="user"
          class="btn-gold px-4 py-2"
          @click="logout"
        >
          Sign out
        </button>
      </header>

      <section v-if="!user" class="premium-card-frame">
        <div class="glass-panel">
          <h2 class="text-lg font-semibold text-yellow-900 mb-4">Admin sign in</h2>
          <div class="space-y-3">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full wedding-input"
            >
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full wedding-input"
            >
            <button
              class="btn-gold w-full"
              :disabled="loading"
              @click="login"
            >
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
          <p v-if="error" class="mt-3 text-red-600 text-sm">{{ error }}</p>
        </div>
      </section>

      <section v-else class="space-y-4">
        <div class="premium-card-frame">
          <div class="glass-panel flex items-center justify-between">
            <div>
              <p class="text-sm text-yellow-800/70">Total RSVPs</p>
              <p class="text-2xl font-semibold text-yellow-900">{{ total }}</p>
            </div>
            <div>
              <p class="text-sm text-yellow-800/70">Total Messages</p>
              <p class="text-2xl font-semibold text-yellow-900">{{ totalMessages }}</p>
            </div>
            <div class="text-right text-xs text-yellow-800/70">
              Signed in as<br>
              <span class="font-semibold text-yellow-900">{{ user.email }}</span>
            </div>
          </div>
        </div>

        <div class="premium-card-frame">
          <div class="glass-panel">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-yellow-900">RSVP Entries</h2>
              <button class="text-sm text-yellow-900/80 hover:text-yellow-900" @click="refresh">
                Refresh
              </button>
            </div>

            <div v-if="rsvps.length === 0" class="text-sm text-yellow-800/70">
              No RSVPs yet.
            </div>

            <div v-else class="table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Attendance</th>
                    <th class="text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in rsvps" :key="item.id">
                    <td data-label="Name" class="font-semibold text-yellow-900">{{ item.name || 'Unknown' }}</td>
                    <td data-label="Attendance" class="text-xs text-yellow-800/80">{{ item.attendance || '-' }}</td>
                    <td data-label="Time" class="text-right text-xs text-yellow-800/70">{{ formatTime(item.time) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="premium-card-frame">
          <div class="glass-panel">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-yellow-900">Messages</h2>
              <button class="text-sm text-yellow-900/80 hover:text-yellow-900" @click="refresh">
                Refresh
              </button>
            </div>

            <div v-if="messages.length === 0" class="text-sm text-yellow-800/70">
              No messages yet.
            </div>

            <div v-else class="table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Message</th>
                    <th class="text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in messages" :key="item.id">
                    <td data-label="Name" class="font-semibold text-yellow-900">{{ item.name || 'Unknown' }}</td>
                    <td data-label="Message" class="text-sm text-yellow-900/90 message-text message-cell">{{ item.text || '-' }}</td>
                    <td data-label="Time" class="text-right text-xs text-yellow-800/70">{{ formatTime(item.time) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const user = ref(null)
const rsvps = ref([])
const messages = ref([])

let unsubscribe = null
let unsubscribeMessages = null
let unsubAuth = null

const total = computed(() => rsvps.value.length)
const totalMessages = computed(() => messages.value.length)

function formatTime(value) {
  if (!value) return '-'
  try {
    return new Date(value).toLocaleString()
  } catch {
    return '-'
  }
}

function startListening() {
  if (unsubscribe || unsubscribeMessages) return

  const rsvpQuery = query(collection(db, 'rsvp'), orderBy('time', 'desc'))
  unsubscribe = onSnapshot(
    rsvpQuery,
    (snap) => {
      rsvps.value = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
    },
    (err) => {
      error.value = err.message || 'Failed to load RSVPs.'
    }
  )

  const messageQuery = query(collection(db, 'messages'), orderBy('time', 'desc'))
  unsubscribeMessages = onSnapshot(
    messageQuery,
    (snap) => {
      messages.value = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
    },
    (err) => {
      error.value = err.message || 'Failed to load messages.'
    }
  )
}

function stopListening() {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
  if (unsubscribeMessages) {
    unsubscribeMessages()
    unsubscribeMessages = null
  }
  rsvps.value = []
  messages.value = []
}

async function login() {
  error.value = ''
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
  } catch (err) {
    error.value = err?.message || 'Sign in failed.'
  } finally {
    loading.value = false
  }
}

async function logout() {
  await signOut(auth)
}

function refresh() {
  stopListening()
  if (user.value) startListening()
}

onMounted(() => {
  unsubAuth = onAuthStateChanged(auth, (u) => {
    user.value = u
    if (u) {
      startListening()
    } else {
      stopListening()
    }
  })
})

onBeforeUnmount(() => {
  if (unsubAuth) unsubAuth()
  stopListening()
})
</script>

<style scoped>
.admin-bg {
  background: linear-gradient(120deg, #fffaf3, #fff1dd 55%, #ffe6c7);
}

.table-wrap {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 12px;
  overflow: hidden;
}

.admin-table thead th {
  text-align: left;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(122, 74, 0, 0.7);
  background: rgba(255, 255, 255, 0.75);
  padding: 10px 12px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.admin-table tbody td {
  padding: 12px;
  vertical-align: top;
  border-bottom: 1px solid rgba(212, 175, 55, 0.12);
}

.admin-table tbody tr:last-child td {
  border-bottom: none;
}

.message-text {
  margin-top: 4px;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
}

@media (max-width: 640px) {
  .admin-table thead {
    display: none;
  }

  .admin-table tbody tr {
    display: block;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  }

  .admin-table tbody td {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 0;
    border-bottom: 1px dashed rgba(212, 175, 55, 0.15);
  }

  .admin-table tbody td::before {
    content: attr(data-label);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(122, 74, 0, 0.7);
  }

  .admin-table tbody tr td:last-child {
    border-bottom: none;
  }

  .message-cell {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 420px) {
  .admin-table tbody tr {
    padding: 8px 10px;
  }

  .admin-table tbody td {
    padding: 4px 0;
  }

  .admin-table tbody td::before {
    font-size: 0.65rem;
  }

  .admin-table {
    font-size: 0.9rem;
  }
}

@media (min-width: 1024px) {
  .admin-container {
    max-width: 72rem;
  }

  .admin-table thead th,
  .admin-table tbody td {
    padding: 14px 16px;
  }
}
</style>
