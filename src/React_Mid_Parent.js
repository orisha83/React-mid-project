import React,{Component} from 'react' 
import ChildComp from './React_mid_child'
import Utils from './React_mid_utils'
import update from 'immutability-helper'

class ParentComp extends Component
{
  constructor()
  {
    super()
    this.state = ({ users : [], posts : [], todos : [] })
  }

  async componentDidMount ()
  {
    let usersUrl = "https://jsonplaceholder.typicode.com/users"
    let TodosUrl = "https://jsonplaceholder.typicode.com/todos"
    let postsUrl = "https://jsonplaceholder.typicode.com/posts"

    let lUsers = await Utils.getAllItems(usersUrl)
    this.setState({users : lUsers})

    let lPosts = await Utils.getAllItems(postsUrl)
    this.setState({posts : lPosts})

    let lTodos = await Utils.getAllItems(TodosUrl)
    this.setState({todos : lTodos})

  } 

  updateData = (data) =>
  {
    let index = this.state.users.findIndex((x) => x.id === data.id)
    let updatedUsers = update(this.state.users, {$splice: [[index, 1, data]]});  // array.splice(start, deleteCount, item1)
    this.setState({users : updatedUsers});
  }

  deleteData = (data) =>
  {

    console.log(data)
    let newUsers = this.state.users.filter(x => x.id !== data)
    this.setState({users : newUsers})
  }

  checkTasksInTodos = (item) =>
  {
    let UserTasks = this.state.todos.filter(x => x.userId === item.id)
    let allCompleted = true
    UserTasks.forEach(function(element)
    {
      if(element.completed === false)
      {
        allCompleted = false
      }
    })
    item.completed = allCompleted  
  }

  updateTask = (taskId, userId) =>
  {
    let todoById = this.state.todos.filter(x => x.id === taskId)
    todoById[0].completed = true
    let index = this.state.todos.findIndex((x) => x.id === taskId)
    let updatedTodos = update(this.state.todos, {$splice: [[index, 1, todoById[0]]]});  // array.splice(start, deleteCount, item1)
    this.setState({todos : updatedTodos});
  }

  addNewTodo = (taksTitle,userId) =>
  {
    console.log(taksTitle + " " + userId)
    
  }

  checkCompleted = (arr) =>
  {
    arr.forEach(this.checkTasksInTodos)
  }

  render()
  {
    let shapedData = this.state.users.map(x =>
    {
      return { id : x.id , name : x.name , email : x.email , completed : false, address : x.address}
    })

    this.checkCompleted(shapedData)

    let todosData = this.state.todos.map(x =>
    {
      return { id : x.id , userId : x.userId, title : x.title, completed : x.completed}
    })

    let postsData = this.state.posts.map(x =>
      {
        return { id : x.id , userId : x.userId, title : x.title, body : x.body}
      })
    

    return(
        <div >
          <ChildComp shapedData={shapedData} todosData={todosData} postsData={postsData} callback={d => this.updateData(d)} callback2={d => this.deleteData(d)} 
            callback3={(a,b) => this.updateTask(a,b)} callback4={(a,b) => this.addNewTodo(a,b)} />
        </div>
    )
  }
}

export default ParentComp;