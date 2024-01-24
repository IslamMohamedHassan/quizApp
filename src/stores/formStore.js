import { svgIcons } from '@/components/icons/SvgIcons';
import { defineStore } from 'pinia'


export const formStore = defineStore('formStore', {

  state: () => ({
    // component data
      containerMultipleChoiceOption: [{
        formInfo :{section : 1 , sectionTitle : 'Untitled form',sectionDescription :'Form Description'},
         data : [{ id:1 , placeholder: `Option`, image: null ,label:1 , value:'' , showImgIcon : false ,showImgAltIcon :false }],
      // flag to display other button
      addOtherBtn : true,
      selectedValue : 'Multiple Choice',
      selectedIcon : svgIcons.multipleChoice,
      questionValue : "Initial content",
      questionImg : "",
      selectedInput: 'radio',
      required: false,
      isSelected: false,
      regularOptions : [""],
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

    getContainerMultipleChoiceOption() {
      return this.containerMultipleChoiceOption;
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


    // handleUploadImg(index, event ,type) {
    //   const fileInput = event.target;
    //   const file = fileInput.files[0];
    // if ( type === 'Question') {
    //   this.getContainerMultipleChoiceOption[index].questionImg = file
    // }else{
    //   console.log(this.getContainerMultipleChoiceOption[index].data.image); 
    // }
    

    // },
    handleUploadImg(index, event, type, optionIndex) {
      const fileInput = event.target;
      const file = fileInput.files[0];

      if (type === 'Question') {
          // this.getContainerMultipleChoiceOption[index].questionImg = file;
      } else {
          // Update the image file for the specific option
          console.log('inside ans');
          console.log(this.getContainerMultipleChoiceOption[index].data[optionIndex].image);
          // console.log(optionIndex);
          this.getContainerMultipleChoiceOption[index].data[optionIndex].image = file
      }
      console.log(type);
  },

    updateContent(newContent,title,id) {
      if(title === "question"){
        this.containerMultipleChoiceOption[id].questionValue = newContent.target.innerText
      }
      if(title === "title"){
        this.containerMultipleChoiceOption[id].formInfo.sectionTitle = newContent.target.innerText
      }
      if(title === "description"){
        this.containerMultipleChoiceOption[id].formInfo.sectionDescription = newContent.target.innerText
      }
    },

  // add new form component
  addComponent() {
    const selectedIndex = this.containerMultipleChoiceOption.findIndex(item => item.isSelected);
    // If an item is selected, insert the new component under the selected one
    if (selectedIndex !== -1) {
      this.containerMultipleChoiceOption.splice(selectedIndex + 1, 0, {
        formInfo :{section : 1 , sectionTitle : 'Untitled form',sectionDescription :'Form Description'},
      data : [{ id: this.getContainerMultipleChoiceOption.length + 1 , placeholder: `Option`, image: null ,label:1 , value:'', showImgIcon : false ,showImgAltIcon :false }],
    // flag to display other button
    addOtherBtn : true,
    selectedValue : 'Multiple Choice',
    questionValue : "Initial content",
    questionImg : "",
    selectedInput: 'radio',
    regularOptions : [""],
   });
    } else {
      // If no item is selected, add the new component at the end
      this.containerMultipleChoiceOption.push({
        formInfo :{section : 1 , sectionTitle : 'Untitled form',sectionDescription :'Form Description'},
        data : [{ id: this.getContainerMultipleChoiceOption.length + 1 , placeholder: `Option`, image: null ,label:1 , value:'', showImgIcon : false ,showImgAltIcon :false }],
      // flag to display other button
      addOtherBtn : true,
      selectedValue : 'Multiple Choice',
      questionValue : "Initial content",
      questionImg : "",
      selectedInput: 'radio',
      regularOptions : [""],
      });
    }
    this.incrementSortableKey();
    console.log( 'after add component',this.containerMultipleChoiceOption);

  },

   //  function to pass the comp id from th component to store 
   duplicateComponent(originalIndex) {
    if (originalIndex >= 0 && originalIndex < this.containerMultipleChoiceOption.length) {
      // Duplicate the component
      const originalComponent = this.containerMultipleChoiceOption[originalIndex];
      const duplicatedArray = JSON.parse(JSON.stringify(originalComponent));

      // Assign a new and unique ID to the duplicated component
      duplicatedArray.data.forEach(item => {
        item.id = /* Generate a new unique ID, for example: */ Math.random().toString(36).substring(7);
      });

      // Create a new array with the duplicated component
      const newArray = [...this.containerMultipleChoiceOption];
      newArray.splice(originalIndex + 1, 0, duplicatedArray);

      // Update the state with the new array
      this.containerMultipleChoiceOption = newArray;
      this.incrementSortableKey()
      console.log( 'after duplicate comp',this.containerMultipleChoiceOption);

    }
  },
  
  //  remove Component 
  removeComponent(index) {
    // Remove the component at the specified index
    if (index >= 0 && index < this.containerMultipleChoiceOption.length) {
      this.containerMultipleChoiceOption.splice(index, 1);
      this.incrementSortableKey()
      console.log( 'after remove comp',this.containerMultipleChoiceOption);

    }
  },
  incrementSortableKey(){
    this.sortableKey+=1
  },

selectElement(componentIndex) {
  if (componentIndex >= 0 && componentIndex < this.containerMultipleChoiceOption.length) {
    // Reset isSelected property for all items
    this.containerMultipleChoiceOption.forEach((item) => {
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
    this.containerMultipleChoiceOption[componentIndex].isSelected = true;
  } else {
    console.error(`removed`);
  }
},

  //  Add Option to multiple Choices & CheckBox & Dropdown 
  addOption(optionName,componentId) {
    this.count++
      this.containerMultipleChoiceOption[componentId].data.push({ id: this.count,  placeholder: optionName, image: null, value:'', showImgIcon : false ,showImgAltIcon :false });
      this.resetOptionIdsAndLabels(componentId)
  },

    // fun to change select box values
    updateSelectedValue(value,icon,componentId) {
      this.containerMultipleChoiceOption[componentId].selectedValue = value;
      this.containerMultipleChoiceOption[componentId].selectedIcon= icon;
      const [inputType ]= this.optionValues.filter(option => option.value == value)
      this.containerMultipleChoiceOption[componentId].selectedInput = inputType.inputType;
      console.log( 'after update dropdown',this.containerMultipleChoiceOption);
        
    },

    //  Remove Option From multiple Choices & CheckBox & Dropdown 
    removeOption(id,componentId){
      const indexToRemove = this.containerMultipleChoiceOption[componentId].data.findIndex(option => option.id === id);
      // Remove the option using splice
    this.containerMultipleChoiceOption[componentId].data.splice(indexToRemove, 1);

    this.resetOptionIdsAndLabels(componentId);
    console.log( 'after remove option',this.containerMultipleChoiceOption);
  },

    // Make The Options Ordered
    resetOptionIdsAndLabels(componentId) {
  
  const regularOptions = this.containerMultipleChoiceOption[componentId].data.filter(option => option.placeholder === "Option");
  let optionCounter = 0;
    this.containerMultipleChoiceOption[componentId].data.forEach((option, index) => {
        if (option.placeholder === 'Option') {
            option.id = index + 1;
            option.label = ++optionCounter;
            option.placeholder = 'Option';
        }
        
    });
      this.containerMultipleChoiceOption[componentId].regularOptions = regularOptions;
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
        this.containerMultipleChoiceOption[componentId].required = !this.containerMultipleChoiceOption[componentId].required 
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
    const movedComponent = this.containerMultipleChoiceOption[oldIndex];
    this.containerMultipleChoiceOption.splice(oldIndex, 1);
    this.containerMultipleChoiceOption.splice(newIndex, 0, movedComponent);
    },
  },
})