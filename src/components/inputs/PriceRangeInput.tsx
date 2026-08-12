"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CustomInput } from "./CustomInput";

interface PriceRangeProps {
  min: number
  max: number
  step?: number
  value?: [number, number]
  onValueChange?: (value: [number, number]) => void
}

export function PriceRangeInput({
  min,
  max,
  step = 1,
  value,
  onValueChange,
}: PriceRangeProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value || [min, max])

  const currentValue = value || localValue

  const handleSliderChange = (newValues: number[]) => {
    const asTuple: [number, number] = [newValues[0], newValues[1]]
    setLocalValue(asTuple)
    if (onValueChange) onValueChange(asTuple)
  }

  const handleInputChange = (index: 0 | 1, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value.replace(/\D/g, ""))
    const newTuple: [number, number] = [...currentValue] as [number, number]
    newTuple[index] = newValue

    if (index === 0 && newValue > newTuple[1]) return
    if (index === 1 && newValue < newTuple[0]) return

    setLocalValue(newTuple)
    if (onValueChange) onValueChange(newTuple)
  }

  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex flex-col space-y-1.5 flex-1">
          <Label htmlFor="min-price" className="text-xs text-muted-foreground">
            Mínimo
          </Label>
          <div className="relative">
            <p className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              R$
            </p>
            <CustomInput
              id="min-price"
              type="text"
              inputMode="numeric"
              className="pl-8"
              value={localValue[0].toLocaleString()}
              onChange={(e) => handleInputChange(0, e)}
            />
          </div>
        </div>

        <p className="text-muted-foreground mt-5">-</p>

        <div className="flex flex-col space-y-1.5 flex-1">
          <Label htmlFor="max-price" className="text-xs text-muted-foreground">
            Máximo
          </Label>
          <div className="relative">
            <p className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              R$
            </p>
            <CustomInput 
              id="max-price"
              type="text"
              inputMode="numeric"
              className="pl-8"
              value={localValue[1].toLocaleString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(1, e)}
            />
          </div>
        </div>
      </div>

      <Slider
        min={min}
        max={max}
        step={step}
        value={localValue}
        onValueChange={handleSliderChange}
        className=""
      />
    </div>
  )
}