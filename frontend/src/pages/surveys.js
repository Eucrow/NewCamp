import React from "react";
import ReactDOM from "react-dom";
import Survey from "../components/surveys/Surveys";
import Menu from "../components/common/Menu";

ReactDOM.render(<Menu/>, document.getElementById("menu"));
ReactDOM.render(<Survey/>, document.getElementById("container"));