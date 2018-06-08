import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';
import "../style/leaveword.less";

export default class LeaveWord extends Component{
    render(){
        return (<div className="leaveword">
            <div className="list-box">
                {this.state.leaveList.map((value,index)=>{
                    return <div className="list clearfix" key={value.ID}>
                        <div className="head left"></div>
                        <div className="name-text">
                            <div className="name">{value.name}</div>
                            <div className="text">{value.leave_word}</div>
                            <div className="time">Time:{value.time}</div>
                        </div>
                    </div>
                })}
            </div>
            <div className="form-input clearfix">
                <input id="leavewordname" type="text" placeholder="请填写你的姓名,姓名不填的话会当游客处理的哦"/>
                <textarea id="leaveword" rows="8"></textarea>
                <button className="right" onClick={this.submitLeaveWord}>提交</button>
            </div>
        </div>)
    }
    constructor(props){
        super(props);
        this.state = {
            leaveList:[]
        }
    }
    componentDidMount(){
        Ajax({
            url:window.ENVPATH+"getLeaveWord",
            type:"post",
            success:(data)=>{
                console.log(data.data);
                this.setState({
                    leaveList:data.data
                });
            }
        });
    }
    showDrop = (text)=>{
        var odiv = document.createElement("div");
        odiv.className = "allDrop";

        odiv.onclick = function(){
            this.remove();
        }

        var div2 = document.createElement("div");
        div2.className="text";
        div2.innerHTML = text;
        odiv.appendChild(div2);

        document.body.appendChild(odiv);
    }
    submitLeaveWord = ()=>{
        //alert(123);
        var leavewordname = document.querySelector("#leavewordname").value;
        var leaveword = document.querySelector("#leaveword").value;
        if(leavewordname.length>10){
            this.showDrop("名字最多只能10个字符");
            //alert("名字最多只能10个字符");
            return false;
        }
        if(!leaveword){
            this.showDrop("留言不能为空");
            //alert("留言不能为空");
            return false;
        }
        if(leaveword.length>100){
            this.showDrop("留言不能超过100个字符");
            //alert("留言不能超过100个字符");
            return false;
        }
        Ajax({
            url:window.ENVPATH+"updateLeaveWord",
            type:"post",
            data:{name:leavewordname,text:leaveword},
            success:(data)=>{
                //console.log(data.data);
                document.querySelector("#leavewordname").value = "";
                document.querySelector("#leaveword").value = "";
                this.showDrop("留言已提交，等待博主审批");
            }
        });
    }
}