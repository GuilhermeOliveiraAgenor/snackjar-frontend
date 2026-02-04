"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { useState } from "react";

export default function RegisterRecipe() {

  const [text, setText] = useState("")
  const [preparationTime, setPreparationTime] = useState("")

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
                                required
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
                    <p className="text-sm">minutos</p>
                            </div>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
        </form>
    </div>
  )
}
