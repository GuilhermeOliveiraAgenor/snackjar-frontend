import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToggleFavorite } from "@/modules/favorite-recipe/hooks/useToggleFavorite";
import { Clock, Heart } from "lucide-react";
import Link from "next/link";

interface CardSmallProps {
  id: string;
  favoriteId?: string;
  isFavorite?: boolean;
  title: string;
  preparationTime: number;
  description: string;
}

export function CardSmall({
  id,
  title,
  favoriteId,
  isFavorite = false,
  preparationTime,
  description,
}: CardSmallProps) {
  const { toggle, isLoading } = useToggleFavorite();

  const handleToggle = () => {
    toggle({
      recipeId: id,
      favoriteId,
      isFavorite,
    });
  };

  return (
    <Card
      size="sm"
      className="mx-auto w-full max-w-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition duration-300 ease-out "
    >
      <CardHeader>
        <div className="relative flex items-center w-full pr-10 overflow-hidden">
          <CardTitle className="truncate min-w-0 max-w-full py-1">{title}</CardTitle>

          <button
            onClick={handleToggle}
            disabled={isLoading}
            className="absolute top-0 right-2 gap-2"
          >
            <Heart
              className={`w-6 h-6 transition ${
                isLoading
                  ? "opacity-50"
                  : isFavorite
                    ? "text-red-500 fill-red-500"
                    : "text-muted-foreground fill-transparent hover:fill-red-500"
              }`}
            />
          </button>
        </div>

        <div className="flex flex-1">
          <CardDescription className="flex items-center gap-1">
            <Clock className="w-4 h-4 stroke-[2.5]" />
            <span>{preparationTime} minutos</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/recipe/${id}`}>Ver detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
