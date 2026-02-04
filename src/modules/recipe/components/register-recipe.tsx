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

                            {/* Contador abaixo à direita */}
                            <div className="flex justify-end">
                                <span className="text-xs">
                                {text.length}/80
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
