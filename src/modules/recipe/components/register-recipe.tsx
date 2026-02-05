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

const categories = ["Doce", "Salgado", "Almoço", "Jantar", "Café da Manhã"] as const;


export default function RegisterRecipe() {
  const [text, setText] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [unit, setUnit] = useState("G")
  const [amount, setAmount] = useState("")
    
    type Ingredient ={
        name: string;
        amount: string;
        unit: string;
    }

    const [ingredients, setIngredients] = useState<Ingredient[]>([
        {name: "", amount: "", unit: ""}
    ])

    function addIngredient(){
        setIngredients((prev) => [
            ...prev,
            {name: "", amount: "", unit: "G"}
        ])
    }

    function removeIngredient(index: number){
        setIngredients((prev) => 
            prev.filter((_, i) => i !== index)
        )
    }

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
                      <ComboboxInput placeholder="Selecione a categoria" />

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
  <FieldLabel>Ingredientes</FieldLabel>

  <div className="space-y-2">

    {ingredients.map((item, index) => (
      <div
        key={index}
        className="flex items-end gap-2"
      >
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
          className="flex-1"
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
          className="w-24 text-center"
        />

        <Select
          value={item.unit}
          onValueChange={(v) => {
            const list = [...ingredients];
            list[index].unit = v;
            setIngredients(list);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Unidade</SelectLabel>

              <SelectItem value="G">g</SelectItem>
              <SelectItem value="KG">kg</SelectItem>
              <SelectItem value="ML">ml</SelectItem>
              <SelectItem value="L">l</SelectItem>
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
            className="text-sm text-destructive bg-white hover:bg-transparent"
          >
            <Trash2 size={24} />
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

                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
