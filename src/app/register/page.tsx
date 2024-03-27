import { Button, Card, Divider, Group, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useCreate } from "@/components/provider/useClient";
import { User } from "@/components/provider/entity";

export default function RegisterPage() {
  const { mutate } = useCreate<Pick<User, "email" | "username">>({
    resource: "users",
  });
  return (
    <Group justify="center" align="center">
      <Card>
        <Title className="mb-4">Bookstore</Title>
        <Title className="mb-4" order={3}>
          Register
        </Title>
        <Formik
          initialValues={{
            email: "",
            username: "",
          }}
          onSubmit={async function (values, { setSubmitting }) {
            setSubmitting(true);
            await mutate(values);
            setSubmitting(false);
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
              <TextInput
                name="username"
                label="Username"
                className="mb-4"
                onChange={handleChange}
              />
              <Button type="submit" loading={isSubmitting}>
                Sign Up
              </Button>
            </form>
          )}
        </Formik>
        <Divider className="my-4" label="or" />
        <Button
          component={Link}
          href={"/login"}
          variant="transparent"
          size="xs"
        >
          Sign In
        </Button>
      </Card>
    </Group>
  );
}
