import { svgIcons } from '@/components/icons/SvgIcons';
import { defineStore } from 'pinia'


export const formStore = defineStore('formStore', {

  state: () => ({
    // component data
      formList: [{
        formInfo :{section : 1 , sectionTitle : 'Untitled form',sectionDescription :'Form Description'},
         data : [{ id:1 , placeholder: `Option`, image: null ,label:1 , value:'' , showImgIcon : false ,showImgAltIcon :false }],
      // flag to display other button
      addOtherBtn : true,
      selectedValue : 'Multiple Choice',
      selectedIcon : svgIcons.multipleChoice,
      questionValue : "Initial content",
      imageFileDataUrl : "",
      selectedInput: 'radio',
      required: false,
      isSelected: false,
      regularOptions : [""],
      answerKeySelected : false,
      questionMark : 0
      }] ,
      // end component data

      // id counter
      count : 1,

      // these to filter all option and i use it to  hide the remove btn if i have 1 option 
      modalType: {},
     
      // switch flag file upload
      fileTypes : false,

      // select component 
      buttonToolbarPosition : "",
      forceUpdateFlag : true,
      sortableKey : 1
     

      
     
     
  }),
  
  getters: {

    getFormList() {
      return this.formList;
    },

  //  options data
    optionValues() {
      return [
        { value: 'Multiple Choice', label: 'Multiple Choice', inputType: 'radio',placeholder : "Option",icon: svgIcons.multipleChoice},
        { value: 'Checkboxes', label: 'Checkboxes', inputType: 'checkbox',placeholder : "Option",icon: svgIcons.checkBox },
        { value: 'Dropdown', label: 'Dropdown', inputType: 'text',placeholder : "",icon: svgIcons.dropDown },
      ];
    },
  }, 
  actions: {

    toggleAnswerKey(componentIndex){
      this.formList[componentIndex].answerKeySelected = false
    },

    answerKey(componentIndex){
      // console.log(componentIndex);
      console.log(this.formList[componentIndex].answerKeySelected);
      this.formList[componentIndex].answerKeySelected = true
      console.log(this.formList[componentIndex].answerKeySelected);
    },

    // upload img func
    handleUploadImg(componentIndex, event, type, optionIndex) {
      const fileInput = event.target;
      const file = fileInput.files[0];
      const reader = new FileReader();

    reader.onload = () => {

      if(type === 'Question'){
        // Update the image data URL for the specific option
        // this.getFormList[componentIndex].imageFile = file;
        this.getFormList[componentIndex].imageFileDataUrl = reader.result;
      } else if((type === 'Answer')){
        this.getFormList[componentIndex].data[optionIndex].image = reader.result;
      }
    };
    
    reader.readAsDataURL(file);
    
      // const formData = new FormData
      // formData.append('file', file);
      // if (type === 'Question') {
      //     this.getFormList[componentIndex].questionImg = formData;
      // } else if ((type === 'Answer')) {
      //     // Update the image file for the specific option
      //     this.getFormList[componentIndex].data[optionIndex].image = formData
      // }
      console.log(type);
      },


    updateContent(newContent,title,id) {
      if(title === "question"){
        this.formList[id].questionValue = newContent.target.innerText
      }
      if(title === "title"){
        this.formList[id].formInfo.sectionTitle = newContent.target.innerText
      }
      if(title === "description"){
        this.formList[id].formInfo.sectionDescription = newContent.target.innerText
      }
    },

  // add new form component
  addComponent() {
    const selectedIndex = this.formList.findIndex(item => item.isSelected);
    // If an item is selected, insert the new component under the selected one
    if (selectedIndex !== -1) {
      this.formList.splice(selectedIndex + 1, 0, {
        formInfo :{section : 1 , sectionTitle : 'Untitled form',sectionDescription :'Form Description'},
      data : [{ id: this.getFormList.length + 1 , placeholder: `Option`, image: null ,label:1 , value:'', showImgIcon : false ,showImgAltIcon :false }],
    // flag to display other button
    addOtherBtn : true,
    selectedValue : 'Multiple Choice',
    questionValue : "Initial content",
    imageFileDataUrl : "",
    selectedInput: 'radio',
    regularOptions : [""],
   });
    } else {
      // If no item is selected, add the new component at the end
      this.formList.push({
        formInfo :{section : 1 , sectionTitle : 'Untitled form',sectionDescription :'Form Description'},
        data : [{ id: this.getFormList.length + 1 , placeholder: `Option`, image: null ,label:1 , value:'', showImgIcon : false ,showImgAltIcon :false }],
      // flag to display other button
      addOtherBtn : true,
      selectedValue : 'Multiple Choice',
      questionValue : "Initial content",
      imageFileDataUrl : "",
      selectedInput: 'radio',
      regularOptions : [""],
      });
    }
    this.incrementSortableKey();
    console.log( 'after add component',this.formList);

  },

   //  function to pass the comp id from th component to store 
   duplicateComponent(originalIndex) {
    if (originalIndex >= 0 && originalIndex < this.formList.length) {
      // Duplicate the component
      const originalComponent = this.formList[originalIndex];
      const duplicatedArray = JSON.parse(JSON.stringify(originalComponent));

      // Assign a new and unique ID to the duplicated component
      duplicatedArray.data.forEach(item => {
        item.id = /* Generate a new unique ID, for example: */ Math.random().toString(36).substring(7);
      });

      // Create a new array with the duplicated component
      const newArray = [...this.formList];
      newArray.splice(originalIndex + 1, 0, duplicatedArray);

      // Update the state with the new array
      this.formList = newArray;
      this.incrementSortableKey()
      console.log( 'after duplicate comp',this.formList);

    }
  },
  
  //  remove Component 
  removeComponent(index) {
    // Remove the component at the specified index
    if (index >= 0 && index < this.formList.length) {
      this.formList.splice(index, 1);
      this.incrementSortableKey()
      console.log( 'after remove comp',this.formList);

    }
  },
  incrementSortableKey(){
    this.sortableKey+=1
  },

selectElement(componentIndex) {
  if (componentIndex >= 0 && componentIndex < this.formList.length) {
    // Reset isSelected property for all items
    this.formList.forEach((item) => {
      item.isSelected = false;
    });

    // Get a reference to the selected question-comp using the ref
    const selectedQuestionComp = document.getElementById(`comp${componentIndex}`);
    if (selectedQuestionComp) {
      const rect = selectedQuestionComp?.getBoundingClientRect();
      if (rect?.top < window.innerHeight - 200) {
        this.buttonToolbarPosition = Math.max(rect?.top, 50);
      }
    } else {
      this.buttonToolbarPosition = window.innerHeight - 100;
    }

    // Set isSelected property for the selected item
    this.formList[componentIndex].isSelected = true;
  } else {
    console.error(`removed`);
  }
},

  //  Add Option to multiple Choices & CheckBox & Dropdown 
  addOption(optionName,componentId) {
    this.count++
      this.formList[componentId].data.push({ id: this.count,  placeholder: optionName, image: null, value:'', showImgIcon : false ,showImgAltIcon :false });
      this.resetOptionIdsAndLabels(componentId)
  },

    // fun to change select box values
    updateSelectedValue(value,icon,componentId) {
      this.formList[componentId].selectedValue = value;
      this.formList[componentId].selectedIcon= icon;
      const [inputType ]= this.optionValues.filter(option => option.value == value)
      this.formList[componentId].selectedInput = inputType.inputType;
      console.log( 'after update dropdown',this.formList);
        
    },

    //  Remove Option From multiple Choices & CheckBox & Dropdown 
    removeOption(id,componentId){
      const indexToRemove = this.formList[componentId].data.findIndex(option => option.id === id);
      // Remove the option using splice
    this.formList[componentId].data.splice(indexToRemove, 1);

    this.resetOptionIdsAndLabels(componentId);
    console.log( 'after remove option',this.formList);
  },
  removeOptionImg(componentIndex,optionIndex){
   if (optionIndex == 'Question') {
     this.getFormList[componentIndex].imageFileDataUrl = null;
  }else{
    this.formList[componentIndex].data[optionIndex].image = null;
  }

  },

    // Make The Options Ordered
    resetOptionIdsAndLabels(componentId) {
  
  const regularOptions = this.formList[componentId].data.filter(option => option.placeholder === "Option");
  let optionCounter = 0;
    this.formList[componentId].data.forEach((option, index) => {
        if (option.placeholder === 'Option') {
            option.id = index + 1;
            option.label = ++optionCounter;
            option.placeholder = 'Option';
        }
        
    });
      this.formList[componentId].regularOptions = regularOptions;
  },
  
  
  // change the placeholder od Fields when change the select box 
      getSelectedPlaceholder(selectedValue){

       const selectedOption = this.optionValues.find(option => option.value === selectedValue);
      
      return selectedOption ? selectedOption.placeholder : '';
      },
  
       // handle all dropdown
      handleDropdowns(value,dropdownName){
        this.dropdowns[dropdownName] = value;
      },

      // required switch 
      requiredSwitch(componentId){
        this.formList[componentId].required = !this.formList[componentId].required 
      },

    // fun to handle routes of modal 
    openModal(modalType) {
      this.modalType = modalType;
      // Access router and route through the root context
      if(this.modalType === "question"){
        this.$router.push({ name: 'popup', query :{type :"question",page:'forms'}},)
      }
    },

   
    // func to handle sortable comp update the list item after sort
    updateContainerMultipleChoiceOrder(newIndex, oldIndex) {
    // Update the order in the state
    const movedComponent = this.formList[oldIndex];
    this.formList.splice(oldIndex, 1);
    this.formList.splice(newIndex, 0, movedComponent);
    },
  },
})