import React from "react";
import { Book } from "@/components/provider/entity";
import { useGetMany } from "@/components/provider/useClient";
import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Group,
  Image,
  Rating,
  Text,
} from "@mantine/core";
import currency from "currency.js";
import InfiniteScroll from "react-infinite-scroller";

export const Books: React.FC = () => {
  const { data, fetchNextPage, isLoading } = useGetMany<Book>({
    resource: "books",
    filter: {
      $limit: 25,
      $skip: 0,
    },
  });
  if (isLoading) return <div>Loading</div>;
  if (!data) return <div>Something went wrong</div>;
  const pages = data.pages;

  return (
    <InfiniteScroll
      pageStart={0}
      hasMore={true}
      loadMore={(page) => {
        fetchNextPage();
      }}
    >
      <Grid className="my-5">
        {pages.map((books) =>
          books.map((book) => (
            <Grid.Col key={book.id} span={4}>
              <Group wrap="nowrap">
                <Box w={"33%"} style={{ flexShrink: 0 }}>
                  <AspectRatio ratio={2 / 3}>
                    <Image src={book.cover_url} />
                  </AspectRatio>
                </Box>
                <Box miw={0}>
                  <Text size="sm" fw={"bold"} truncate="end">
                    {book.title}
                  </Text>
                  <Text size="sm">{"fiction"}</Text>
                  <Text size="sm" fw={"bold"} className="mb-2">
                    {currency(book.price, {
                      symbol: "Rp.",
                      precision: 0,
                    }).format()}
                  </Text>
                  <Box className="mb-2">
                    <Rating readOnly defaultValue={4} />
                  </Box>
                  <Button variant="default">Order</Button>
                </Box>
              </Group>
            </Grid.Col>
          ))
        )}
      </Grid>
    </InfiniteScroll>
  );
};
