import React,{useState} from "react";
import axios from "axios"
import {Segment,Grid, Divider} from "semantic-ui-react"

var arrDisplay = [];
var slicedArray = " ";
export default function LoadTranscript(props){
    const [data,setData] = useState([]);
    const [load,setLoad] = useState(true);
    const [pos, setPos] = useState(0);
    
    console.log("load" ,load)
    if(load){
        axios
            .get(`api/transcript`, {
            accept: "application/json",
            })
            .then((response) => {
            setData(response.data);
            setLoad(false);
            })
            .catch((error) => {
            console.log(error);
            });

        
    }
    //console.log("before",pos,arrDisplay);
    
    //console.log("after",slicedArray);
    

    return (
        
        <div>
            <div id="data-box">
                <Segment raised style={{ alignSelf: 'center', position: 'sticky', top: '1.5rem' ,overflow: 'auto', maxHeight: 200, display: 'flex', flexDirection: 'column-reverse',border: '2px solid rgba(0, 0, 0, 0.1)'}}>
                    <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical></Divider>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                            <ul>
                            {arrDisplay.map(item => {
                                return <p>{item}</p>;
                                })}
                            
                            </ul>
                            </Grid.Column>
                        </Grid.Row>        
                        </Grid.Row>        
                </Grid>
                </Segment>
                <div>
                    <button id="btn"
                        onClick={()=>{
                            setPos(pos+1);
                            arrDisplay.push(data[pos]?.text);
                            slicedArray = data.slice(0,pos+1);
                            console.log("after",pos,slicedArray);
                        }}
                    >
                        Next
                    </button>
                    <button id="btn"
                        onClick={()=>{
                            setPos(0);
                            arrDisplay= [];
                        }}
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </div>
    )
}