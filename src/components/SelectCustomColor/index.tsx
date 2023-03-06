import { useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker, ChromePicker } from "react-color";

export interface SelectCustomColorProps {
  customColor: string;
  setCustomColor: (color: string) => void;
}

function SelectCustomColor({
  setCustomColor,
  customColor,
}: SelectCustomColorProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    setCustomColor(color.hex);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "20px",
        height: "20px",
        borderRadius: "1px",
        background: customColor || "#ffffff",
      },
      swatch: {
        padding: "2px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute" as any,
        zIndex: "2",
      },
      cover: {
        position: "fixed" as any,
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <ChromePicker color={customColor} onChangeComplete={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

export default SelectCustomColor;
