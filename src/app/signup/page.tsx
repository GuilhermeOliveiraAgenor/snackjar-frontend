"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/modules/user/hooks/useCreateUser";
import { UserFormData, userSchema } from "@/modules/user/schemas/create-user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const { create, loading } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(data: UserFormData) {
    await create(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-8"
      >
        <FieldGroup className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold">Faça parte do SnackJar</h1>
            <p className="text-muted-foreground text-md text-balance">Digite seus dados</p>
          </div>
          <Field className="flex flex-col gap-2">
            <FieldLabel htmlFor="name">Nome</FieldLabel>
            <Input
              id="name"
              type="name"
              placeholder="João"
              className="w-full h-12 text-base"
              {...register("name")}
            />
          </Field>
          <FieldLabel htmlFor="">Email</FieldLabel>
          <Field className="flex flex-col gap-2">
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full h-12 text-base"
              {...register("email")}
            />
          </Field>
          <FieldLabel htmlFor="">Senha</FieldLabel>
          <Field className="flex flex-col gap-2">
            <Input
              id="password"
              type="password"
              placeholder="************"
              className="w-full h-12 text-base"
              {...register("password")}
            />
          </Field>
          <FieldLabel htmlFor="">Confirmar Senha</FieldLabel>
          <Field className="flex flex-col gap-2">
            <Input type="password" placeholder="************" className="w-full h-12 text-base" />
          </Field>
          <Button type="submit" className="w-full h-12 text-base">
            Cadastrar
          </Button>
          <Button variant="outline" type="button" className="w-full h-12 text-base">
            <a href="/login">Voltar</a>
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
