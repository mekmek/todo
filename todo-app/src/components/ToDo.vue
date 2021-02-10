<template>
  <div>
    <h1>ToDoリスト</h1>
    <div>
      <label><input type="radio" v-model="showingStatus" value="すべて">すべて</label>
      <label><input type="radio" v-model="showingStatus" value="作業中">作業中</label>
      <label><input type="radio" v-model="showingStatus" value="完了">完了</label>
    </div>
    <table>
      <theader>
        <tr>
          <th>ID</th>
          <th>コメント</th>
          <th>状態</th>
        </tr>
      </theader>
      <tbody>
        <tr v-for="(item, idx) in tasks" v-show="item.show" :key="idx">
          <td>{{ idx }}</td>
          <td>{{ item.task }}</td>
          <td>
            <button @click="changeStatus(idx)">{{ item.status }}</button>
          </td>
          <td>  
            <button @click="deleteTask(idx)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>新規タスクの追加</h2>
    <input type="text" v-model="newTask" @keyup.enter="addTask">
    <button @click="addTask">追加</button>
  </div>
</template>

<script>
export default {
  name: 'ToDo',
  data() {
    return {
      showingStatus: 'すべて',
      newTask: '',
      tasks: []
    }
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
          this.$set(item, 'show', true);
        } else {
          this.$set(item, 'show', item.status == st);
        }
      });
    }
  }
}
</script>

<style scoped>
input, label, button {
  cursor: pointer;
}
</style>
