const INITIAL_STATE = {
    productList : [],
    brands : [],
    loading : false,
    error : false,
    productById : {}
}

export const productReducers = (state = INITIAL_STATE, action) => {
    switch(action.type){
        //selalu ada 3 case: untuk ambil data, jika data sukses diambil, dan jika data gagal diambil
        case 'FETCH_DATA_START' :
            return{
                // state disini kondisi state terakhir yang udah pernah keganti
                ...state,
                loading : true
            }
        case 'FETCH_DATA_SUCCESS' :
            return{
                ...state,
                productList : action.payload,
                loading : false
            }
        case 'FETCH_DATA_ID_SUCCESS' :  
            return{
                ...state,
                productById : action.payload,
                loading : false
            }
        case 'FETCH_DATA_FAILED' :
            return{
                ...state,
                error : true,
                loading : false
            }
        default :
            return state
    }
}
