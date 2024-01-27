<template>
    <section  class=" mt-2 "> 
    <div class="container py-3">
        <div class="rounded-3 question-comp shadow-sm py-5 px-3">
           <h4 class="text-muted">Setting</h4>
           <hr>
           <div class="container ">
            <!-- switches -->
            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2 ms-3" for="flexSwitchCheckDefault"> Username</label>
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="requiredSwitch()" role="switch" id="flexSwitchCheckDefault">
            </div>
            </div>
            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2 ms-3" for="flexSwitchCheckDefault"> Password</label>
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="requiredSwitch()" role="switch" id="flexSwitchCheckDefault">
            </div>
            </div>
            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2 ms-3" for="flexSwitchCheckDefault"> Take the exam only once</label>
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="requiredSwitch()" role="switch" id="flexSwitchCheckDefault">
            </div>
            </div>
            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2 ms-3 d-block" for="flexSwitchCheckDefault"> Time Out</label>
            
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="requiredSwitch()" role="switch" id="flexSwitchCheckDefault">
            </div>
            </div>
            <div class="d-flex align-items-center justify-content-between">
            <label class="form-check-label me-2 ms-3" for="flexSwitchCheckDefault"> Username</label>
            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="requiredSwitch()" role="switch" id="flexSwitchCheckDefault">
            </div>
            </div>
           </div>
        </div>
    
    </div>
  </section>
</template>

<script>
    export default {
        
    }
</script>

<style>

</style>