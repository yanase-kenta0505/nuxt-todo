export const state = () => ({
  message: 'hello world'
})

export const mutations = {
  changeMessage(state, e) {
    state.message = e
  },
  add(state) {
    state.message = ''
  }

}

export const actions = {
  changeMessage(context, e) {
    context.commit('changeMessage', e)
  },
  add(context) {
    context.commit('add')
  }
}
