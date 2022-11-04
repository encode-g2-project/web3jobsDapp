import { useEffect, useState } from "react";
import { Row, Card, Button, Badge } from "react-bootstrap";

export default function CommonView({ signer, lotteryService }) {

    return (
        <Row className="justify-content-md-between">
            <Card className="sml-card">
                <Card.Body>
                    <Card.Title>Lottery summary <Badge variant="secondary">Getting bets</Badge></Card.Title>
                    <Card.Text>
                        Prize size: <br/>
                        Time left: <br/>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="sml-card">
                <Card.Body>
                    <Card.Title>Close Lottery</Card.Title>
                    <Card.Text></Card.Text>
                    <Button variant="primary" href="#">
                        Close &rarr;
                    </Button>
                </Card.Body>
            </Card>
        </Row>
    );
}