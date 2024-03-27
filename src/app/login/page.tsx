"use client";

import { authProvider } from "@/components/provider/authProvider";
import { Button, Card, Divider, Group, TextInput, Title } from "@mantine/core";
import { Formik } from "formik";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function LoginPage() {
  const { replace } = useRouter();
  return (
    <Group justify="center" align="center">
      <Card>
        <Title className="mb-4">Bookstore</Title>
        <Title className="mb-4" order={3}>
          Login
        </Title>

        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={async function (values, { setSubmitting }) {
            setSubmitting(true);
            const res = await authProvider().login(values.email);
            if (res.success) replace("/");
          }}
        >
          {({ handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <TextInput
                name="email"
                label="Email"
                className="mb-4"
                onChange={handleChange}
              />
              <Button fullWidth type="submit" loading={isSubmitting}>
                Sign In
              </Button>
            </form>
          )}
        </Formik>
        <Divider className="my-4" label="or" />
        <Button
          component={Link}
          href={"/register"}
          variant="transparent"
          size="xs"
        >
          Sign Up
        </Button>
      </Card>
    </Group>
  );
}
