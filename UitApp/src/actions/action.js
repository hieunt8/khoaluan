import * as types from './ActionTypes';
import * as link from '../api/ApiLink';
import callApi from '../api/ApiCaller';

const Realm = require('realm');
import DEFAULT_KEY from '../api/Config'
import { userSchema, GroupSchema, listuserSchema } from '../models/Realm'
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema], encryptionKey: DEFAULT_KEY });


//compensatory
export const responseCompensatory=(data)=>{ //POST StudenID && Reponse Data from Student ID
  return dispatch=>{
      return callApi(link.compensatory,'POST',{data:data}).then(res=>{
          // console.log("dsadsadasd", res.data);
          dispatch(saveCompensatory(res.data));
      })
  }
}

export const saveCompensatory = (data) => {
  return {
    type: types.SAVE_COMPENSATORY,
    payload: data
  }
}

//SAVE_COMMENT
export const responseComment=(data)=>{ //POST StudenID && Reponse Data from Student ID
  return dispatch=>{
      return callApi(link.comment,'POST',{data: data}).then(res=>{
        //console.log(res.data)
       //
      })
  }
}

export const saveComment = (data) => {
  return {
    type: types.SAVE_COMMENT,
    payload: data
  }
}

//vSELECT_RESCOMMENT
export const responseResComment=(data)=>{ //POST StudenID && Reponse Data from Student ID
  return dispatch=>{
      return callApi(link.rescomment,'POST',{data:data}).then(res=>{
        //  console.log(res.data)
          dispatch(saveResComment(res.data));
      })
  }
}

export const saveResComment = (data) => {
  return {
    type: types.SAVE_RESCOMMENT,
    payload: data
  }
}

//SAVE_CHATREAL
export const responseChatreal=(data)=>{ //POST StudenID && Reponse Data from Student ID
  return dispatch=>{
      return callApi(link.chatreal,'POST',{data:data}).then(res=>{
          dispatch(saveChatreal(res.data));
      })
  }
}

export const saveChatreal = (data) => {
  return {
    type: types.SAVE_CHATREAL,
    payload: data
  }
}

// daa_Croom
export const responseDaaCroom=(data)=>{ //POST StudenID && Reponse Data from Student ID
  return dispatch=>{
    //console.log('data resques: ', data);
      return callApi(link.daaCroom,'POST',{data:data}).then(res=>{
          //console.log('data tu api: ', res.data);
          dispatch(saveCroom(res.data));
      })
  }
}

export const saveCroom = (data) => {
  return {
    type: types.SAVE_DAA_CROOM,
    payload: data
  }
}


export const responseLogin=(data)=>{ //POST StudenID && Reponse Data from Student ID
  return dispatch=>{
    //console.log('data resques: ', data);
      return callApi(link.newlogin,'POST',{data:data}).then(res=>{
          //console.log('data tu api: ', res.data);
          dispatch(saveAccount(res.data));
      })
  }
}

export const saveAccount = (data) => {
  return {
    type: types.SAVE_ACCOUNT,
    payload: data
  }
}


export const responseDeadline=(data)=>{ //POST StudenID && Reponse Data from Student ID
  return dispatch=>{
      return callApi(link.deadline,'POST',{data:data}).then(res=>{
        //  console.log('data tu api: ', res.data);
          dispatch(saveDeadline(res.data));
      })
  }
}

export const saveDeadline = (data) => {
  return {
    type: types.SAVE_DEADLINE,
    payload: data
  }
}

export const responseSchedule=(data)=>{ //POST StudenID && Reponse Data from Student ID
  return dispatch=>{
    //console.log('data resques: ', student_id);
      return callApi(link.schedule,'POST',{data: data}).then(res=>{
          //console.log('data tu api: ', res.data);
          dispatch(saveSchedule(res.data));
      })
  }
}

export const saveSchedule = (data) => {
  return {
    type: types.SAVE_SCHEDULE,
    payload: data
  }
}



export const responseEschedule=(student_id)=>{ //POST StudenID && Reponse Data from Student ID
  return dispatch=>{
    //console.log('data resques: ', student_id);
      return callApi(link.eschedule,'POST',{student_id:student_id}).then(res=>{
         // console.log('data tu api: ', res.data);
          dispatch(saveEschedule(res.data));
      })
  }
}

export const saveEschedule = (data) => {
  return {
    type: types.SAVE_ESCHEDULE,
    payload: data
  }
}

export const saveDate = (data) => {
  return {
    type: types.SELECT_DATE,
    payload: data
  }
}



//CreateGroup
export const responseCreategroup = (data) => {
  return dispatch => {
    // console.log("Send create group"); 
    return callApi(link.creategroup, 'POST', { data: data }).then(res => {
    //  console.log('group',  data);
    })
  }
}
export const getDataFromCreategroup = (data) => {
  return dispatch => {
    return callApi(link.getdatacg, 'GET', null).then(res => {
      // console.log(res.data);
      dispatch(saveCreategroup(res.data));
    })
  }
}

export const saveCreategroup = (data) => {
  return {
    type: types.SAVE_CREATEGROUP,
    payload: data
  }
}