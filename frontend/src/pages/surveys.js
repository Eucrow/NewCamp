import React from "react";
import ReactDOM from "react-dom";
import Survey from "../components/Surveys";
import Menu from "../components/Menu";

ReactDOM.render(<Menu/>, document.getElementById("menu"));
ReactDOM.render(<Survey/>, document.getElementById("container"));