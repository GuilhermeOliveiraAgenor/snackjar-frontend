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
import { Button } from "@/components/ui/button";
import {
  CreateRecipeFormData,
  CreateRecipeFormInput,
  createRecipeSchema,
} from "../schemas/create-recipe-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useCreateRecipe } from "../hooks/useCreateRecipe";
import { MeasurementUnit } from "@/lib/enum/MeasurementUnit";
import { useCategories } from "@/modules/category/hooks/useCategories";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function RegisterRecipe() {
  const { createRecipe } = useCreateRecipe();
  const { categories } = useCategories();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateRecipeFormInput, unknown, CreateRecipeFormData>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      description: "",
      preparationTime: 0,
      categoryId: "",
      recipeIngredient: [{ ingredient: "", amount: "", unit: "" as MeasurementUnit }],
      recipeStep: [{ step: 1, description: "" }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredientField,
  } = useFieldArray({
    control,
    name: "recipeIngredient",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "recipeStep",
  });

  function addIngredient() {
    appendIngredient({
      ingredient: "",
      amount: "",
      unit: "" as MeasurementUnit,
    });
  }

  function removeIngredient(index: number) {
    removeIngredientField(index);
  }

  function addSteps() {
    const currentSteps = watch("recipeStep") as CreateRecipeFormData["recipeStep"];

    const nextStep = currentSteps.length > 0 ? currentSteps[currentSteps.length - 1].step + 1 : 1;

    appendStep({
      step: nextStep,
      description: "",
    });
  }

  const description = watch("description") || "";

  const onSubmit = async (data: CreateRecipeFormData) => {
    await createRecipe(data);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <SidebarTrigger className="absolute top-8 left-6 sm:top-4 sm:left-4" />
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
                    <Input
                      id="title"
                      placeholder="Bolo de Cenoura"
                      maxLength={50}
                      {...register("title")}
                    />
                  </Field>
                  {errors.title && (
                    <span className="text-sm text-red-500">{errors.title.message}</span>
                  )}

                  <Field>
                    <FieldLabel htmlFor="description">Descrição</FieldLabel>

                    <Textarea
                      placeholder="A receita da Vovó"
                      maxLength={80}
                      {...register("description")}
                      className="resize-none"
                    />

                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">{description.length}/80</span>
                    </div>
                  </Field>
                  {errors.description && (
                    <span className="text-sm text-red-500">{errors.description.message}</span>
                  )}

                  <Field>
                    <FieldLabel htmlFor="preparationTime">Tempo de preparo</FieldLabel>

                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        className="w-32"
                        placeholder="60"
                        inputMode="numeric"
                        maxLength={4}
                        {...register("preparationTime", { valueAsNumber: true })}
                      />
                      <p className="text-sm text-muted-foreground">minutos</p>
                    </div>
                    {errors.preparationTime && (
                      <span className="text-sm text-red-500">{errors.preparationTime.message}</span>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel>Categoria</FieldLabel>
                    <Controller
                      control={control}
                      name="categoryId"
                      render={({ field, fieldState }) => {
                        const selectedCategory = categories?.find((c) => c.id === field.value);

                        return (
                          <>
                            <Combobox value={field.value} onValueChange={field.onChange}>
                              <ComboboxInput
                                placeholder="Selecione a categoria"
                                value={selectedCategory?.name || ""}
                                readOnly
                                className={fieldState.error ? "border-red-500" : ""}
                              />

                              <ComboboxContent>
                                {categories?.length === 0 && (
                                  <ComboboxEmpty>Itens não encontrados</ComboboxEmpty>
                                )}

                                <ComboboxList>
                                  {categories?.map((category) => (
                                    <ComboboxItem key={category.id} value={category.id}>
                                      {category.name}
                                    </ComboboxItem>
                                  ))}
                                </ComboboxList>
                              </ComboboxContent>
                            </Combobox>

                            {fieldState.error && (
                              <p className="text-red-500 text-sm mt-1">
                                {fieldState.error.message}
                              </p>
                            )}
                          </>
                        );
                      }}
                    />

                    <FieldSeparator />
                  </Field>
                  <Field>
                    <FieldLabel>Ingredientes</FieldLabel>
                    <div className="flex items-center gap-2 mt-5 w-full text-sm text-muted-foreground mb-1">
                      <div className="flex-3">Nome</div>
                      <div className="w-16 sm:w-20 text-center">Qtd</div>
                      <div className="w-20 sm:w-24 text-center">Unidade</div>
                    </div>
                    <div className="space-y-2">
                      {ingredientFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 w-full">
                          <Input
                            type="text"
                            maxLength={50}
                            placeholder="Farinha"
                            {...register(`recipeIngredient.${index}.ingredient`)}
                            className="flex-3"
                          />
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            {...register(`recipeIngredient.${index}.amount`)}
                            onInput={(e) => {
                              const input = e.currentTarget;
                              input.value = input.value.replace(/\D/g, "").slice(0, 4);
                            }}
                            className="w-16 sm:w-20 text-center"
                          />

                          <Select
                            onValueChange={(value) =>
                              setValue(`recipeIngredient.${index}.unit`, value as MeasurementUnit)
                            }
                            defaultValue={field.unit}
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
                      {stepFields.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 w-full">
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="1"
                            maxLength={4}
                            {...register(`recipeStep.${index}.step`)}
                            readOnly
                            className="w-16 sm:w-20 text-center"
                          />

                          {errors.recipeStep?.[index]?.step && (
                            <span className="text-sm text-red-500">
                              {errors.recipeStep[index]?.step?.message}
                            </span>
                          )}

                          <Input
                            type="text"
                            placeholder="Jogue na bandeja"
                            maxLength={50}
                            {...register(`recipeStep.${index}.description`)}
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
