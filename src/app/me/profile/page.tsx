"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMe } from "@/modules/user/hooks/useMe";
import Image from "next/image";

export default function UserDetails() {
  const { user } = useMe();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-2xl shadow-lg px-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Cadastrar Receita</CardTitle>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Image src={user?.avatarUrl ?? "/"} alt="profile"></Image>
                  <Field>
                    <FieldLabel htmlFor="name">Nome</FieldLabel>
                    <Input id="name" placeholder="Seu nome" maxLength={50} value={user?.name} />
                  </Field>
                  {/* {errors.name && (
                    <span className="text-sm text-red-500">{errors.name.message}</span>
                  )} */}

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      placeholder="seu@email.com"
                      maxLength={50}
                      value={user?.email}
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
