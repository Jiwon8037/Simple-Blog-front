import { finishLoading, startLoading } from "../modules/loading";

export const createRequestActionTypes=type=>{
    const SUCCESS=`${type}_SUCCESS`;
    const FAILURE=`${type}_FAILURE`;
    return [type,SUCCESS,FAILURE];
};

export default function createRequestThunk(type,request){
    const SUCCESS=`${type}_SUCCESS`;
    const FAILURE=`${type}_FAILURE`;

    return params=>async dispatch=>{
        dispatch({type});
        dispatch(startLoading(type));
        try{
            const response=await request(params);
            dispatch({
                type:SUCCESS,
                payload:response.data,
                meta:response,
            });
            dispatch(finishLoading(type));
        }catch(e){
            dispatch({
                type:FAILURE,
                payload:e,
                error:true,
            });
            dispatch(startLoading(type));
            throw e;
        }
    }
}
// export default function createRequestSaga(type,request){
//     const SUCCESS=`${type}_SUCCESS`;
//     const FAILURE=`${type}_FAILURE`;

//     return function*(action){
//         yield put(startLoading(type));
//         try{
//             const response=yield call(request,action.payload);
//             yield put({
//                 type:SUCCESS,
//                 payload:response.data,
//                 meta:response,
//             });
//         }catch(e){
//             yield put({
//                 type:FAILURE,
//                 payload:e,
//                 error:true
//             });
//         }
//         yield put(finishLoading(type));
//     };
// }