import React from "react";
import { Button, Space } from "antd";

interface Props {
  type: "primary" | "link";
  styles?:any;
  label:String;
  onClick?:()=>void;
}

const ButtonComp: React.FC<Props> = ({ type,styles, label,onClick}) => {

  const finalStyle ={...styles ,height:60 ,width:100, borderRadius:20};
  
  return (
    <Space wrap>
      <Button type={type} style={finalStyle} onClick={onClick}> {label}</Button>
    </Space>
  );
};

export default ButtonComp;
