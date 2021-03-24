import dynamic from "next/dynamic";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "components/Layout";

const DiscordEmbed = dynamic(() => import("components/DiscordEmbed"), {
  ssr: false,
});

export default function PyodideTestPage() {
  return <DiscordEmbed />;
}
