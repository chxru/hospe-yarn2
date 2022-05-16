import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { NavigateTo } from "../../helper/navigate";
import { useAuth } from "../../contexts/authContext";
import { API } from "@hospe/types";

interface IRegisterForm {
  fname: string;
  lname: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const auth = useAuth();

  const form = useForm<IRegisterForm>({
    initialValues: {
      email: "",
      password: "",
      fname: "",
      lname: "",
      rememberMe: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = async (values: IRegisterForm) => {
    try {
      const request = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(values),
      });

      if (!request.ok) throw new Error("Not okay");

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, name, email, access } = await request.json() as API.IAM.Register.Res;

      auth.updateAccessToken(access);
      auth.updateUser({ id: _id, name, email });

      NavigateTo(router, "/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <Center style={{ width: "100vw", height: "100vh" }}>
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily || "sans-serif"}`,
              fontWeight: 900,
            })}
          >
            Register
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{" "}
            <Anchor<"a">
              href="#"
              size="sm"
              onClick={(evt) => {
                evt.preventDefault();
                NavigateTo(router, "/auth/login");
              }}
            >
              Sign In
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit(onSubmit)}>
              <TextInput
                label="First Name"
                required
                {...form.getInputProps("fname")}
              />
              <TextInput
                label="Last Name"
                required
                {...form.getInputProps("lname")}
              />
              <TextInput
                label="Email"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mb="md"
                {...form.getInputProps("password")}
              />
              <Group position="apart" mt="md">
                <Checkbox
                  label="Remember me"
                  {...form.getInputProps("rememberMe", { type: "checkbox" })}
                />
                <Anchor<"a">
                  onClick={(event) => event.preventDefault()}
                  href="#"
                  size="sm"
                >
                  Forgot password?
                </Anchor>
              </Group>
              <Button fullWidth mt="xl" type="submit">
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </Center>
    </>
  );
};

export default RegisterPage;
