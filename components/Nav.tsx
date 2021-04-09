import { useInterpret } from '@xstate/react';
import { useEffect, useRef } from 'react';
import { toggleMachine } from '../state/toggle';
import anime from 'animejs';

export default function Navbar() {
  const addButtonRef = useRef(null);
  // const [disabled, setDisable] = useState(false);
  
  useEffect(()=>{
    toggleService.onTransition((state) => {
      animate(state.value);
    })
  },[]);
  

  function animate(status: any){
    const timeLine = anime.timeline();
    // disableButton(true);
    if(status === 'active'){
      timeLine.add({
        targets: addButtonRef.current,
        translateY: [0,-12,0],
        scale: [1,0.85,1],
        rotate: 316,
        duration: 600,
        easing: 'easeInOutSine'
      })
      .add({
        targets: '.note-selectors .first',
        translateY: [0,80],
        scaleY: [1.8,1],
        duration: 3200,
      },
       "-=400"
      )
      .add({
          targets: '.note-selectors .other',
          translateY: function (el:any) {
            return [el.getAttribute('data-from'),el.getAttribute('data-to')]
          },
          scaleY: [0,1],
          duration: 1600,
          opacity:{
            value: 1,
            duration: 10,
          },
          delay: anime.stagger(240),
          complete: function () {
            // disableButton(false);
          }
      }, "-=2600");
    }else if(status === 'inactive'){
      timeLine.add({
        targets: addButtonRef.current,
        rotate: 0,
        duration: 600,
        easing: 'easeInOutSine'
      })
      .add({
        targets: '.note-selectors .selector',
        translateY: function (el:any) {
          return [el.getAttribute('data-to'), 0]
        },
        duration: 400,
        delay: anime.stagger(60),
        easing: 'easeInOutSine'
      },"-=400")
      .add({
        targets: addButtonRef.current,
        rotate: -360,
        translateY: [0,-12,0],
        scale: [1,0.85,1],
        duration: 600,
        easing: 'easeInOutSine'
      },"-=400")
    }
  }



  const toggleService = useInterpret(toggleMachine);
  const toggle = () => {
    toggleService.send('TOGGLE')
  }

  return(
    <div className="nav">
          <div className="logo">
            <h4>YANA</h4>
          </div>
          <div className="notes-container">
            <div className="add-button">
              <button id="addNote" onClick={toggle} ref={addButtonRef}>
                <img src="./plus.svg" alt="Plus Icon" />
              </button>
            </div>
            <div className="note-selectors">
              <div className="selector first"
                data-from="0" data-to="80"
              ></div>
              <div className="selector second other"
                data-from="100" data-to="140"
              ></div>
              <div className="selector third other"
                data-from="160" data-to="200"
              ></div>
              <div className="selector fourth other"
                data-from="220" data-to="260"
              ></div>
              <div className="selector fifth other"
                data-from="280" data-to="320"
              ></div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="gooey-effect">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                  result="gooey-effect"
                />
                <feComposite
                  in="SourceGraphic"
                  in2="gooey-effect"
                  operator="atop"
                />
              </filter>
              </defs>
            </svg>
        </div>
  )
}