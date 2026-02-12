<template>
<section class="mt-20 text-center">

  <!-- Title -->
  <h2 class="font-khmer text-2xl mb-3 bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 bg-clip-text text-transparent">
    ការបញ្ជាក់ចូលរួម
  </h2>

  <div class="text-lg text-yellow-500 mb-4">❖ ❀ ❖</div>

  <!-- RSVP Card -->
  <div class="border-4 border-double border-yellow-500 p-5 rounded-3xl bg-gradient-to-b from-orange-50 to-yellow-50 shadow-2xl max-w-md mx-auto">

    <input
      v-model="name"
      placeholder="ឈ្មោះភ្ញៀវកិត្តិយស"
      class="w-full border-2 border-yellow-300 px-3 py-2 my-2 rounded-lg bg-white outline-none transition-all focus:border-yellow-600 focus:shadow-md"
    >

    <select v-model="att" class="w-full border-2 border-yellow-300 px-3 py-2 my-2 rounded-lg bg-white outline-none transition-all focus:border-yellow-600 focus:shadow-md">
      <option disabled value="">ជ្រើសរើសស្ថានភាព</option>
      <option>នឹងចូលរួមដោយរីករាយ</option>
      <option>សូមអភ័យទោស មិនអាចចូលរួមបាន</option>
    </select>

    <button @click="send" class="w-full bg-gradient-to-r from-yellow-700 to-yellow-900 text-white px-3 py-3 rounded-lg tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-semibold mt-2">
      បញ្ជាក់ការចូលរួម
    </button>

    <p v-if="status" class="mt-3 text-yellow-800 font-bold">
      {{ status }}
    </p>

  </div>

</section>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const name = ref('')
const att = ref('')
const status = ref('')

const send = async ()=>{
  if(!name.value || !att.value) return

  await addDoc(collection(db,"rsvp"),{
    name:name.value,
    attendance:att.value,
    time:Date.now()
  })

  status.value = "សូមអរគុណសម្រាប់ការឆ្លើយតប 💛"
  name.value = ''
  att.value = ''
}
</script>

<style scoped>

/* Gold title */
.gold{
background:linear-gradient(90deg,#b88900,#ffe08a,#b88900);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

/* Ornament */
.ornament{
font-size:18px;
color:#d4af37;
margin-bottom:14px;
}

/* RSVP card */
.rsvp-card{
border:4px double #d4af37;
padding:20px;
border-radius:18px;
background:linear-gradient(#fff9f2,#ffeed8);
box-shadow:0 20px 40px rgba(0,0,0,.15);
}

/* Inputs */
.input{
width:100%;
border:2px solid #e7c97a;
padding:12px;
margin:8px 0;
border-radius:8px;
background:white;
outline:none;
transition:.2s;
}

.input:focus{
border-color:#b88900;
box-shadow:0 0 8px rgba(212,175,55,.4);
}

/* Button */
.btn{
background:linear-gradient(135deg,#b88900,#7a5600);
color:white;
padding:12px;
border-radius:8px;
letter-spacing:.05em;
box-shadow:0 8px 16px rgba(0,0,0,.2);
transition:.25s;
}

.btn:hover{
transform:translateY(-2px);
box-shadow:0 12px 20px rgba(0,0,0,.25);
}

/* Status message */
.status{
margin-top:12px;
color:#8b6b00;
font-weight:bold;
}

</style>
