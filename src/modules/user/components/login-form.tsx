"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "../hooks/useLogin";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const { login, isLoading, isError } = useLogin(); // hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    login({
      email,
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Suas receitas somente aqui</h1>
          <p className="text-muted-foreground text-md text-balance">
            Entre com seu email e senha abaixo
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Link href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Esqueceu sua senha ?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button type="submit">Login</Button>
        <FieldSeparator>Ou continue por aqui</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <FcGoogle size={100} />
            Login com Google
          </Button>
          <FieldDescription className="text-center">
            Não tem cadastro ?
            <a href="#" className="underline underline-offset-4 px-2">
              Cadastre-se
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
