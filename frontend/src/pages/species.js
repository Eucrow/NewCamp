import React from "react";
import ReactDOM from "react-dom";
import Menu from "../components/common/Menu";
import Species from "../components/species/Species";

ReactDOM.render(<Menu/>, document.getElementById("menu"));
ReactDOM.render(<Species/>, document.getElementById("container"));
