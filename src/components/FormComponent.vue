<template >
  <section :id="`comp${componentIndex}`"  @click="selectElement(componentIndex)"  @focusin="selectElement(componentIndex)"  class=" rounded-3 question-comp mt-2 shadow-sm"
  :class="{ 'focused': getFormList[componentIndex].isSelected  }"> 
    <div class="border-0 bg-transparent text-secondary d-flex d-block w-100 justify-content-center">
      <span   style="cursor: move;" class="handle">: : :</span>
    </div>
    <div  class="container py-3">

      <!-- start questions row  -->
      <div v-show="!getFormList[componentIndex].answerKeySelected"  class="form-wrapper row justify-content-between flex-wrap align-items-start">
        <div  class="col-xl-7 col-lg-6 col-md-12 col-sm-12">
          <Tiptap class="w-100"  :title="'question'"  :id ="componentIndex"  />
        </div>
        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2">
          <div class="">
            <label :for="`up-img${componentIndex}`"><i class="fa fa-image  image-label"></i></label>
            <input style="display: none;" type="file" :id="`up-img${componentIndex}`"  @change="event => handleUploadImg(componentIndex, event ,'Question')">
          </div>
        </div>
     
        <div  class="col-xl-4  col-lg-5   col-md-9 col-sm-10 col-10  h-50px mt-1">
          <div class="dropdown w-100">
            <button  class="btn  drop-down-btn fw-bold   dropdown-toggle w-100 d-flex align-items-center justify-content-evenly" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="d-block" v-html="getFormList[componentIndex].selectedIcon"></span>
              <span class="d-block font-size-16">{{ getFormList[componentIndex].selectedValue }}</span>
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
        <transition name="fade">
          <div v-if="getFormList[componentIndex].imageFileDataUrl" class="uploaded-image-wrapper col-4">
          <img   :src="getFormList[componentIndex].imageFileDataUrl" alt="Uploaded Image" class="uploaded-image">
          <button   @click="removeOptionImg(componentIndex,'Question')" class="border-0 bg-transparent fw-bolder fs-6 position-absolute"><i class="fa-solid fa-x fw-bolder  bg-secondary text-white p-2 rounded-3 "></i></button>
  
          </div>
        </transition>
      </div>
      <!-- End questions row  -->
      <!-- Start Choose correct answers   -->
      <div v-show="getFormList[componentIndex].answerKeySelected" class="fs-4 text-muted">
        <i class="fa-regular fa-square-check"></i> Choose correct answers:
        <hr>
        <div class="d-flex justify-content-between">
          <div>
            <p>{{ getFormList[componentIndex].questionValue}}</p> 
          </div>
          <div><input class="question-marks" min="0" v-model="getFormList[componentIndex].questionMark" @change="handleMarksChange(componentIndex)" type="number"> <span class="fs-6">Points</span></div>
        </div>
      </div>
      <!-- End Choose correct answers   -->

      <!-- Start row of multi choice and multi Checkboxes -->
      <div class="row align-items-center" v-if="getFormList[componentIndex].selectedValue === 'Choose' || getFormList[componentIndex].selectedValue == 'Checkboxes'">
        <div  @mouseenter="option.showImgIcon = true"  @mouseleave="option.showImgIcon = false"   v-for="(option,i) in  data.data" :key="i" >
          <div  class="d-flex align-items-center justify-content-between"  :class="{'bg-success' : option.isCorrect && getFormList[componentIndex].answerKeySelected}">
          <div>
            <input style="cursor: pointer;"  v-if="getFormList[componentIndex].selectedValue === 'Choose'" type='radio' @click="correctAnswer(componentIndex,i)" :checked="option.isCorrect"   name="multiChoice"  class="form-check-input custom-radio"  :disabled="!getFormList[componentIndex].answerKeySelected">
            <input v-if="getFormList[componentIndex].selectedValue === 'Checkboxes'" type="checkbox"  class="form-check-input custom-radio"  :disabled="!getFormList[componentIndex].answerKeySelected"> 
          </div>
          
          <div class=" flex-grow-1 py-2 position-relative">
            <input @focusin="option.showImgAltIcon = true"  @focusout="option.showImgAltIcon = false" type="text" v-model="option.value" class="answer-title w-100"  :placeholder="(option.placeholder ==='Option') ? option.placeholder  + ' '+ option.label : option.placeholder" :disabled="getFormList[componentIndex].answerKeySelected">
            <span v-if="option.isCorrect" class="position-absolute top-0 end-0">Correct</span> 
          </div>
          <div    v-if="!getFormList[componentIndex].answerKeySelected" class=" ms-3">
            <label  v-show="option.showImgIcon || option.showImgAltIcon"  :for="`answerImg${componentIndex}option${option.label}`"><i class=" fa fa-image image-label"></i></label>
            <input style="display: none;" type="file"  :id="`answerImg${componentIndex}option${option.label}`"   @change="event => handleUploadImg(componentIndex, event, 'Answer', i)" >

          </div>
          
          <div v-if="!getFormList[componentIndex].answerKeySelected" class="ms-3 d-flex">
            <button v-if="getFormList[componentIndex].regularOptions.length !== 1 "  @click="removeOption(option.id,componentIndex)" class="border-0 bg-transparent fw-bolder fs-6"><i class="fa-solid fa-x fw-bolder text-secondary"></i></button>
          </div>
        </div>
         <transition name="fade">
        <div v-if="getFormList[componentIndex].data[i].image" class="uploaded-image-wrapper border-1 border ">
          <img   :src="getFormList[componentIndex].data[i].image" alt="Uploaded Image" class="uploaded-image position-relative">
          <button   @click="removeOptionImg(componentIndex,i)" class="border-0 bg-transparent fw-bolder fs-6 position-absolute"><i class="fa-solid fa-x fw-bolder  bg-secondary text-white p-2 rounded-3 "></i></button>
        </div>
        </transition>
        </div>
        <div  v-if="!getFormList[componentIndex].answerKeySelected" class="col-12 pt-3">
          <button class=" border-0 bg-transparent add-field-btn" @click="addOption('Option',componentIndex)">Add Option</button>
        </div>
       
      </div> 

      <!-- true or false -->
      <div class="row mt-5 justify-content-evenly" v-if="getFormList[componentIndex].selectedValue === 'True Or False'">
        
       <div class="col-md-6 d-flex align-items-center">
         <input  class="form-check-input custom-radio mb-1" id="trueAnswer" type="radio" name="trueOrFalse">
         <label class="ps-2 fs-4" for="trueAnswer">True</label>
       </div>
       <div class="col-md-6 d-flex align-items-center">
         <input class="form-check-input custom-radio mb-1" id="falseAnswer" type="radio"  name="trueOrFalse">
         <label class="ps-2 fs-4" for="falseAnswer">False</label>
       </div>
      </div>
    </div>
      <div>
      <!-- End row of multi choice and multi Checkboxes -->
      <hr class="my-2">
      <!--  -->
      <div v-if="!getFormList[componentIndex].answerKeySelected"  class="row p-2">
        <div  class="col-lg-6 d-flex justify-content-start align-items-center">
          <button class="btn btn-outline-primary me-3" @click.prevent="answerKey(componentIndex)"><i class="fa-regular fa-square-check"></i> Answer Key</button>
          <span class="text-muted">( {{getFormList[componentIndex].questionMark}} Point )</span>
        </div>
        <div  class="col-lg-6 d-flex justify-content-end">
          <div class="me-3 btn-icon">
            <button class="border-0 bg-transparent" @click="duplicateComponent(componentIndex)"><i class="fa-regular fa-copy"></i></button>
          </div>
          <div class="me-3 btn-icon">
            <button  :disabled="getFormList.length === 1"   class="border-0 bg-transparent" @click="removeComponent(componentIndex)"><i class="fa-regular fa-trash-can "></i></button>
          </div>
          <div class="d-flex align-items-center border-start border-3">
            <label class="form-check-label me-2 ms-3" for="flexSwitchCheckDefault">Required</label>

            <div class="form-check form-switch">
              <input class="form-check-input custom-switch" type="checkbox" @click="requiredSwitch(componentIndex)" role="switch" id="flexSwitchCheckDefault" :checked="getFormList[componentIndex].required">
            </div>
          </div>
        </div>
      </div>
      <div v-if="getFormList[componentIndex].answerKeySelected" class=" d-flex justify-content-end">
          <button class="btn btn-outline-primary me-3" @click.prevent="toggleAnswerKey(componentIndex)">Done</button>
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
    ...mapState(formStore, ['isSelected','getFormList','count','fileTypes','optionValues']),
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
    ...mapActions(formStore, ['handleMarksChange','correctAnswer','toggleAnswerKey','answerKey','removeOptionImg','handleUploadImg','deselectElement','selectElement','requiredSwitch','removeComponent','updateSelectedValue','addOption','removeOption','resetOptionIdsAndLabels','getSelectedPlaceholder','handleDropdowns','duplicateComponent']),
   
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
  .question-marks{
    border: none;
    outline: none;
    width: 60px;
    padding: 0 10px;
    font-size: 16px;
    background-color: #f0f0f0;
    border-bottom: 1px solid #7e7e81;
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

.uploaded-image-wrapper {
  width: 100%;
  max-width: 100px;
  height: auto;
  max-height: 300px;
  overflow: hidden; 
}

.uploaded-image-wrapper img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* transition component */
.fade-enter-from{
  opacity: 0;
}
.fade-enter-active{
  transition: all .5s linear;
}
.fade-leave-to{
  transition: all .25s linear;
  opacity: 0;
}
</style>
