import React, { Component } from 'react';
import Card from './CardUI';

import img1 from '../assets/sorachan.jpg'
import img2 from '../assets/ayano.jpg';
import img3 from '../assets/vinland.jpg';


class Cards extends Component{
    render() {
    return (
    <div className="container-fluid d-flex justify-content-center">
        <div className="row">
            <div className="col-md-4">
                <Card imgsrc={img1} title="Sorachan"/>
            </div>
            <div className="col-md-4">
                <Card imgsrc={img2} title="Ayano"/>
            </div>
            <div className="col-md-4">
                <Card imgsrc={img3} title="Thorfin"/>
            </div>
        </div>
    </div>
    )
    };
}
export default Cards;