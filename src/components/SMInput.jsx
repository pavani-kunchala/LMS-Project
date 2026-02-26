import "../style/SMInput.css";
//used in rc\screen\public-registration-form\StudentRegisterForm.jsx
export default function SMInput(props) {
  let { type, placeholder, name, fnName, condition, value } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={fnName}
      required={condition}
      value={value}
    />
  );
}
