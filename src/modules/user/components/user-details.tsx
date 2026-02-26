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
          <CardTitle className="text-center text-2xl">Meu Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Image
                  src={user?.avatarUrl || "/profile.png"}
                  alt="profile"
                  width={96}
                  height={96}
                />
                <Field>
                  <FieldLabel htmlFor="name">Nome</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    maxLength={50}
                    value={user?.name}
                    readOnly
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    placeholder="seu@email.com"
                    maxLength={50}
                    value={user?.email}
                    readOnly
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
