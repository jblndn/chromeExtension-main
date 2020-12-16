import React, { useEffect, useState } from "react";
import { Profile } from "../models/profile";
import "./App.scss";
import User from "./user/User"

interface State extends Profile {}

/*export class App extends React.Component<{}, State> {
  state = {} as State;

  public componentDidMount() {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id || 0, { from: "popup", subject: "getFullName" }, response => {
          this.setState({
            fullName: response.fullName,
            title: response.title,
            country: response.country,
            imageUrl: response.imageUrl
          });
        });
      });
    }
  }

  render() {
    return (
      <div className="app">
        <div>{this.state.fullName}</div>
        <div>{this.state.title}</div>
        <div>{this.state.country}</div>
        <img src={this.state.imageUrl} alt="profileImage"></img>
      </div>
    );
  }
}*/

const App: React.FunctionComponent<{}> = () => {
  const [fullName, setFullName] = useState("Stephane");
  const [title, setTitle] = useState("Architecte");
  const [country, setCountry] = useState("New York");
  const [imageUrl, setImage] = useState("https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png");
  useEffect(() => {
    if(chrome &&chrome.tabs){
      chrome.tabs.query({ currentWindow: true, active: true}, tabs => {
        const tab = tabs[0]
        chrome.tabs.sendMessage(tab.id || 0, {from: "popup", subject: "getFullName"}, response => {
          setFullName(response.fullName);
          setTitle(response.title)
          setCountry(response.country)
          setImage(response.imageUrl)
        })
      })
    }
  })
  return (
    <div className="app">
      <User fullName={fullName} title={title} country={country} imageUrl={imageUrl}></User>
    </div>
  );
}

export default App;