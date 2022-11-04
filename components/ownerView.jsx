import { useEffect, useState } from "react";
import { Container, Row, Card, Button, InputGroup, Form } from "react-bootstrap";
import CommonView from "./commonView";

export default function OwnerView({ signer, lotteryService }) {

    const [duration, setDuration] = useState();
    const [amountToWithdraw, setAmountToWithdraw] = useState(0);

    return (
        <Container>
            <Row className="justify-content-md-between">
                <Card className="sml-card">
                    <Card.Body>
                        <Card.Title>Start Lottery</Card.Title>
                        <Card.Text>
                            Enter a duration in seconds to open bets.
                        </Card.Text>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Duration"
                                aria-label="Duration"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setDuration(e.target.value)}
                            />
                            <Button variant="primary" id="button-addon2" disabled={!duration || duration < 1}>
                                Open bets &rarr;
                            </Button>
                        </InputGroup>
                    </Card.Body>
                </Card>
                <Card className="sml-card">
                    <Card.Body>
                        <Card.Title>Owner Withdraw</Card.Title>
                        <Card.Text>
                            Current balance (# of tokens): 0.00
                        </Card.Text>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Amount to withdraw"
                                aria-label="Amount to withdraw"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setAmountToWithdraw(e.target.value)}
                            />
                            <Button variant="primary" id="button-addon2" disabled={!amountToWithdraw || amountToWithdraw <= 0}>
                                Withdraw &rarr;
                            </Button>
                        </InputGroup>

                    </Card.Body>
                </Card>
            </Row>
            <CommonView signer={signer} lotteryService={lotteryService} />
        </Container>
    );
}