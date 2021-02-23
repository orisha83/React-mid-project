import React,{Component} from 'react' 
import Utils from './React_mid_utils'
import style from './React_mid_project.css'


class UserComp extends Component
{
  constructor()
  {
    super()
    this.state= {isVisible : false, shapedData : [], id : 0, name : "", email : "", city : "", street : "", zipcode : 0, completed : false, background : "", userClick : false}
  }

  static getDerivedStateFromProps(props,state)
  {
    // Checked if the CURRENT props different from the new props..
    if(props.shapedDataToPass !=  state.shapedData)
    {
      //this.setState({shapedDataAfterSearch : this.state.shapedData})
      return {shapedData : props.shapedDataToPass, 
              id : props.shapedDataToPass.id,
              name : props.shapedDataToPass.name,
              email : props.shapedDataToPass.email,
              city : props.shapedDataToPass.address.city,
              street : props.shapedDataToPass.address.street,
              zipcode : props.shapedDataToPass.address.zipcode,
              completed : props.shapedDataToPass.completed};
    }
    else
    {
      return null
    }
  }

  otherDataOn = () =>
  {
    if(this.state.isVisible == false)
    {
      this.setState({isVisible : !this.state.isVisible})
    }
  }

  otherDataLeave = () =>
  {
    if(this.state.isVisible == true)
    {
      this.setState({isVisible : !this.state.isVisible})
    }
  }

  sendData = () =>
  {
    let address = {street : this.state.street, city : this.state.city, zipcode : this.state.zipcode}
    let updatedShapedData = {id : this.state.id, name : this.state.name, email : this.state.email, completed : this.state.completed, address : address}
    this.props.callback(updatedShapedData)
  }

  updateData = async (e) =>
  {
    const { value, name } = e.target;
    await this.setState({[name] : value})
  }

  delete = () =>
  {
    this.props.callback2(this.state.id)
  }



  userClicked = () =>
  {
    if(this.state.userClick == false)
    {
      this.setState({background : "backgroundStyleOrange"})
      this.setState({userClick : true})
      this.props.callback3(this.state.id)
    }
    else
    {
      this.setState({background : "backgroundStyleWhite"})
      this.setState({userClick : false})
    }
  }

  render()
  {
    let id = this.state.id
    let name = this.state.name
    let email = this.state.email
    let street = this.state.street
    let city = this.state.city
    let zip = this.state.zipcode
    let mystyle = "redUserStyle"
    let visibleStyle = this.state.isVisible ? 'visibleStyle' : 'hideStyle'
    let otherData = <div className={visibleStyle}>
                    Street : <input type='text' value={street}  name="street" onChange={this.updateData}/><br/>
                    City : <input type='text' value={city}  name="city" onChange={this.updateData}/><br/>
                    Zip Code : <input type='text' value={zip} name="zipcode" onChange={this.updateData}/><br/>
                  </div>

    if(this.state.completed == true)
    {
      mystyle = "greenUserStyle"
    }
   
    return(
     <div >   
       <form className={`${mystyle} ${this.state.background}`} >
        <label onClick={this.userClicked} for="ID">ID: </label> {id}<br/>
          Name: <input type='text' value={name} name="name" onChange={this.updateData}/><br/>
          Email: <input type='text' value={email} name="email" onChange={this.updateData}/><br/>
          <input style={{backgroundColor : "grey"}} type='button' value='Other Data' onClick={this.otherDataLeave} onMouseOver={this.otherDataOn}/>{"              "}
          {otherData}
          <input style={{backgroundColor : "yellow"}} type='button' value='Update' onClick={this.sendData}/>{" "}
          <input style={{backgroundColor : "yellow"}} type='button' value='Delete' onClick={this.delete}/>
        </form>
        <br/>
     </div>
    )
  }
}

export default UserComp;