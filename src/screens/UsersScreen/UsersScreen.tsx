import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../../store/Action/userAction';
import { IUserModel } from './../../Models/userModel';
import { Button } from 'react-bootstrap';
import './UsersScreen.scss'
import RIGHT from '../../assets/images/right2.png'
import WRONG from '../../assets/images/wrong.png'
import { useNavigate } from 'react-router';
function UsersScreen() {

    const users = useSelector((state:any)=>state.user.AllUsers) as IUserModel[]
    const currentUser = useSelector((state:any)=>state.user.user) as IUserModel
    const dispatch = useDispatch()
    const nav = useNavigate()

    useEffect(()=>{

        dispatch(getAllUsers())
        if(!currentUser.isAdmin){
            nav('../../')
        }
    },[])

 
  return (
    <div>
        <h3>Users</h3>

        <div>
            <div>
                <table>
                    <tr>

                        <th className='headerTh'><h4>Id</h4></th>
                        <th className='headerTh'><h4>Name</h4></th>
                        <th className='headerTh'><h4>Email</h4></th>
                        <th className='headerTh'><h4>Admin</h4></th>
                        <th className='headerTh '><h4></h4></th>
                       
                    </tr>
            {users!=undefined ?
                    users.map((user: IUserModel) => {
                      const ISADMIN = user.isAdmin
                    return   ( <tr>

                            <th><span>{user._id}</span></th>
                            <th><span>{user.name}</span> </th>
                            <th>{user.email}</th>
                            <th>{ISADMIN ? <img src={RIGHT}/> :
                             <img src={WRONG}/>}</th>
                          
                            <th><div className='usersAction_div'>
                                 <Button disabled={ISADMIN} variant='light' className='btn-sm action edit' onClick={()=>{}}>
                                    <i className='fas fa-edit'></i>
                                    </Button>
                                    <Button   disabled={ISADMIN} variant='danger' className='btn-sm action delete' onClick={()=>{

                                        dispatch(deleteUser(user._id))
                                    }}>
                                    <i className='fas fa-trash'></i>
                                    </Button>
                            </div>
                                
                                </th>
                        </tr>)
                    }) : null}



                </table>
            </div>

        </div>
    </div>
  )
}

export default UsersScreen