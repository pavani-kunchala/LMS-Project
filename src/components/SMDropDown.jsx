//src\components\SMDropDown.jsx
import "../style/SMDropDown.css";

 export default function SMDropDown(props) {
  let { option, name, fnName, value } = props;
  return (
    <select name={name} onChange={fnName} value={value}>
      <option value="">-- Select a course --</option>
      {option &&
        option.map((val, index) => (
          <option value={val} key={index}>
            {val}
          </option>
        ))}
    </select>
  );
}
