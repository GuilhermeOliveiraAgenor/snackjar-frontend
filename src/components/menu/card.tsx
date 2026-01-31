import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardSmallProps {
  title: string
  preparationTime: string
  description: string
}

export function CardSmall({
  title,
  preparationTime,
  description,
}: CardSmallProps) {
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Tempo de preparo: {preparationTime}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}
