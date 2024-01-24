<template>
    <header class="form-title-header pb-4 shadow-sm">
        <div class="border-1 border-bottom py-1">
            {{ age }}
            <br>
            {{ Age }}
            <button @click="incAge"></button>
            <Tiptap :title="'title'" :id="componentIndex"/>
        </div>
        <div class="border-1 border-bottom py-1">
            <Tiptap :title="'description'" :id="componentIndex"/>
        </div>
    </header>
</template>

<script>
import Tiptap from './Tiptap.vue';

export default {
    props:{
    componentIndex:{type: Number},
},

    components:{
        Tiptap,
    },

    data(){
        return{
            age : 20,
            apiData : {}
        }
    },
    computed:{
        Age(){
            return this.age * 2
        }
    },
    methods:{
        incAge(){
            this.age++
        }
       
    },
    mounted(){
        console.log("assadsdsdsfds");
    }
}
</script>

<style>
    .form-title-header{
        border: 1px solid #d9d9d9;
        border-top: 10px solid #673ab7 ;
        border-radius: 10px;
        background-color: #fff;

    }
</style>