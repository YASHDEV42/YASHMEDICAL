import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  verificationLink: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  verificationLink,
}) => (
  <Html>
    <Head />
    <Preview>Verify your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Text style={heading}>Email Verification</Text>
          <Text style={paragraph}>
            Please click the button below to verify your email address:
          </Text>
          <Button href={verificationLink} style={button}>
            Verify Email
          </Button>
          <Text style={paragraph}>
            If you did not request this email, you can safely ignore it.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const heading = {
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#5469d4",
  borderRadius: "4px",
  color: "#fff",
  padding: "12px 24px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
};

export default VerificationEmail;
