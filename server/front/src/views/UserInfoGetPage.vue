<template>
  <div>
    <h1>TEST</h1>
    {{ hoge }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import { ApiClient }from '../infrastructure/httpAdapters/ApiClient';

@Component({})
export default class extends Vue{
    private hoge:string="loading";
    async created(){
        
        this.hoge = (await new ApiClient().GetRoute());
    }    
}
</script>