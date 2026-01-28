import { FieldGroup } from "@/components/ui/field";

export default function LoginForm(){
    return(
        <form className="flex flex-col gap-6">
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Suas receitas somente aqui. Entre</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Digite o email e senha
                    </p>
                </div>
            </FieldGroup>
        </form>
    )
}