import React from "react";
import ReactDOM from "react-dom";
import Surveys from "../components/surveys/Surveys";
import Menu from "../components/common/Menu";

ReactDOM.render(<Menu/>, document.getElementById("menu"));
ReactDOM.render(<Surveys/>, document.getElementById("container"));