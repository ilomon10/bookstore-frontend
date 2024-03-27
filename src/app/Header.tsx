"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Menu,
  MenuDropdown,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { IconSearch, IconShoppingCart } from "@tabler/icons-react";
import { authProvider } from "@/components/provider/authProvider";
import { User } from "@/components/provider/entity";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const [user, setUser] = React.useState<User | null | undefined>(undefined);
  const { refresh } = useRouter();

  useEffect(() => {
    const result = authProvider().check();
    if (result.success) {
      setUser(result.user);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Box className="sticky top-0 bg-white left-0 right-0 z-50">
      <Container>
        <Group justify="space-between" h="100%" className="py-2">
          <Box className="font-bold">Bookstore</Box>
          <Group>
            <Autocomplete
              placeholder="Search"
              leftSection={
                <IconSearch
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
              data={[
                "React",
                "Angular",
                "Vue",
                "Next.js",
                "Riot.js",
                "Svelte",
                "Blitz.js",
              ]}
            />
          </Group>
          <Group visibleFrom="sm">
            {user && (
              <>
                <ActionIcon radius="xl">
                  <IconShoppingCart size={16} />
                </ActionIcon>
                <Menu>
                  <Menu.Target>
                    <Avatar>IM</Avatar>
                  </Menu.Target>
                  <MenuDropdown>
                    <Menu.Label>{user.email}</Menu.Label>
                    <Menu.Item
                      onClick={() => {
                        authProvider().logout();
                        setUser(null);
                        refresh();
                      }}
                    >
                      Sign Out
                    </Menu.Item>
                  </MenuDropdown>
                </Menu>
              </>
            )}
            {user === null && (
              <Button component={Link} href={"/login"} variant="default">
                Sign In
              </Button>
            )}
          </Group>
        </Group>
      </Container>
      <Divider />
      <Container>
        <Group className="py-1" mx={"-md"}>
          <Group>
            <Button component={Link} href="#" size="xs" variant="subtle">
              Best Seller
            </Button>
            <Button component={Link} href="#" size="xs" variant="subtle">
              New Release
            </Button>
            <Button component={Link} href="#" size="xs" variant="subtle">
              Best of Books
            </Button>
          </Group>
        </Group>
      </Container>
      <Divider />
    </Box>
  );
};
