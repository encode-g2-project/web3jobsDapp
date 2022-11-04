import { useEffect, useState } from "react";
import { Container, Row, Card, Button, InputGroup, Form } from "react-bootstrap";
import CommonView from "./commonView";

export default function PlayerView({ signer, lotteryService }) {

    const [amountToMint, setAmountToMint] = useState(0);
    const [amountToBurn, setAmountToBurn] = useState(0);
    const [amountToBet, setAmountToBet] = useState(0);
    const [amountToWithdraw, setAmountToWithdraw] = useState(0);

    return (
        <Container>
            <Row className="justify-content-md-between">
                <Card className="sml-card">
                    <Card.Body>
                        <Card.Title>Buy tokens</Card.Title>
                        <Card.Text>
                            Current ETH balance: 0.00
                        </Card.Text>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Amount to buy"
                                aria-label="Amount to buy"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setAmountToMint(e.target.value)}
                            />
                            <Button variant="primary" id="button-addon2" disabled={!amountToMint || amountToMint <= 0}>
                                Mint &rarr;
                            </Button>
                        </InputGroup>
                    </Card.Body>
                </Card>
                <Card className="sml-card">
                    <Card.Body>
                        <Card.Title>Lottery bet</Card.Title>
                        <Card.Text>
                            Current G2Token balance: 0.00
                        </Card.Text>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Amount to bet"
                                aria-label="Amount to bet"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setAmountToBet(e.target.value)}
                            />
                            <Button variant="primary" id="button-addon2" disabled={!amountToBet || amountToBet <= 0}>
                                Bet &rarr;
                            </Button>
                        </InputGroup>
                    </Card.Body>
                </Card>
                <Card className="sml-card">
                    <Card.Body>
                        <Card.Title>Burn tokens</Card.Title>
                        <Card.Text>
                            Current G2Token balance: 0.00
                        </Card.Text>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Amount to burn"
                                aria-label="Amount to burn"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setAmountToBurn(e.target.value)}
                            />
                            <Button variant="primary" id="button-addon2" disabled={!amountToBurn || amountToBurn <= 0}>
                                Burn &rarr;
                            </Button>
                        </InputGroup>
                    </Card.Body>
                </Card>
                <Card className="sml-card">
                    <Card.Body>
                        <Card.Title>Prize Withdraw</Card.Title>
                        <Card.Text>
                            Your Prize's balance: 0.00
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