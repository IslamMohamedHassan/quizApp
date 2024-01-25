<template>
      <div class="result">
        <div class="title">{{results[resultIndex].title}}</div>
        <div class="desc">
            {{results[resultIndex].desc}} 
        </div>
    </div>
</template>

<script>
    export default {
        props:['results' ,'correctedAnswer'],
        computed:{
            resultIndex(){
                let index = 0 ;
               this.results.forEach((el,i) => {
                if(el.min <= this.correctedAnswer && el.max >= this.correctedAnswer)
                    index = i
               });
                return index
            }
        },
    }
</script>

<style  >

</style>