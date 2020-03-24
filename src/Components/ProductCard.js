import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, 
} from 'reactstrap';

const CardHome = (props) => {

    const { image, name, brand, price } = props
  return (
    <div style={{width:'220px', justifyContent:'center', textAlign:'center'}} className='m-3'>
      <Card style={{width:'230px',height:'350px'}}>
        <CardImg top width="60%" src={image} alt="Card image cap" />
        <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>{brand}</CardSubtitle>
            <CardText>{price}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardHome;