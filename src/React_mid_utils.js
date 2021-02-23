import axios from 'axios'

const getAllItems = async function(url)
{
  let user = await axios.get(url)
  return user.data
}

const getShapedData = async function ()
{
let userId = 1
  let usersUrl = "https://jsonplaceholder.typicode.com/users"
    let TodosUrl = "https://jsonplaceholder.typicode.com/todos"
    let postsUrl = "https://jsonplaceholder.typicode.com/posts"

let userData = await getSpecificItems(usersUrl, userId)
let name = userData.name
let email = userData.email

let todosData = await getAllItems(TodosUrl)
let userTodos = todosData.filter(x => x.userId === userId)
let userTitles = userTodos.map(x => x.title)
userTitles = userTitles.slice(0, 5);

let postsData = await getAllItems(postsUrl)
let userPosts = postsData.filter(x => x.userId === userId)
let userPostsTitles = userPosts.map(x => x.title)
userPostsTitles = userPostsTitles.slice(0, 1);

  return {name , email, userTitles, userPostsTitles}
}






const getSpecificItems = async function(url, userId)
{
  let user = await axios.get(url+ '/' + userId)
  return user.data
}



const updateItem = async function(url, userId ,obj)
{
  let res = await axios.put(url+ '/' + userId, obj)
  return res
} 


export default {getAllItems, getShapedData, getSpecificItems, updateItem}
