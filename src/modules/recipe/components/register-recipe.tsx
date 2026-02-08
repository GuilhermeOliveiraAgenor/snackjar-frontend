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
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { type } from "os";

const categories = ["Doce", "Salgado", "Almoço", "Jantar", "Café da Manhã"] as const;

export default function RegisterRecipe() {
  const [text, setText] = useState("");
  const [preparationTime, setPreparationTime] = useState("");

  type Ingredient = {
    name: string;
    amount: string;
    unit: string;
  };

  type Step = {
    step: number;
    description: string;
  };

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: "", unit: "G" },
  ]);

  const [steps, setSteps] = useState<Step[]>([{ step: 1, description: "" }]);

  function addIngredient() {
    setIngredients((prev) => [...prev, { name: "", amount: "", unit: "G" }]);
  }

  function removeIngredient(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  function addSteps() {
    setSteps((prev) => {
      const nextStep = prev.length > 0 ? prev[prev.length - 1].step + 1 : 1;
      return [...prev, { step: nextStep, description: "" }];
    });
  }

  function removeStep(index: number) {
    setSteps((prev) => {
      const list = prev.filter((_, i) => i !== index);

      return list.map((item, i) => ({
        ...item,
        step: i + 1,
      }));
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-2xl shadow-lg px-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Cadastrar Receita</CardTitle>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>
              <FieldSet>
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
                      <ComboboxInput placeholder="Selecione a categoria" required />

                      <ComboboxContent className="w-[var(--radix-popover-trigger-width)]">
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
                    <FieldLabel>Ingredientes</FieldLabel>
                    <div className="flex items-center gap-2 mt-5 w-full text-sm text-muted-foreground mb-1">
                      <div className="flex-[3]">Nome</div>
                      <div className="w-16 sm:w-20 text-center">Qtd</div>
                      <div className="w-20 sm:w-24 text-center">Unidade</div>
                    </div>
                    <div className="space-y-2">
                      {ingredients.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 w-full">
                          <Input
                            type="text"
                            maxLength={40}
                            placeholder="Farinha"
                            value={item.name}
                            onChange={(e) => {
                              const list = [...ingredients];
                              list[index].name = e.target.value;
                              setIngredients(list);
                            }}
                            required
                            className="flex-[3]"
                          />

                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="200"
                            value={item.amount}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "");
                              v = v.slice(0, 4);

                              const list = [...ingredients];
                              list[index].amount = v;
                              setIngredients(list);
                            }}
                            required
                            className="w-16 sm:w-20 text-center"
                          />

                          <Select
                            value={item.unit}
                            onValueChange={(v) => {
                              const list = [...ingredients];
                              list[index].unit = v;
                              setIngredients(list);
                            }}
                          >
                            <SelectTrigger className="w-20 sm:w-24">
                              <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Unidade de Medida</SelectLabel>
                                <SelectItem value="G">g</SelectItem>
                                <SelectItem value="KG">kg</SelectItem>
                                <SelectItem value="ML">ml</SelectItem>
                                <SelectItem value="L">l</SelectItem>
                                <SelectItem value="COLHER_SOPA">Colher de Sopa</SelectItem>
                                <SelectItem value="COLHER_CHA">Colher de Chá</SelectItem>
                                <SelectItem value="COLHER">Colher</SelectItem>
                                <SelectItem value="XICARA">Xícara</SelectItem>
                                <SelectItem value="UN">un</SelectItem>
                                <SelectItem value="PITADA">Pitada</SelectItem>
                                <SelectItem value="MG">mg</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          {ingredients.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeIngredient(index)}
                              variant="ghost"
                              size="icon"
                              className="text-destructive p-0 w-4"
                            >
                              <Trash2 size={22} />
                            </Button>
                          )}  
                        </div>
                      ))}

                      <Button type="button" onClick={addIngredient} className="mt-8">
                        Adicionar Ingrediente
                        <Plus size={32} />
                      </Button>
                    </div>
                  </Field>
                  <FieldSeparator />
                  <Field>
                    <FieldLabel>Modo de Preparo</FieldLabel>

                    <div className="flex items-center gap-2 mt-5 w-full text-sm text-muted-foreground mb-1">
                      <div className="w-16 sm:w-20 text-center">Etapa</div>
                      <div className="flex-1 text-center">Descrição</div>
                    </div>
                    <div className="space-y-2">
                      {steps.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 w-full">
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="1"
                            value={item.step}
                            readOnly
                            className="w-16 sm:w-20 text-center"
                          />

                          <Input
                            type="text"
                            placeholder="Jogue na bandeja"
                            value={item.description}
                            onChange={(e) => {
                              const v = e.target.value;
                              const list = [...steps];
                              list[index].description = v;
                              setSteps(list);
                            }}
                            required
                          />
                          {steps.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeStep(index)}
                              variant="ghost"
                              size="icon"
                              className="text-destructive p-0 w-4"
                            >
                              <Trash2 size={22} />
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button type="button" onClick={addSteps} className="mt-8">
                        Adicionar Etapa
                        <Plus size={32} />
                      </Button>
                    </div>
                  </Field>
                  <Field orientation="horizontal" className="flex flex-1 justify-center py-4">
                    <Button type="submit" className="w-32">
                      Salvar
                    </Button>
                    <Button variant="outline" type="button">
                      Cancelar
                    </Button>
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
