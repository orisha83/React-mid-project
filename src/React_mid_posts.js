import React,{Component} from 'react' 
import Utils from './React_mid_utils'
import './React_mid_project.css'



class PostsComp extends Component
{
  constructor()
  {
    super()
    this.state = {userPost : []}
  }

  static getDerivedStateFromProps(props,state)
  {
    // Checked if the CURRENT props different from the new props..
    if(props.userPost !=  state.userPost)
    {
      //this.setState({shapedDataAfterSearch : this.state.shapedData})
      return {userPost : props.userPost};
    }
    else
    {
      return null
    }
  }
  
  render()
  {
    let todosStyle = "todosStyle"

    return(
      <div>
     <div className={todosStyle}>
       Title : {this.state.userPost.title}<br/>
       Body : {this.state.userPost.body}
     </div> <br/>
     </div>
    )
  }
}

export default PostsComp;