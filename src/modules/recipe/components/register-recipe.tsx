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

import { useCategories } from "@/modules/category/hooks/useCategories";
import { useCreateRecipe } from "../hooks/useCreateRecipe";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRecipeFormData, createRecipeSchema } from "../schemas/create-recipe-schema";

export default function RegisterRecipe() {
  const [text, setText] = useState("");

  const { categories } = useCategories();
  const { createRecipe } = useCreateRecipe();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<CreateRecipeFormData>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      description: "",
      preparationTime: 0,
      categoryId: "",
      ingredients: [{ ingredient: "", amount: "", unit: "G" }],
      steps: [{ step: 1, description: "" }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredientField,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStepField,
    update: updateStepField,
  } = useFieldArray({
    control,
    name: "steps",
  });

  async function onSubmit(data: CreateRecipeFormData) {
    console.log(data);
    await createRecipe(data);
  }

  function addIngredient() {
    appendIngredient({ ingredient: "", amount: "", unit: "G" });
  }

  function removeIngredient(index: number) {
    removeIngredientField(index);
  }

  function addSteps() {
    const nextStep = stepFields.length > 0 ? (stepFields[stepFields.length - 1].step ?? 0) + 1 : 1;

    appendStep({ step: nextStep, description: "" });
  }

  function removeStep(index: number) {
    removeStepField(index);

    const steps = getValues("steps")
      .filter((_, i) => i !== index)
      .map((item, i) => ({
        ...item,
        step: i + 1,
      }));

    steps.forEach((step, i) => {
      updateStepField(i, step);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-2xl shadow-lg px-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Cadastrar Receita</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="title">Título</FieldLabel>
                    <Input {...register("title")} placeholder="Bolo de Cenoura" />
                    {errors.title && <span>{errors.title.message}</span>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="description">Descrição</FieldLabel>

                    <Textarea
                      maxLength={80}
                      {...register("description")}
                      onChange={(e) => {
                        setText(e.target.value);
                        setValue("description", e.target.value);
                      }}
                      className="resize-none"
                    />

                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">{text.length}/80</span>
                    </div>

                    {errors.description && <span>{errors.description.message}</span>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="preparationTime">Tempo de preparo</FieldLabel>

                    <div className="flex items-center gap-2">
                      <Input
                        inputMode="numeric"
                        className="w-24"
                        onChange={(e) => {
                          const numeric = e.target.value.replace(/\D/g, "");
                          setValue("preparationTime", Number(numeric));
                        }}
                      />
                      <p className="text-sm text-muted-foreground">minutos</p>
                    </div>

                    {errors.preparationTime && <span>{errors.preparationTime.message}</span>}
                  </Field>

                  <Field>
                    <FieldLabel>Categoria</FieldLabel>

                    <Combobox>
                      <ComboboxInput placeholder="Selecione a categoria" />

                      <ComboboxContent>
                        <ComboboxEmpty>Itens não encontrados</ComboboxEmpty>

                        <ComboboxList>
                          {categories?.map((category) => (
                            <ComboboxItem
                              key={category.id}
                              value={category.id}
                              onSelect={() => setValue("categoryId", category.id)}
                            >
                              {category.name}
                            </ComboboxItem>
                          ))}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    {errors.categoryId && <span>{errors.categoryId.message}</span>}

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
                      {ingredientFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 w-full">
                          <Input
                            {...register(`ingredients.${index}.ingredient`)}
                            placeholder="Farinha"
                            className="flex-[3]"
                          />

                          <Input
                            {...register(`ingredients.${index}.amount`)}
                            inputMode="numeric"
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "");
                              v = v.slice(0, 4);

                              setValue(`ingredients.${index}.amount`, v);
                            }}
                            className="w-16 sm:w-20 text-center"
                          />

                          <Select
                            value={watch(`ingredients.${index}.unit`)}
                            onValueChange={(v) => setValue(`ingredients.${index}.unit`, v)}
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

                          {ingredientFields.length > 1 && (
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
                      {stepFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 w-full">
                          <Input
                            inputMode="numeric"
                            placeholder="1"
                            value={watch(`steps.${index}.step`)}
                            readOnly
                            className="w-16 sm:w-20 text-center"
                          />

                          <Input
                            {...register(`steps.${index}.description`)}
                            placeholder="Jogue na bandeja"
                          />

                          {stepFields.length > 1 && (
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
