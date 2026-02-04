"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { useState } from "react";

export default function RegisterRecipe() {

  const [text, setText] = useState("")

  return (
    <div>
        <form>
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Cadastrar Receita</FieldLegend>
                    <FieldDescription>Digite as informações abaixo</FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="title">
                                Título
                            </FieldLabel>
                            <Input id="title" placeholder="Bolo de Cenoura" required/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">
                                Descrição
                            </FieldLabel>
                            <Textarea
                                placeholder="A receita da Vovó"
                                maxLength={80}
                                onChange={(e) => setText(e.target.value)}
                                className="resize-none"
                            />
                            <div className="flex justify-end">
                                <span className="text-xs">
                                {text.length}/80
                                </span>
                            </div>
                        </Field>
                        <Field className="-mt-7">
                            <FieldLabel htmlFor="preparationTime" >Tempo de preparo</FieldLabel>
                            <div className="flex items-center gap-2">
    <Input
      type="number"
      id="preparationTime"
      placeholder="45"
      min={1}
      max={600}
      className="w-32"
    />

    <span className="text-sm text-muted-foreground">
      min
    </span>
  </div>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
        </form>
    </div>
  )
}
