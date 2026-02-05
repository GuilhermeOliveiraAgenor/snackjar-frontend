"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const categories = ["Doce", "Salgado", "Almoço", "Jantar", "Café da Manhã"] as const;

export default function RegisterRecipe() {
  const [text, setText] = useState("");
  const [preparationTime, setPreparationTime] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Cadastrar Receita</CardTitle>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>
              <FieldSet>
                <FieldDescription>Digite as informações abaixo</FieldDescription>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="title">Título</FieldLabel>
                    <Input id="title" placeholder="Bolo de Cenoura" required />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="description">Descrição</FieldLabel>

                    <Textarea
                      placeholder="A receita da Vovó"
                      maxLength={80}
                      onChange={(e) => setText(e.target.value)}
                      className="resize-none"
                      required
                    />

                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">{text.length}/80</span>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="preparationTime">Tempo de preparo</FieldLabel>

                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        className="w-32"
                        placeholder="60"
                        inputMode="numeric"
                        maxLength={3}
                        value={preparationTime}
                        onChange={(e) => {
                          const numeric = e.target.value.replace(/\D/g, "");
                          setPreparationTime(numeric);
                        }}
                        required
                      />

                      <p className="text-sm text-muted-foreground">minutos</p>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel>Categoria</FieldLabel>

                    <Combobox items={categories}>
                      <ComboboxInput placeholder="Seleciona a categoria" />

                      <ComboboxContent className="min-w-[var(--radix-popover-trigger-width)]">
                        <ComboboxEmpty>Itens não encontrados</ComboboxEmpty>

                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    <FieldSeparator />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="title">Ingrediente</FieldLabel>
                    <div className="flex flex-1">
                      <Input id="title" placeholder="Farinha" required />
                      <Input
                        id="title"
                        placeholder="2 xícaras"
                        required
                        className="ml-2 w-26 text-center"
                      />
                      <Select defaultValue="01">
                        <SelectTrigger id="unit" className="ml-2 w-36">
                          <SelectValue placeholder="G" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Unidade de Medida</SelectLabel>
                            <SelectItem value="01">g</SelectItem>
                            <SelectItem value="02">kg</SelectItem>
                            <SelectItem value="03">ml</SelectItem>
                            <SelectItem value="04">l</SelectItem>
                            <SelectItem value="05">Colher de Sopa</SelectItem>
                            <SelectItem value="06">Colher de Chá</SelectItem>
                            <SelectItem value="07">Colher</SelectItem>
                            <SelectItem value="08">Xícara</SelectItem>
                            <SelectItem value="09">un</SelectItem>
                            <SelectItem value="10">Pitada</SelectItem>
                            <SelectItem value="11">mg</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
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
