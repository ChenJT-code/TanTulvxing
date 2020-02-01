export const state= ()=>({
    historyList:[]
})

export const mutations ={
    pushHistory(state,data){
        state.historyList.push(data)
    }
}