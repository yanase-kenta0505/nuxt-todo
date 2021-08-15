import firebase from "~/plugins/firebase"
import { firestoreAction } from "vuexfire"
import _ from 'lodash'

const db = firebase.firestore()
const todosRef = db.collection("todos")

export const state = () => ({
  todos: [],
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('todos', todosRef)
  }),

  add: firestoreAction((context, addItem) => {
    console.log(addItem)
    if (addItem.todo) {
      todosRef.add({
        todo: addItem.todo,
        dedline: '',
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),

  editItem: firestoreAction((context,edit) => {
    // console.log(edit.editedId)
    console.log(edit.editedItem.todo)

    todosRef.doc(edit.editedId).update({
      todo:edit.editedItem.todo,
      dedline:edit.editedItem.dedline
    })
  }),

  delete: firestoreAction((context, deleteId) => {
    // console.log(deleteId)
    todosRef.doc(deleteId).delete()
  }),
  done: firestoreAction((context, item) => {
    console.log(item.done)
    todosRef.doc(item.id).update({
      done: !item.done
    })
  }),

}

export const getters = {
  orderdTodos(state) {
    return _.sortBy(state.todos, 'created')
  }
}
