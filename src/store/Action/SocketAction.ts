

import { io } from 'socket.io-client';
import { ISystemStats } from '../../Models/StatsticsModel';
const token = localStorage.jwt;

export const IntiateSocket = () => {
    return async (dispatch: any) => {
        const socket = io('http://192.168.1.30:5001',{
            auth:{
                token:token
            }
        });

       socket.on('stats',(res)=>{
        dispatch(SERVER_HEALTH(res))
        
       })
    }
  
  
}




export const SERVER_HEALTH=(payload:ISystemStats)=>({
    type:'SERVER_HEALTH',
    payload:payload
})