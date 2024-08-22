import agent from "../../agent/agent"
import { IStatstics } from "../../Models/StatsticsModel"




export const get_statstics = () => {

    return async (dispatch: any) => {
        await agent.statstics.getStatics().then(res => {
            dispatch(GET_STATSTICS(res.data))
        })
    }
}




const GET_STATSTICS=(payload:any)=>({
    type:'GET_STATSTICS',
    payload:payload
})