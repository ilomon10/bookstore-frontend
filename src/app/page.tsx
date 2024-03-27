"use client";

import { Box, Container, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Header } from "./Header";
import { Books } from "./Books";

export default function Home() {
  return (
    <Box>
      <Header />
      <Box className="mt-3">
        <Carousel withIndicators loop>
          <Carousel.Slide>
            <Container>
              <Image src="/KBHP_1500x300_2.jpg" />
            </Container>
          </Carousel.Slide>
          <Carousel.Slide>
            <Container>
              <Image src="/KBHP_1500x300_2.jpg" />
            </Container>
          </Carousel.Slide>
          <Carousel.Slide>
            <Container>
              <Image src="/KBHP_1500x300_2.jpg" />
            </Container>
          </Carousel.Slide>
        </Carousel>
      </Box>
      <Container>
        <Books />
      </Container>
      <Box h={150}></Box>
    </Box>
  );
}
