import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import './ButtonContainer.css'


/** ButtonContainer
 * 
 * Props: 
 *  - none
 * State:
 *  - counter : Number
 *  - origin : String
 *  - loading (boolean)
 *  - clicked (boolean)
 * 
 * App -> ButtonContainer 
 */

const ButtonContainer = () => {
  const [counter, setCounter] = useState(0);
  const [origin, setOrigin] = useState('');
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const abortController = useRef(null);


  //*effect to add 1 to counter and update local storage with origin when clicked changed*/

  useEffect(() => {
    setCounter(counter => counter + 1);
    const savedOrigin = localStorage.getItem("orig")
    setOrigin(savedOrigin)
  }, [clicked]);
//******************************************************************************************************** */
  
  //* effect to call api runs when clicked variable changes 
  useEffect(() => {
    const fetchData = async () => {
      //! if button is clicked makes the request
    if (clicked) 
    try {
      setLoading(true)
      // abour logic
      abortController.current = new AbortController();
      let signal = abortController.current.signal;
      // const res = await axios.get('https://httpbin.org/status/400', { signal });
      const res = await axios.get('https://httpbin.org/delay/4', { signal });

      //! saved origin in local storage when new origin comes from api
      localStorage.setItem("orig", res.data.origin);
      setOrigin(res.data.origin);
      setLoading(false);
      setClicked(false);
    } catch (err) {
      setLoading(false);
      setClicked(false);
      console.warn(err);
      };
    };
    fetchData();
    //* this func will run when the button comp unmounts (clean up function)
    return () => {
      abortController.current && abortController.current.abort()
    };
  },[clicked])


// fn to handle Cancel button click.
  const handleCacel = () => { 
    setLoading(false)
    setClicked(false)
    abortController.current && abortController.current.abort();
  }

  // fn to handle Click Me button click.
  const handleClick = () => setClicked(true);


  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="buttonContainer-btn"
      >
        {loading ? "Click Me (loading)" :"Click Me" }
      </button>
      <button
        disabled={!loading}
        onClick={handleCacel}
        className="buttonContainer-btn"
      >
        Cancel
      </button>
      <br />
      <div className="buttonContainer-div">
        Renders: <span className='buttonContainer-span'>&nbsp;{counter}</span>
        <br />
        <br />
        Origin:<span className='buttonContainer-span'>&nbsp;{origin}</span>
      </div> 
    </div>
  )
}

export default ButtonContainer;