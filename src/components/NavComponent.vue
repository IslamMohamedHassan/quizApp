<template>
  <nav class="bg-white position-fixed w-100 top-0 start-0 end-0 border-bottom border-1 z-3 shadow-sm">
    <div class="container">
        <div class="d-flex justify-content-center   pt-5 pb-1 position-relative">
            <router-link class="px-2" to="/">HOME</router-link>
            <router-link class="px-2" to="quiz">Quiz</router-link>
            <router-link class="px-2" to="setting">Settings</router-link>
            <div class="position-absolute end-0">
                <h6 class="">total Points : {{ totalPoints }}</h6>
            </div>
        </div>
    </div>
  </nav>
  <div class="my-5 pt-3"></div>
</template>

<script>
import { formStore } from '@/stores/formStore';
import { mapState } from 'pinia';
import { RouterLink } from 'vue-router';


    export default {
      components:{
        RouterLink
      },
      computed:{
        ...mapState(formStore,['totalPoints'])
      }
    }
</script>

<style>

</style>