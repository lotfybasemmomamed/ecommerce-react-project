import Cookies  from 'universal-cookie'
import axios from 'axios'

const cookie =new Cookies()
const baseUrl = 'http://127.0.0.1:8000/api'
const authConfig ={headers:{
    Authorization:`Bearer ${cookie.get("Bearer")}`
}}
export const ShowUsers =()=>axios.get(`${baseUrl}/users`,authConfig)