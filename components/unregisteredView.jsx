import { useEffect, useState } from "react";
import { Container, Row, Card, Button, InputGroup, Form } from "react-bootstrap";
import CommonView from "./commonView";

export default function UnregisteredView({ signer, jobApplicationServiceInstance, jobPostServiceInstance }) {

    return (
        <Container>
            <Row className="justify-content-md-between">
               
            </Row>
            <CommonView signer={signer} jobApplicationServiceInstance={jobApplicationServiceInstance} jobPostServiceInstance={jobPostServiceInstance} />
        </Container>
    );
}