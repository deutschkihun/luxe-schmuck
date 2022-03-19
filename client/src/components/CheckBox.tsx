import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import { CheckList } from "../helper/lib";
const { Panel } = Collapse;

interface Props {
  list: { _id: number; name: string }[];
  handleFilters: (filters: { categories: []; brand: [] }) => void;
}

export const CheckBox = (props: Props): JSX.Element => {
  const [Checked, setChecked] = useState([]);
  /*const handleToggle = (value: Props) => {
    const currentIndex = Checked.indexOf(value.name as never);
    const newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(value as never);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };*/

  const renderCheckboxLists = () =>
    props.list.map((value, index: number) => (
      <React.Fragment key={index}>
        <Checkbox
          checked={Checked.indexOf(value._id as never) === -1 ? false : true}
        />
        <CheckList>{"  " + value.name + "  "}</CheckList>
      </React.Fragment>
    ));

  return (
    <Collapse defaultActiveKey={["0"]}>
      <Panel header="Categories" key="1">
        {renderCheckboxLists()}
      </Panel>
    </Collapse>
  );
};
