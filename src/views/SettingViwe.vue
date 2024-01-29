<template>
    <section  class=" mt-2 "> 
    <div class="container py-3">
        <div class="rounded-3 question-comp shadow-sm py-5 px-3">
           <h4 class="text-muted">Setting</h4>
           <hr>
           <div class="container ">

            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2 " for="usernameSetting"> Username</label>
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="handleSetting('username')" role="switch" :checked="formSetting.username" id="usernameSetting">
            </div>
            </div>

            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2 " for="PasswordSetting"> Password</label>
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="handleSetting('password')" role="switch" :checked="formSetting.password" id="PasswordSetting">
            </div>
          </div>
          <input v-if="formSetting.password" placeholder="Password" class="form-control " @input="validatePassword" v-model="formSetting.passwordValue" type="text" required>
          <span v-if="formSetting.password" class="text-sm text-danger">{{ formSetting.passwordError }}</span>
            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2 " for="isOnceSetting"> Take the exam only once</label>
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="handleSetting('isOnce')" role="switch" :checked="formSetting.isOnce" id="isOnceSetting" >
            </div>
            </div>
            
            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2  d-block" for="timeOutSetting">Take The Exam Any Time</label>
            
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="handleSetting('anyTime')" role="switch"  :checked="formSetting.anyTime"  id="timeOutSetting">
            </div>
            </div>

            <div v-if="formSetting.anyTime">
              <label for="">Exam Duration (Minutes)</label>
              <input class="form-control" type="Number" v-model="formSetting.duration">
            </div>


            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2  d-block" for="timeOutSetting">Take The Exam At A Specific Time</label>
            
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="handleSetting('specificTime')" :checked="formSetting.specificTime"  role="switch" id="timeOutSetting">
            </div>
            </div>
            <div v-if="formSetting.specificTime" class="row">
              <div class="col-md-4 mt-3 mt-md-1">
                <label for="">Date</label>
                <input class="form-control" type="date"  v-model="formSetting.examTime.date">
              </div>
              <div class="col-md-4  mt-3 mt-md-1">
                <label for="">From</label>
                <input class="form-control" type="time"  v-model="formSetting.examTime.from">
              </div>
              <div class="col-md-4  mt-3 mt-md-1">
                <label for="">To</label>
                <input class="form-control" type="time"  v-model="formSetting.examTime.to">
              </div>
            </div>

           </div>
        </div>
    
    </div>
  </section>
</template>

<script>
import { formStore } from '@/stores/formStore';
import { mapState , mapActions } from 'pinia';

    export default {
        computed:{
           ...mapState(formStore, ['formSetting'])
        },
        methods:{
          ...mapActions(formStore,['handleSetting']),
          validatePassword() {
      // Reset password error on input
      this.passwordError = "";

      // Check if the Password switch is enabled and validate the password
      if (this.formSetting.password) {
        const password = this.formSetting.passwordValue.trim();

        if (!password) {
          this.formSetting.passwordError = "Password is required.";
        } else if (password.length < 8) {
          this.formSetting.passwordError = "Password must be at least 8 characters.";
        }
      }
    },
        }
    }
</script>

<style>

</style>
