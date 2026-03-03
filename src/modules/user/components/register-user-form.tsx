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
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../schemas/login-schema";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useRef } from "react";

export default function LoginForm() {
  const { login, isLoading } = useLogin(); // hook
  const { loginWithGoogle } = useGoogleLogin();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    // zod form
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    await login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Suas receitas somente aqui</h1>
          <p className="text-muted-foreground text-md text-balance">
            Entre com seu email e senha abaixo
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
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
            {...register("password")}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </Field>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Login"}
        </Button>
        <FieldSeparator>Ou continue por aqui</FieldSeparator>
        <Field>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => {
              const button = googleButtonRef.current?.querySelector(
                "div[role=button]"
              ) as HTMLElement;
              button?.click();
            }}
          >
            <FcGoogle size={20} />
            Entrar com Google
          </Button>
          <div ref={googleButtonRef} className="hidden">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (!credentialResponse.credential) return;

                loginWithGoogle({
                  token: credentialResponse.credential,
                });
              }}
              theme="outline"
              size="large"
              shape="pill"
              width="100%"
            />
          </div>
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
