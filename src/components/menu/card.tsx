import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Heart } from "lucide-react";

interface CardSmallProps {
  title: string;
  preparationTime: number;
  description: string;
}

export function CardSmall({ title, preparationTime, description }: CardSmallProps) {
  return (
    <Card
      size="sm"
      className="mx-auto w-full max-w-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition duration-300 ease-out "
    >
      <CardHeader>
        <div className="relative flex items-center w-full pr-10 overflow-hidden">
          <CardTitle className="truncate min-w-0 max-w-full py-1">{title}</CardTitle>

          <button className="absolute top-0 right-2 gap-2">
            <Heart className="w-6 h-6 text-muted-foreground fill-transparent hover:fill-red-500 hover:text-red-500 transition" />
          </button>
        </div>

        <div className="flex flex-1">
          <CardDescription className="flex items-center gap-1">
            <Clock className="w-4 h-4 stroke-[2.5]" />
            <span>{preparationTime}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}
