import Tabs from "../Tabs/Tabs";
import "./TabContainer.scss";
import { useState } from "react";

interface ComponentElement {
  index: number;
  tabName: string;
  component: () => JSX.Element;
}

interface ContainerProps {
  list: ComponentElement[];
}

const TabContainer: React.FC<ContainerProps> = ({ list }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    console.log("HELLO", index);
  };

  let tablist = [
    {
      index: 0,
      text: "phoneme count",
    },
    {
      index: 1,
      text: "phone count",
    },
    {
      index: 2,
      text: "cvs import",
    },
  ];

  interface VisibleComponentProps {
    activeTab: number;
    index: number;
    component: () => JSX.Element;
  }

  function VisibleComponent(props: VisibleComponentProps) {
    if (props.activeTab === props.index) {
      return (
        <div key={props.index}>
          <props.component />
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div>
      <div className="tab-container">
        {list.map((member) => (
          <Tabs
            key={member.index}
            index={member.index}
            text={member.tabName}
            isActive={activeTab === member.index}
            onClick={handleTabClick}
          ></Tabs>
        ))}
      </div>
      <div className="container">
        {list.map((member) => (
          <VisibleComponent
            key={member.index}
            activeTab={activeTab}
            index={member.index}
            component={member.component}
          />
        ))}
      </div>
    </div>
  );
};

export default TabContainer;
