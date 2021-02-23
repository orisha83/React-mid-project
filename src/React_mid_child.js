import React,{Component} from 'react' 
import UserComp from './React_mid_userComp.js'
import TodosComp from './React_mid_todos'
import PostsComp from './React_mid_posts'
import './React_mid_project.css'




class ChildComp extends Component
{
  constructor()
  {
    super()
    this.state = {shapedData : [], searchText : '', shapedDataAfterSearch : [], todosData : [], postsData : [], showTodos : false, requestedUser : 0, newTodoToAdd : false,
    newTask : "", newPostToAdd : false, newPostTitle : "", newPostBody : "", addNewUserScreen : false, newUserName : "", newUserEmail : ""}
  }

  static getDerivedStateFromProps(props,state)
  {
    // Checked if the CURRENT props different from the new props..
    if(props.shapedData !==  state.shapedData || props.todosData !== state.todosData || props.postsData !== state.postsData)
    {
      return {shapedData : props.shapedData, shapedDataAfterSearch : props.shapedData,
              todosData : props.todosData,
              postsData : props.postsData};
    }
    else
    {
      return null
    }
  }

  addTodo =  () =>
  {
     this.setState({newTodoToAdd : true})
  }

  backToTodo =  () =>
  {
     this.setState({newTodoToAdd : false})
  }

  addPost =  () =>
  {
     this.setState({newPostToAdd : true})
  }

  backToPost =  () =>
  {
     this.setState({newPostToAdd : false})
  }

  addUser =  () =>
  {
     this.setState({addNewUserScreen : true})
  }

  backToPostsAndTodos =  () =>
  {
     this.setState({addNewUserScreen : false})
  }


  

  searchUsers = () =>
  {
    let filteredUsers = []
    this.state.shapedData.map((item) =>
    {
      let text = this.state.searchText.toUpperCase()
      if(item.name.toUpperCase().includes(text) || item.email.toUpperCase().includes(text))
      {
        filteredUsers.push(item)
      }
      
      return 
    })
    
    this.setState({shapedDataAfterSearch : filteredUsers})
  }

  textChange =  (e) =>
  {
     this.setState({searchText : e.target.value})
    this.searchUsers()
  }

  updateData = (data) =>
  {
    this.props.callback(data)
  }

  deleteData = (data) =>
  {
    this.props.callback2(data)
  }

  todosAndPosts =  (data) =>
  {
     this.setState({requestedUser : data})
     this.setState({showTodos : true})
  }

  AddNewTodo = () =>
  {
    this.props.callback4(this.state.newTask, this.state.requestedUser)
  }

  AddNewPost = () =>
  {
    this.props.callback4(this.state.newTask, this.state.requestedUser)
  }

  updateTaskToComplete = (taskId, userId) =>
  {
    this.props.callback3(taskId, userId)
  }

  todoScreen = () =>
  {
    let userTodo = ""
    if(this.state.newTodoToAdd === false)
    {
      let userTodos = this.state.todosData.filter(x => x.userId === this.state.requestedUser)
      userTodo = userTodos.map(item =>
        {
          return <TodosComp key={item.Id} userTodo={item} callback4={(a,b) => this.updateTaskToComplete(a,b)}/>
        })
    }
    else
    {
      userTodo = <label>Title: <input type="text" onChange={e => this.setState({newTask : e.target.value})}/><br/>
                  <input type="button" value="Cancel" style={{backgroundColor : "yellow"}} onClick={this.backToTodo}/>
                  <input type="button" value="Add" style={{backgroundColor : "yellow"}} onClick={this.AddNewPost}/>
                  </label>
    }

    return userTodo
  }


  PostScreen = () =>
  {
    let userPost = ""
    if(this.state.newPostToAdd === false)
    {
      let userPosts = this.state.postsData.filter(x => x.userId === this.state.requestedUser)
      userPost = userPosts.map(item =>
        {
          return <PostsComp key={item.Id} userPost={item}/>
        })
    }
    else
    {
      userPost = <label>Title: <input type="text" onChange={e => this.setState({newPostTitle : e.target.value})}/><br/>
                        Body : <input type="text" onChange={e => this.setState({newPostBody : e.target.value})}/><br/>
                  <input type="button" value="Cancel" style={{backgroundColor : "yellow"}} onClick={this.backToPost}/>
                  <input type="button" value="Add" style={{backgroundColor : "yellow"}} />
                  </label>
    }

    return userPost
  }

  todosAndPostScreenFunc = () =>
  {
    let localTodosAndPostScreen = ""

    if(this.state.addNewUserScreen === false)
    {
      let userTodo = this.todoScreen() 
      let userPost = this.PostScreen()
      let todosVisibillity = this.state.showTodos ? 'displayTododAndPost' : 'hideTodosAndPosts'
      localTodosAndPostScreen = <div className={todosVisibillity} >
            Todos - User {this.state.requestedUser} {"  "}
            <div>
              <input type="button" value="Add" style={{backgroundColor : "yellow"}} onClick={this.addTodo}/>
              <div className="flex-child2">
                {userTodo}
              </div>
            </div>
              <br/>
              Posts - User {this.state.requestedUser}{"  "}
            <div>
              <input type="button" value="Add" style={{backgroundColor : "yellow"}} onClick={this.addPost}/>
                <div className="flex-child2"> 
                  {userPost}
                </div>
            </div>
          </div>
    }
    else
    {
      localTodosAndPostScreen = <div className="flex-child2"> 
                                <label>Name: <input type="text" onChange={e => this.setState({newUserName : e.target.value})}/><br/>
                                       Email : <input type="text" onChange={e => this.setState({newUserEmail : e.target.value})}/><br/>
                                <input type="button" value="Cancel" style={{backgroundColor : "yellow"}} onClick={this.backToPostsAndTodos}/>
                                <input type="button" value="Add" style={{backgroundColor : "yellow"}} />
                               </label>
                              </div>
    }

    return localTodosAndPostScreen
  }

  
  render()
  {
    let usersComp = this.state.shapedDataAfterSearch.map(item =>
    {
      return <UserComp key={item.id} shapedDataToPass={item} callback={d => this.updateData(d)} callback2={d => this.deleteData(d)} callback3={d => this.todosAndPosts(d)}/>
    })

    let todosAndPostScreen = this.todosAndPostScreenFunc()

    return(
     <div className='flex-container'>
       <div className="flex-child1">
          Search <input type="text" onChange={this.textChange}/>
          <input  type="button" style={{backgroundColor : "yellow"}} value="Add" onClick={this.addUser}/>
          {usersComp}
        </div>
          {todosAndPostScreen}        
     </div>
    )
  }
}

export default ChildComp;