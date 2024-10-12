import { RotatingLines } from "react-loader-spinner";

export const RotatingLinesVSD = ()=>{
    
  
    return (
      <RotatingLines
      visible={true}
      height="96"
      width="25"
      color= "#grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
    )
  }