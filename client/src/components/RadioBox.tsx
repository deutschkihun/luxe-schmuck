import React, { useState } from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

interface Props {
  list: { _id: number; name: string }[];
  handleFilters: (filters: { categories: []; brand: [] }) => void;
}

export const RadioBox = (props: Props): JSX.Element => {
  const [Value, setValue] = useState(0);
  const renderRadioBox = () =>
    props.list &&
    props.list.map((value) => (
      <Radio key={value._id} value={value._id}>
        {" "}
        {value.name}{" "}
      </Radio>
    ));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setValue(e.target.value);
    //props.handleFilters([e.target.value]);
  };

  return (
    <Collapse defaultActiveKey={["0"]}>
      <Panel header="Brand" key="1">
        <Radio.Group onChange={() => handleChange} value={Value}>
          {renderRadioBox()}
        </Radio.Group>
      </Panel>
    </Collapse>
  );
};
