const Input = ({ label, type, id, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-600 font-semibold mb">
        {/* //htmlFor means that the label is associated with the input field by id  */}
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        autoComplete="off"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        {...props} // this will pass all the props to the input field
      />
    </div>
  );
};
export default Input;
