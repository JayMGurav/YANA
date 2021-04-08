import { useEffect, useState } from "react";

export default function scrollToTop(){
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  useEffect(()=>{
    const checkVisiblity = () => {
      if(window.pageYOffset > window.innerHeight){
        setIsBtnVisible(true);
      }else{
        setIsBtnVisible(false);
      }
    }

    window.addEventListener('scroll', checkVisiblity);

    return () => window.removeEventListener('scroll', checkVisiblity);

  },[]);


  const scrollToTop = () => {
    if(window && isVisible){
      window.scrollTo({
        top: 0,
        behavior:"smooth"
      });
    }
  }


  return [isBtnVisible, scrollToTop];
}