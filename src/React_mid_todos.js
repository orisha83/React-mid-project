import React,{Component} from 'react' 
import Utils from './React_mid_utils'
import './React_mid_project.css'



class TodosComp extends Component
{
  constructor()
  {
    super()
    this.state = {userTodo : []}
  }

  static getDerivedStateFromProps(props,state)
  {
    // Checked if the CURRENT props different from the new props..
    if(props.userTodo !=  state.userTodo)
    {
      //this.setState({shapedDataAfterSearch : this.state.shapedData})
      return {userTodo : props.userTodo};
    }
    else
    {
      return null
    }
  }

  markComplete = () =>
  {
    this.props.callback4(this.state.userTodo.id, this.state.userTodo.userId)
  }
  
  render()
  {
    let todosStyle = "todosStyle"
    let completedVisibility = ""
    if(this.state.userTodo.completed == false)
    {
      completedVisibility = "completedVisible"
    }
    else
    {
      completedVisibility = "completedHide"
    }

    return(
      <div>
     <div className={todosStyle}>
       Title : {this.state.userTodo.title}<br/>
       Completed : {this.state.userTodo.completed.toString()}  
       <input type="button" value="Mark Completed" style={{backgroundColor : "yellow"}}  className={completedVisibility} onClick={this.markComplete}/>
     </div> <br/>
     </div>
    )
  }
}

export default TodosComp;