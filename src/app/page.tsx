import RegisterRecipe from "@/modules/recipe/components/register-recipe";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <RegisterRecipe />
      </div>
    </div>
  );
}
