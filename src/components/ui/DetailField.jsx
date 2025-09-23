const DetailField = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-xs font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      readOnly
      className="h-[50px] border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
    />
  </div>
);

export default DetailField;
