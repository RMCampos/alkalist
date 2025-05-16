'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Food } from "@/types/food"
import { foodCompleteList } from "./food-complete-list"

export default function Home() {
  const [query, setQuery] = useState<string>("")
  const [filter, setFilter] = useState<string>("everything")

  const filteredFoods = foodCompleteList.sort((a, b) => a.name.localeCompare(b.name)).filter((food: Food) => {
    const matchesQuery = food.name.toLowerCase().includes(query.toLowerCase())
    const matchesType =
      (filter === "everything" && food.type !== "treatment") ||
      (filter === "treatment" && food.type === "treatment") ||
      (filter === "alkaline" && food.type === "alkaline") ||
      (filter === "acid" && food.type === "acid")
    return matchesQuery && matchesType
  })

  return (
    <main className="min-h-screen w-full px-4 sm:px-6 flex flex-col items-center justify-start bg-background text-foreground transition-colors">
      
      <div className="flex-grow flex flex-col items-center px-4 py-8 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mt-10 mb-6 text-center">AlkaList</h1>

        <div className="flex flex-col items-center w-full max-w-md gap-4 animate-fade-in animate-duration-500 animate-ease-in">
          <Input
            type="text"
            placeholder="Buscar alimento (exemplo arroz, óleo...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md mb-6"
          />

          <RadioGroup
            defaultValue="everything"
            className="flex flex-col sm:flex-row gap-4 mb-6"
            onValueChange={setFilter}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="everything" value="everything" />
              <label htmlFor="everything" className="text-sm font-medium">Todos</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="alkaline" value="alkaline" />
              <label htmlFor="alkaline" className="text-sm font-medium">Alcalinos</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="acid" value="acid" />
              <label htmlFor="acid" className="text-sm font-medium">Ácidos</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="treatment" value="treatment" />
              <label htmlFor="treatment" className="text-sm font-medium">Em tratamento</label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full px-4 max-w-4xl">
          {filteredFoods.map((food, index) => (
            <Card
              key={index}
              className="animate-slide-up animate-duration-700 animate-ease-out animate-delay-[300ms]"
            >
              <CardContent className="p-6 flex justify-between items-center text-lg">
                <span className="font-semibold">{food.name}</span>
                <span className={`text-sm ${food.type === "alkaline" ? "text-green-500" : "text-red-400"}`}>
                  {food.type === "alkaline" ? "Alcalino" : "Ácido"}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-10 w-full max-w-md" />

      <footer className="text-center text-sm text-muted-foreground px-4 py-6">
        <p className="mb-2">Desenvolvido por Ricardo, sem fins lucrativos ou interesses pessoais</p>
        <p className="mb-2">Contato: <a href="mailto:ricardompcampos@gmail.com">Email</a> ou Instagram: <a href="https://instagram.com/mr.ricardocampos">@mr.ricardocampos</a></p>
      </footer>
    </main>
  )
}
