"use client"

import { useState } from "react";

export function TimeInput() {
    const [value, setValue] = useState("");
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      let v = e.target.value.replace(/\D/g, "");
  
      if (v.length >= 3) {
        v = v.slice(0, 2) + ":" + v.slice(2, 4);
      }
  
      setValue(v.slice(0, 5));
    }
}