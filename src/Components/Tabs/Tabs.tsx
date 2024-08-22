import "./Tabs.scss";

interface TabProp {
  index: number;
  text: string;
  isActive: boolean;
  onClick: (index: number) => void;
}

function Tabs(props: TabProp) {
  return (
    <div
      className={"abeezee-regular tab " + (props.isActive ? "active" : "")}
      onClick={() => props.onClick(props.index)}
    >
      <span className="tab-text">{props.text}</span>
    </div>
  );
}

export default Tabs;
