import { AppSidebar } from "@/components/menu/side-bar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import RecipeDetails from "@/modules/recipe/components/recipe-details";
import { RecipeSheet } from "@/modules/recipe/components/sheet-recipe";
import { IngredientSheet } from "@/modules/recipeIngredients/components/ingredient-sheet";
import { MoreHorizontal } from "lucide-react";

export default function Page() {
  return (
    <div>
        <RecipeSheet>
            <Button>
                iioiioo
            </Button>
        </RecipeSheet>
    </div>
  );
}
