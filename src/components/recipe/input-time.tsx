"use client"

import { Input } from "@/components/ui/input";
import { handleChange } from "@/lib/time";
import { useState } from "react";

export function TimeInput() {
    const [value, setValue] = useState("");
  
    return (
      <Input 
        type="text"
        placeholder=""
        value={value}
        onChange={handleChange}
        maxLength={5}
        className="w-32"
      />
    );
}