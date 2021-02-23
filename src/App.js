import './App.css';
import ParentComp from './React_Mid_Parent'
import React,{Component} from 'react' 

class App extends Component
{
  constructor()
  {
    super()
  }

  render()
  {
    return(
      <div >
          <ParentComp />
         
      </div>
    )
  }
}

export default App;
