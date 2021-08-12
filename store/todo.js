export const state = () => ({
  message: 'hello world'
})

export const mutations = {
  changeMessage(state, e) {
    state.message = e
  }
  
}

export const actions = {
  changeMessage(context,e){
    context.commit('changeMessage',e)
  }
}
