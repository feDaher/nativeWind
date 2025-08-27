import React, { useState, useMemo } from "react";

type Operacao = 'todas' | 'soma' | 'sub' | 'mul' | 'div' | 'mod';

export default function Calculator() {
  const [aText, setAText] = useState<string>('');
  const [bText, setBText] = useState<string>('');
  const [op, setOp] = useState<Operacao>('todas');
}
