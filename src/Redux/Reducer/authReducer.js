// nandain user udah login atau belom
const INITIAL_STATE = {
    id: null,
    username: '',
    email: '',
    role: 'user',
    logged : false
}

// ini function yang mengubah global state
export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        // ini kondisi-kondisi untuk mengganti global state. casenya dari action
        case 'LOGIN' : 
        //ini yang diganti
            return{
                id : action.payload.id,
                username : action.payload.username,
                email : action.payload.email,
                role : action.payload.role,
                logged : true
            } 
        case 'LOGOUT' : 
            return INITIAL_STATE
        default : 
            return state
    }
}