<template>
<div class="main">
  <h2>Logged in as: {{user.firstName}} {{user.lastName}} <button @click="logout" class="pure-button pure-button-primary">Logout</button></h2>
  <h1>My Times</h1>
  <form class="pure-form" @submit.prevent="startTime">
    <input v-model="category" placeHolder="Category">
    <button type="submit" class="pure-button pure-button-primary right">Start</button>
  </form>
  <div v-for="time in times" v-bind:key="time.id">
    <div class="time">
      <p>{{time.category}} {{time.beginTime}} - </p>
      <p v-if="time.endTime">{{time.endTime}}</p>
      <button v-else class="pure-button pure-button-primary right" @click.prevent="{name: 'finishTime', params: {id: time.id}}">Finish</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'MyTimes',
  data() {
    return {
      times: [],
      category: '',
    }
  },
  created() {
    this.getTimes();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getTimes() {
      try {
        let response = await axios.get("/api/times");
        this.times = response.data.times;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
    async startTime() {
      try {
        await axios.post("/api/time-stamp", {
          category: this.category
        });
        this.category = "";
        this.getTimes();
      } catch (error) {
        console.log(error);
      }
    },
    async endTime(id) {
      try {
        await axios.put("/api/time-stamp/" + id);
        this.getTimes();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTime(id) {
      try {
        await axios.delete("/api/time-stamp/" + id);
        this.getTimes();
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  max-width: 500px;
}

h3 {
  font-size: 12px;
  font-weight: normal;
  background-color: #ccc;
  padding: 10px 20px;
}


label {
  background-color: #000;
  color: white;
  padding: 5px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
}

.ticket {}
</style>
