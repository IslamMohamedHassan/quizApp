


<template>
  <div class="py-5 m-auto w-50 home-comp" @scroll="handleScroll">
    <HeaderComponent :componentIndex="0"/>
    <PopupModal/>
    <div class="scrollable-container">
      
        <Sortable
        :key="sortableKey"
        :list="getContainerMultipleChoiceOption"
        :options="sortableOptions"
        tag="div"
        item-key="id"
        @update="onSortUpdate"
        @change="onSortChange"
        
      >
        <template #item="{ element, index }">
          <div :data-id="element.id"> 
              <FormComponent  :componentIndex="index" :data="element" />
          </div>
        </template>
      </Sortable>
      <div class="fixed-button-toolbar" :style="`top: ${buttonToolbarPosition}px ;`">
      <ButtonToolbar class="position-sticky"/>
    </div>
    </div>
 </div>
      
  
 </template>
 
   <script>
  import { mapActions, mapState } from 'pinia';
  import FormComponent from '../components/FormComponent.vue';
  import { formStore } from '@/stores/formStore';
  import { Sortable } from 'sortablejs-vue3';
  import ButtonToolbar from '@/components/ButtonToolbar.vue';
  import PopupModal from '@/components/PopupModal.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

 
 export default {
  components: {
     FormComponent,
     Sortable,
     ButtonToolbar,
     PopupModal,
    HeaderComponent
     
  },
  data() {
    return {
    
      sortableOptions: {
        animation: 400,
        easing: 'cubic-bezier(1, 0, 0, 1)',
        handle: '.handle',
        isDragging: false,
        forceUpdate : true, 

       
      },
      currentListLength: 0,
    };
 },
 watch: {
    getContainerMultipleChoiceOption(newList) {
      if (newList.length !== this.currentListLength) {
        this.currentListLength = newList.length;
        this.forceUpdateKey();
      }
    },
  },
  computed: {
     ...mapState(formStore, ['sortableKey','forceUpdateFlag','buttonToolbarPosition','getContainerMultipleChoiceOption','containerMultipleChoiceOption']),
  },
  methods: {
     ...mapActions(formStore, ['incrementSortableKey','duplicateComponent', 'removeComponent','updateContainerMultipleChoiceOrder']),
     onSortUpdate(evt) {
     const newIndex = evt.newIndex;
     const oldIndex = evt.oldIndex;
     this.updateContainerMultipleChoiceOrder(newIndex,oldIndex);
    this.incrementSortableKey()
  },
  forceUpdateKey() {
     this.incrementSortableKey()
    },
  onSortChange(){
  }
 
 },
 mounted(){
  this.currentListLength = this.getContainerMultipleChoiceOption.length;
  console.log("start",this.getContainerMultipleChoiceOption);
  console.log("aaa");
 }


  
 }
 </script>

<style>


.home-comp{
  background-color: #f0ebf8;
  height: 100%;
  min-height: 100vh;
}

.fixed-button-toolbar {
 position: fixed;
 transition: all .5s ease-in-out;
 top: 25%;
 right: 22%;
 z-index: 1000;
}
@media (max-width : 1800px){
  .fixed-button-toolbar {
  right: 21%;
  }
}
@media (max-width : 1500px){
  .fixed-button-toolbar {
  right: 20%;
  }
}
@media (max-width : 1200px){
  .fixed-button-toolbar {
  right: 19%;
  }
}
@media (max-width : 1000px){
  .fixed-button-toolbar {
  right: 17%;
  }
}
@media (max-width : 800px){
  .fixed-button-toolbar {
  right: 16%;
  }
}

@media (max-width : 600px) {
  div.home-comp {
    width: 95% !important;
  }
  .fixed-button-toolbar{
   
    bottom: 0px !important;
  }
}

</style>