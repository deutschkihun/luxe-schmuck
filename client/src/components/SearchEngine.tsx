import React, { useState } from "react";
import { SearchBox } from "../helper/lib";

interface Props {
  refreshFunction: (newSearchTerm: string) => void;
}

export const SearchEngine = (props: Props): JSX.Element => {
  const [SearchTerm, setSearchTerm] = useState("");
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };

  return <SearchBox onChange={searchHandler} value={SearchTerm} />;
};
