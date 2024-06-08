type DisplayType = {
  text: string;
};

const Display = ({ text }: DisplayType) => (
  <div className="displayComponent">{text}</div>
);

export default Display;
