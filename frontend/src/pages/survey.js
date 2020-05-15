import React from "react";
import ReactDOM from "react-dom";
import Surveys from "../components/survey/Survey";
import Menu from "../components/common/Menu";

ReactDOM.render(<Menu/>, document.getElementById("menu"));
ReactDOM.render(<Survey/>, document.getElementById("container"));