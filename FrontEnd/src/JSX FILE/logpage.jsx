import React, { useImperativeHandle, useState } from "react";
import '../App.css'
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import fail from '../assets/fail.jpg'
import tick from '../assets/tick.jpg'
import loadImg from '../assets/loader.png'
import Dashboard from "./dashboard"; 
export default function Logpage() {
    var date = new Date()
    var year = date.getFullYear()
    const [loginResponse, setLoginRepsonse] = useState(null)
    const [signUpResponse, setSignupResponse] = useState(null)
    const [disp, setDisp] = useState('login')
    const [profileData, setProfileData] = useState([])
    const {register, watch, getValues,handleSubmit, formState} = useForm({
        defaultValues : {
            'username' : '',
            'email' : '',
            'passCode' : '',
            'signname' : '',
            'signemail' : '',
            'signpasscode' : '',
            'confirmPassocode' : ''            
        },
        mode : 'onTouched'
    })
    const {errors,isSubmitting,isDirty} = formState

    function Slider() {
        disp == 'login' ? setDisp('signup') : setDisp('login')
    }

    function SignIn(data) {
        //event.preventDefault()
       
        

        //console.log(signData)
        const FetchFunc = async () => {
            var signData = JSON.stringify({
                'name' : data.username,
                'email': data.email,
                'password': data.passCode
            })
            
            console.log('fetching....')
            
            ShowLoad('show')
            function DataFunc (props) {
                var val = JSON.parse(props)
                //console.log(val.profile[0])
                if (val.found == true){
                    setLoginRepsonse(data)
                    
                    
                  
                    setTimeout(() => {
                        ShowLoad('hide')
                    },2000)
                    ShowSuccess('show')
                    setTimeout(() => {
                    ShowSuccess('hide')
                    // window.open('/#/dashboard')
                    // window.close(this)
                     
                    },4000) 
                    var  profVal = {
                        name : val.profile[0].name,
                        email : val.profile[0].email
                    }
                    console.log(profVal)
                    setProfileData(profVal)

                    
                   
                }
             
                else if(val.found == false) {
                    setTimeout(() => {
                        ShowLoad('hide')
                    },2000)
                    Showerror('show')
                    setTimeout(() => {
                    Showerror('hide')
                    },4000)

                }
            }
            
            fetch('http://127.0.0.1:8000/log/write/',
                        {method: 'POST',
                        headers:{
                            'Content-Type':'application/json'
                           },
                        body: signData})
            .then((response) => response.json() )
            .then((data) => DataFunc(data))
                
            
        }

        FetchFunc()


        
        
    
    }
    function SingUp(data) {
        const FetchFunc = async () => {
            var signData = JSON.stringify({
                'name' : data.signname,
                'email': data.signemail,
                'password': data.signpasscode
            })
            function DataFunc (props) {
                var val = JSON.parse(props)
                console.log(val.exists)
                if (val.exists == false){
                    setSignupResponse(data)
                    
                    
                    setTimeout(() => {
                        ShowLoad('hide')
                    },2000)
                    ShowSuccess('show')
                    setTimeout(() => {
                    ShowSuccess('hide')
                    },4000)

                }else if(val.exists == true) {
                    setTimeout(() => {
                        ShowLoad('hide')
                    },2000)
                    Showerror('show')
                    setTimeout(() => {
                    Showerror('hide')
                    },4000)

                }
            }
            
            console.log('sending ....')
            ShowLoad('show')
            fetch('http://127.0.0.1:8000/log/write/',
                        {method: 'PUT',
                        headers:{
                            'Content-Type':'application/json'
                           },
                        body: signData})
            .then((response) => response.json() )
            .then((data) => DataFunc(data))
        
    }

        FetchFunc()
        console.log(signUpResponse)

        // console.log(data)
    }

    const [progError,seterror] = useState(false)
    const [progSuccess,setSuccess] = useState(false)
    const [progLoad, setload] = useState(false)
    const progressSuccess = {
        display : progSuccess ? 'flex' : 'none'
    }
    const progressError = {
        display : progError ? 'flex' : 'none'
    }
    const progressLoad = {
        display : progLoad ? 'flex' : 'none'
    }
  
    const errorDiv = document.getElementsByName('errorDiv')
    const successDiv = document.getElementsByName('successDiv')
    const loadDiv = document.getElementsByName('loadDiv')

    function Showerror(props){
        if(props == 'show'){
           seterror(true)
        }else if(props == 'hide'){
            seterror(false)
        }
    }
    function ShowSuccess(props){
        if(props == 'show'){
            setSuccess(true)
        }else if(props == 'hide'){
            setSuccess(false)
        }
    }
    function ShowLoad(props){
        const loadDiv = document.getElementsByName('loadDiv')
        if(props == 'show'){
            setload(true)
        }else if(props == 'hide'){
            setload(false)
        }
    }

    // .then(() => {
    //     btn.innerHTML = 'Send';
    //     ShowLoad('hide')
    //     ShowSuccess('show')
    //     setTimeout(() => {
    //       ShowSuccess('hide')
    //     }, 2000);

        
    //   }, (err) => {
    //     btn.innerHTML = 'Send';
    //     ShowLoad('hide')
    //     Showerror('show')
    //     setTimeout(() => {
    //       Showerror('hide')
    //     }, 3000);
    //   });
    
    return (

        <>
        
         <div className=' min-h-screen bg-slate-900' id='log-host'>
               <section className="   mt-[50%] max-w-full min-w-full min-h-screen h-full " id="log-section">

                <div style={progressError} className="top-0 sticky" name='errorDiv' id="notifier">
                        <img className="w-6 animate-ping p-1.5 sm:w-8 "  src={fail} alt="" />
                    <p className="text-sm font-semibold text-red-500  sm:text-base" id="errorNot">Error</p>   
                    </div>
                    <div style={progressSuccess} className="top-0 sticky" name='successDiv' id="notifier" > 
                        <img className="w-6 sm:w-8 "  src={tick} alt="" />
                        <p className="bg-black  text-sm sm:text-base rounded-sm top-1 text-green-500 font-bold p-2 mx-auto w-fit">Successfull</p>
                </div>
                    <div style={progressLoad} className="top-0 sticky" name='loadDiv' id="notifier">
                        <img className="w-6 bg-blue-500 p-1 animate-spin sm:w-8 "  src={loadImg} alt="" />
                        <p className="bg-black animate-pulse text-sm sm:text-base rounded-sm top-1 text-blue-500 font-bold p-2 mx-auto w-fit" >Loading...</p>
                    </div>
                    <div className=" bg-slate-200 shadow-lg rounded-md shadow-white" id="logForm" >
                    { disp == 'login' ? 
                        <form noValidate  onSubmit={handleSubmit(SignIn)}  id="Form1">
                                <div>
                                    <input {...register('username',{
                                        required : 'enter username'
                                    })} type="text" placeholder="USERNAME" name="username" />
                                </div>
                                {errors.username && <p id="error">{errors.username?.message}</p>}

                                <div>
                                    <input {...register('email',{
                                        required : 'enter email',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Please enter a valid email',
                                        }
                                    })} type="email" placeholder="EMAIL" name="email" />
                                </div>
                                {errors.email && <p id="error">{errors.email?.message}</p>}

                                <div>
                                    <input {...register('passCode',{
                                        required : 'enter password'
                                        
                                    })} type="password" placeholder="PASSWORD" name="passCode" />
                                </div>
                                {errors.passCode && <p id="error">{errors.passCode?.message}</p>}

                                <div className=" disabled:bg-red-500 flex flex-row w-full justify-around">
                                    <button  type="submit" className={` cursor-pointer text-center justify-center transition-all  duration-500 min-w-[80px] text-sm text-slate-50 hover:border-[1px] hover:border-amber-500 hover:font-bold hover:bg-transparent hover:text-amber-500 p-1 rounded-sm bg-sky-800 `} >Log-In</button>
                                </div>
                        </form> : 
                        <form noValidate  onSubmit={handleSubmit(SingUp)} id="Form2">
                                <div>
                                    <input {...register('signname',{
                                        required : 'enter signUp username'
                                    })}  type="text" placeholder="USERNAME" name="signname" />
                                </div>
                                {errors.signname && <p id="error">{errors.signname?.message}</p>}
                                <div>
                                    <input {...register('signemail',{
                                        required : 'enter signUp email',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Please enter a valid email',
                                        }
                                    })} type="email" placeholder="EMAIL" name="signemail" />
                                </div>
                                {errors.signemail && <p id="error">{errors.signemail?.message}</p>}

                                <div>
                                    <input {...register('signpasscode',{
                                        required : 'enter signUp password',
                                        minLength : {
                                            value : 10,
                                            message : 'enter more characters'
                                        }
                                    })} type="password" placeholder="PASSWORD" name="signpasscode" />
                                </div>
                                {errors.signpasscode && <p id="error">{errors.signpasscode?.message}</p>}

                                <div>
                                    <input {...register('confirmPassocode',{
                                        validate: (value) => value === watch('signpasscode') || "Passwords do not match"
                                    })} type="password" placeholder="CONFIRM-PASSWORD" name="confirmPassocode" />
                                </div>
                                {errors.confirmPassocode && <p id="error">{errors.confirmPassocode?.message}</p>}

                                <div className=" disabled:bg-opacity-30 mt-1 flex flex-row w-full justify-around">
                                    <button  type="submit" className={` cursor-pointer text-center justify-center   transition-all duration-500 min-w-[80px] text-sm text-slate-50 hover:font-bold hover:bg-transparent hover:text-amber-500 p-1 rounded-sm bg-sky-800 `} >Sign-Up</button>
                                </div>
                        </form>
                    }
                    <div>
                        <blockquote className=" mt-2 flex flex-row gap-2">
                            <span onClick={Slider} className={ ` transition-all duration-500 ${disp == 'login' ? 'text-green-500' : ''} italic font-serif cursor-not-allowed`}>Log-in</span>
                            <div className=" min-w-[60px] flex flex-row align-middle justify-start h-[20px] rounded-md bg-green-600">
                                <span  onClick={Slider} className={` ${disp == 'login' ? 'translate-x-0' : 'translate-x-10'} transition-all duration-500 my-auto rounded-full p-2 h-1 min-w-3 bg-red-600 `}></span>
                            </div>
                            <span onClick={Slider} className={ ` cursor-pointer transition-all duration-500 ${disp == 'signup' ? 'text-green-500' : ''} italic font-serif cursor-not-allowed`}>Sign-up</span>
                        </blockquote>
                    </div>
                    
                    </div>
                </section> 
              <footer className=" text-slate-100 px-4 font-semibold w-full text-center">
                    <blockquote className="  text-center text-sm inline mx-auto align-middle justify-center1">
                        All Rights Reserved. &#169; Copyright {year} | Designed by <a className=" inline-flex underline" href="https://briannjuguna.netlify.app/">Brian Njuguna</a>
                    </blockquote>
                </footer>  
            </div> 
          
        

        
        </>
    )
}