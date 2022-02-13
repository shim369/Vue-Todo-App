(function(){
  'use strict';

  let vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      newLink: '',
      todos: [],
    },
    watch: {
      todos: {
        handler: function(){ 
            localStorage.setItem('todos', JSON.stringify(this.todos));
            //alert('Data saved!');
        },
        deep: true
      }
    },
    mounted: function(){
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addItem: function(){
        var item = {
          title: this.newItem,
          link: this.newLink,
          isDone: false
        };
        this.todos.unshift(item);
        this.newItem = '';
        this.newLink = '';
      },
      deleteItem: function(index){
        if (confirm('ホントに削除する?')){
          this.todos.splice(index, 1);
        }
      },
      purge: function(){
        if (!confirm('チェックしたもの一括削除する?')){
          return;
        }
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining: function(){
        return this.todos.filter(function(todo){
          return !todo.isDone;
        });
      }
    }
  });
})();