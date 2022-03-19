import React, { useState } from "react";
import { Collapse, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
const { Panel } = Collapse;

interface Props {
  list: { _id: number; name: string }[];
  handleFilters: (filters: { categories: []; brand: [] }) => void;
}

export const RadioBox = (props: Props): JSX.Element => {
  const [value, setvalue] = useState<number>(0);
  const renderRadioBox = () =>
    props.list.map((value) => (
      <Radio name={value.name} key={value._id}>
        {value.name}
      </Radio>
    ));
  const handleChange = (e: RadioChangeEvent): void => {
    console.log(e.target);
    //console.log(e.target.value);
    //setValue(e.target.value);
    //props.handleFilters();
  };

  return (
    <Collapse defaultActiveKey={["0"]}>
      <Panel header="Brand" key="1">
        <Radio.Group onChange={handleChange} value={value}>
          {renderRadioBox()}
        </Radio.Group>
      </Panel>
    </Collapse>
  );
};
