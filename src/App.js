
import './App.css';
import { useState } from 'react';
import ButtonContainer from './components/ButtonContainer';


/** App
 * 
 * Props:
 *  - none
 * 
 * State:
 *  - checked (boolean)
 * App -> { ButtonContainer }
 */

const App = () => {
  const [checked, setChecked] = useState(true);

  // fn to handle render button check.
  const handleCheck = () => setChecked(!checked);

  return (
    <div className='main-App'>
      <label htmlFor="checkbox" className='checkboxLabel'>Render button</label>
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        onClick={handleCheck}
        defaultChecked={true}
        className= {checked ? 'checked' : 'unchecked'}
      />
      {checked && <ButtonContainer />}
    </div>
  );
}

export default App;
