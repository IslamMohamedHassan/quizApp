<template >
  <section :id="`comp${componentIndex}`"  @click="selectElement(componentIndex)"    @focusin="selectElement(componentIndex)"  class=" rounded-3 question-comp mt-2 shadow-sm"
  :class="{ 'focused': getContainerMultipleChoiceOption[componentIndex].isSelected  }">
    <div class="border-0 bg-transparent text-secondary d-flex d-block w-100 justify-content-center">
      <span   style="cursor: move;" class="handle">: : :</span>
    </div>
    <div  class="container py-3">

      <!-- start questions row  -->
      <div  class="form-wrapper row justify-content-between flex-wrap align-items-start">
        <div  class="col-xl-7 col-lg-6 col-md-12 col-sm-12">
          <Tiptap class="w-100"  :title="'question'"  :id ="componentIndex"  />
        </div>
        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2">
          <div class="">
            <label for="up-img"><i class="fa fa-image  image-label"></i></label>
            <input style="display: none;" type="file" id="up-img"  @change="event => handleUploadImg(componentIndex, event ,'Question')">
          </div>
        </div>
        <div  class="col-xl-4  col-lg-5   col-md-9 col-sm-10 col-10  h-50px mt-1">
          <div class="dropdown w-100">
            <button  class="btn  drop-down-btn fw-bold   dropdown-toggle w-100 d-flex align-items-center justify-content-evenly" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="d-block" v-html="getContainerMultipleChoiceOption[componentIndex].selectedIcon"></span>
              <span class="d-block font-size-16">{{ getContainerMultipleChoiceOption[componentIndex].selectedValue }}</span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li style="cursor:pointer" v-for="option in optionValues" :key="option.value">
                <a class="dropdown-item d-flex align-items-center" @click="updateSelectedValue(option.value,option.icon,componentIndex)">
                  <span class="d-block  me-2" v-html="option.icon"></span>
                  <span class="d-block font-size-20">   {{ option.label }}</span> 
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
       <!-- End questions row  -->

      <!-- Start row of multi choice and multi Checkboxes -->
      <div class="row align-items-center" v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Multiple Choice' || getContainerMultipleChoiceOption[componentIndex].selectedValue == 'Checkboxes' || getContainerMultipleChoiceOption[componentIndex].selectedValue == 'Dropdown'">
        <div  @mouseenter="option.showImgIcon = true"  @mouseleave="option.showImgIcon = false"   v-for="(option,i) in  data.data" :key="i" >
          <div class="d-flex align-items-center justify-content-between" v-if="option.placeholder !== 'Row' && option.placeholder !== 'Column'">
          <div>
            <input v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Multiple Choice'" type='radio'  class="form-check-input custom-radio"  disabled>
            <input v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue === 'Checkboxes'" type="checkbox"  class="form-check-input custom-radio"  disabled> 
          </div>
          <div class="w-100 py-2">
            <input @focusin="option.showImgAltIcon = true"  @focusout="option.showImgAltIcon = false" type="text" v-model="option.value" class="answer-title w-100"  :placeholder="(option.placeholder ==='Option') ? option.placeholder  + ' '+ option.label : option.placeholder">
          </div>
          <div  v-if="getContainerMultipleChoiceOption[componentIndex].selectedValue !== 'Dropdown'" class=" ms-3">
            <label  v-show="option.showImgIcon || option.showImgAltIcon"   :for="option.label"><i class=" fa fa-image image-label"></i></label>
            <input style="display: none;" type="file"  :id="option.label"  @change="event => handleUploadImg(componentIndex, event, 'Answer', i)" >

          </div>
          <div class="ms-3 d-flex">
            <button v-if="getContainerMultipleChoiceOption[componentIndex].regularOptions.length !== 1 "  @click="removeOption(option.id,componentIndex)" class="border-0 bg-transparent fw-bolder fs-6"><i class="fa-solid fa-x fw-bolder text-secondary"></i></button>
          </div>
        </div>
        </div>
        <div class="col-12 py-3">
          <button class=" border-0 bg-transparent add-field-btn" @click="addOption('Option',componentIndex)">Add Option</button>
        </div>
       
      </div> 
      <!-- End row of multi choice and multi Checkboxes -->
      <hr class="my-2">
      <!--  -->
      <div class="row">
        <div class="col-lg-12 d-flex justify-content-end">
          <div class="me-3 btn-icon">
            <button class="border-0 bg-transparent" @click="duplicateComponent(componentIndex)"><i class="fa-regular fa-copy"></i></button>
          </div>
          <div class="me-3 btn-icon">
            <button  :disabled="getContainerMultipleChoiceOption.length === 1"   class="border-0 bg-transparent" @click="removeComponent(componentIndex)"><i class="fa-regular fa-trash-can "></i></button>
          </div>
          <div class="d-flex align-items-center border-start border-3">
            <label class="form-check-label me-2 ms-3" for="flexSwitchCheckDefault">Required</label>

            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="requiredSwitch(componentIndex)" role="switch" id="flexSwitchCheckDefault" :checked ="getContainerMultipleChoiceOption[componentIndex].required">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { formStore } from '@/stores/formStore';
import Tiptap from './Tiptap.vue';
import { mapActions, mapState } from 'pinia';

export default {

  components:{
    Tiptap,
  },
  computed: {
    ...mapState(formStore, ['isSelected','getContainerMultipleChoiceOption','count','fileTypes','optionValues']),
  },

  data() {
    return {
      modalData: {
      title: 'Default Title',
    },
   
    };
  },
  props: {
    componentIndex: {
      type: Number,
    },
    data: {
      type: Object,
    },
  },
  // watch the select box changes 
  
  methods: {
    ...mapActions(formStore, ['handleUploadImg','deselectElement','selectElement','requiredSwitch','removeComponent','updateSelectedValue','addOption','removeOption','resetOptionIdsAndLabels','getSelectedPlaceholder','handleDropdowns','duplicateComponent']),

    
    
  },
  

  
 
};
</script>

<style>

.question-comp{
  background-color: #fff;
  border: 1px solid #d9d9d9;
}
.drop-down-btn{
  background-color: #fff;
  border: 1px solid #d9d9d9 !important;
  padding: 10px 0 !important;
  border-radius: 5px !important;
  color: #202124 !important;
}
  .image-label{
    width: fit-content;
    padding: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  .btn-icon{
    width: fit-content;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
   
  }
  .btn-icon button{
    width: 100%; 
    display: block;
  }
  .btn-icon button i{ 
    font-size: 22px;

    color: #5f6368;
  }
  .btn-icon:hover{
    background-color: #f0f0f0 !important ;
    }
  .image-label:hover{
    background-color: #f0f0f0;
  }

  .image-label i {
    font-size: 22px;
    line-height: 30px;
    color: #5f6368;
    cursor: pointer;
  }
  i.image-label{
    font-size: 22px;
    line-height: 30px;
  }
  .form-switch .form-check-input{
    width: 50px !important;
    height: 25px !important;
  }
  .answer-title{
    border: none;
    outline: none;
    margin-left: 10px;
    height: 40px;
    font-size: 20px;
  }
  .answer-title:focus{
    background-color: #f0f0f0;
    border-bottom: 1px solid #7e7e81;
    transition: 200ms all  ease-in-out;
  }

  .custom-radio{
    width: 25px !important; /* Set the desired width */
    height: 25px !important; /* Set the desired height */
  }
  .add-field-btn:hover{
    text-decoration: underline;
  }
  .h-50px{
    height: 50px;
  }

  .focused {
  /* Add your styles for the focused class here */
  border-left: 10px solid #673ab7;
  transition: .2s all ease-in-out;
}
</style>
