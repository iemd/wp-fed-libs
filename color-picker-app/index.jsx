/**
 * 6. Build a Color Picker App
 */
const { useState } = React;

export const ColorPicker = () => {
    const [color, setColor] = useState("#ffffff");

    const handleChange = (event) => {
        setColor(event.target.value);
    }
    
    return (
        <div id="color-picker-container" style={{ backgroundColor: color }}>
            <input type="color" id="color-input" value={color} onChange={handleChange} />
        </div>
    );
};
