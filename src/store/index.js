import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import LocalStorage from '../modules/LocalStorage'

Vue.use(Vuex)

const STORE = new LocalStorage('todo-vue')

export default new Vuex.Store({
  state: {
    todos: [
      {
        content: 123,
        done: false
      },
      {
        content: 456,
        done: false
      },
      {
        content: 789,
        done: false
      }
    ]
  },
  mutations: {
    SET_TODOS (state, todos) {
      state.todos = todos
    }
  },
  getters: {
    list (state) {
      return state.todos.map((todo, tId) => {
        return {
          tId,
          todo
        }
      })
    },
    filterList (state, getters) {
      return filter => {
        let status = null
        switch (filter) {
          case 'all':
            return getters.list
          case 'active':
            return (status = false)

          case 'done':
            return (status = true)
        }
        return getters.list.filter(todo => {
          return todo.todos.done === status
        })
      }
    }
  },
  actions: {
    CREATE_TODO ({ commit }, { todo }) {
      const todos = STORE.load()
      todos.push(todo)
      Store.save(todos)
      commit('SET_TODOS', todos)
      return {
        tId: todos.length - 1,
        todo
      }
    },
    READ_TODOS ({ commit }) {
      const todos = STORE.load()
      commit('SET_TODOS', todos)
      return {
        todos
      }
    },
    UPDATE_TODO ({ commit }, { tId, todo }) {
      const todos = STORE.load()
      todos.splice(tId, 1, todo)
      STORE.save(todos)
      commit('SET_TODOS', todos)
      return {
        tId,
        todo
      }
    },
    DELETE_TODO ({ commit }, { tId }) {
      const todos = STORE.load()
      const todo = todos.splice(tId, 1)[0]
      STORE.save(todos)
      commit('SET_TODOS', todos)
      return {
        tId: null,
        todo
      }
    },
    CLEAR_TODOS ({ commit }) {
      const todos = []
      STORE.save(todos)
      commit('SET_TODOS', todos)
      return {
        tId: null,
        todos
      }
    }
  }
})
