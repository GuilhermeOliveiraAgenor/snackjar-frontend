import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

export default function RecipeDetails() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-12 p-8">
      <Card className="w-full max-w-5xl text-center shadow-lg">
        <CardHeader className="space-y-2 py-8">
          <CardTitle className="text-4xl font-bold">Bolo de Laranja 🍊</CardTitle>
          <p>Tempo de preparo: 60 min</p>
          <p className="text-xl text-muted-foreground">Receita simples, fofinha e caseira</p>
        </CardHeader>
      </Card>
      <div className="w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="relative min-h-[480px] shadow-lg">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-3xl">Ingredientes</CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-20">
            <ul className="list-disc pl-6 space-y-4 text-xl leading-relaxed">
              <li>3 ovos</li>
              <li>2 laranjas</li>
              <li>1 xícara de açúcar</li>
              <li>1/2 xícara de óleo</li>
              <li>2 xícaras de farinha</li>
            </ul>
          </CardContent>
          <div className="absolute bottom-4 right-4 p-2 rounded-full hover:bg-muted transition cursor-pointer">
            <Pencil className="w-6 h-6" />
          </div>
        </Card>
        <Card className="relative min-h-[480px] shadow-lg">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-3xl">Modo de Preparo</CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-20">
            <ol className="list-disc pl-6 space-y-4 text-xl leading-relaxed">
              <li>Bata os ovos com o açúcar.</li>
              <li>Adicione o suco da laranja.</li>
              <li>Misture o óleo e a farinha.</li>
              <li>Coloque o fermento.</li>
              <li>Asse por 40 min a 180°C.</li>
            </ol>
          </CardContent>
          <div className="absolute bottom-4 right-4 p-2 rounded-full hover:bg-muted transition cursor-pointer">
            <Pencil className="w-6 h-6" />
          </div>
        </Card>
      </div>
    </div>
  );
}
