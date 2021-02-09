'use strict';

new Vue({
  el: '#app',
  data: {
    showingStatus: 'すべて',
    newTask: '',
    tasks: []
  },
  methods: {
    addTask() {
      this.tasks.push({
        task: this.newTask,
        status: `作業中`,
        show: true
      });
      this.newTask = '';
    },
    changeStatus(idx) {
      const st = this.tasks[idx].status; 
      this.tasks[idx].status = st == '作業中' ? '完了' : '作業中';
    },
    deleteTask(idx) {
      this.tasks.splice(idx, 1);
    }
  },
  watch: {
    showingStatus() {
      this.tasks.forEach(item => {
        const st = this.showingStatus;
        if (st == 'すべて') {
          Vue.set(item, 'show', true);
        } else {
          Vue.set(item, 'show', item.status == st);
        }
      });
    }
  }
});